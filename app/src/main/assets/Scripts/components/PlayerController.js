class PlayerController extends Component
{
    componentName = "PlayerController";

    playerState = 'Idle';

    // Targeting recticle details
    theReticle = null;
    reticleOffsetMagnitude = 50;

    // Targeting power details
    thePowerMeter = null;
    powerRotationOffset = 45;
    currentPowerLevel = 1;
    maxPowerLevel = 6;
    currentChargeTime = 0;
    maxChargeTime = 0.25;

    // Player Health Details
    playerHealth = 100;
    playerHealthUI = null;

    // Player reset details
    turnStartPos = { x : 0, y : 0};


    /*
    ====================================================================================================
    Component Inherited Methods
    ====================================================================================================
    */
    Start()
    {
        // Sets the player's health UI to show the player's starting health
        this.playerHealthUI.text = 'HP: ' + this.playerHealth;
    }

    Update()
    {
        // Checks to see if the player has fallen out of bounds
        var playerPos = this.parentGameObject.GetGlobalPos();
        if (playerPos.y > 500)
        {
            this.ResetPlayer();
        }
    }


    /*
    ====================================================================================================
    Handling Targeting
    ====================================================================================================
    */
    Aim(mouseX, mouseY)
    {
        // Getting position of frog in screen space
        var screenPos =
        {
            x : ((this.parentGameObject.GetGlobalPos().x - this.parentGameObject.parentScene.sceneCamera.GetGlobalPos().x) * this.parentGameObject.parentScene.sceneCamera.viewScale),
            y : ((this.parentGameObject.GetGlobalPos().y - this.parentGameObject.parentScene.sceneCamera.GetGlobalPos().y) * this.parentGameObject.parentScene.sceneCamera.viewScale)
        };
        // Adjusting for screen space coordinates
        screenPos.x += canvasX;
        screenPos.y += canvasY;

        //console.info('Input Aiming: ' + mouseX + ', ' + mouseY);
        //console.info('Gameobject Aiming: ' + screenPos.x + ', ' + screenPos.y);

        // Direction of mouse relative to frog
        var direction =
        {
            x : (mouseX - screenPos.x),
            y : (mouseY - screenPos.y)
        }

        // Normalizing direction
        var magnitude = Math.sqrt((direction.x * direction.x) + (direction.y * direction.y))
        direction.x /= magnitude;
        direction.y /= magnitude;

        // Setting Reticle local position to be new direction
        var newPos =
        {
            x : direction.x * this.reticleOffsetMagnitude,
            y : direction.y * this.reticleOffsetMagnitude
        };
        this.theReticle.SetLocalPos(newPos);

        // Setting power bar to new location
        this.thePowerMeter.SetLocalPos({x : newPos.x * 0.69, y : newPos.y * 0.69});
        // Adjusting rotation of power meter to follow new direction
        var up = {x : 0, y : 1};
        var angle = Math.atan2(((direction.x * up.x) + (direction.y * up.y)), ((direction.x * up.y) + (up.x * direction.y)))
        angle *= (180 / Math.PI);
        this.thePowerMeter.GetRenderer().spriteRotation = angle;

        // Flipping player sprite to follow target direction
        if (angle > 90 || angle < -90)
        {
            this.parentGameObject.GetRenderer().flipX = true;
        }
        else
        {
            this.parentGameObject.GetRenderer().flipX = false;
        }
    }


    /*
    ====================================================================================================
    Handling Charging
    ====================================================================================================
    */
    Charge()
    {
        // Showing relevant UI elements
        this.theReticle.active = false;
        this.thePowerMeter.active = true;

        // Charging
        this.currentChargeTime += deltaTime;
        if (this.currentChargeTime >= this.maxChargeTime)
        {
            this.currentChargeTime = 0;
            this.currentPowerLevel++;

            // Capping max power level
            if (this.currentPowerLevel > this.maxPowerLevel)
            {
                this.currentPowerLevel = this.maxPowerLevel;
            }

            // Updating power meter sprite
            var newOffset = (this.thePowerMeter.GetRenderer().spriteHeight * (this.currentPowerLevel - 1));
            this.thePowerMeter.GetRenderer().offsetY = newOffset;
        }
    }

    ResetCharge()
    {
        this.thePowerMeter.active = false;

        this.thePowerMeter.GetRenderer().offsetY = 0;
        this.currentChargeTime = 0;
        this.currentPowerLevel = 1;

        this.theReticle.active = true;
    }


    /*
    ====================================================================================================
    Resolving Jumping & Firing
    ====================================================================================================
    */
    Jump()
    {
        // Save's the player's position incase they jump out of bounds
        this.turnStartPos = this.parentGameObject.GetGlobalPos();

        // Direction determined by reticle direction
        var direction = this.theReticle.GetLocalPos();
        direction.x /= this.reticleOffsetMagnitude;
        direction.y /= this.reticleOffsetMagnitude;

        // Adding force to player physics handler
        var physicsHandler = this.parentGameObject.GetComponent("PhysicsMovement");
        physicsHandler.speedX += (direction.x * 125 * this.currentPowerLevel);
        physicsHandler.speedY += (direction.y * 125 * this.currentPowerLevel);

        // Reset Charge Meter
        this.ResetCharge();
    }

    Fire()
    {
        // Direction determined by reticle direction
        var direction = this.theReticle.GetLocalPos();
        direction.x /= this.reticleOffsetMagnitude;
        direction.y /= this.reticleOffsetMagnitude;

        // Creating New Projectile
        var newProjectile = new ProjectilePrefab('Projectile', this.parentGameObject.parentScene);
        // Makes sure that the new projectile can't collide with the gameobject that spawned it
        newProjectile.GetComponent('PhysicsMovement').layersToIgnore.push(this.parentGameObject.gameObjectName);
        // Set's the projectile's inital speed (Based on the frog's reticle direction)
        newProjectile.GetComponent("PhysicsMovement").speedX += (direction.x * 125 * this.currentPowerLevel);
        newProjectile.GetComponent("PhysicsMovement").speedY += (direction.y * 125 * this.currentPowerLevel);

        // Moving the projectile to where the frog is (plus a bit of offset in the target direction)
        newProjectile.SetGlobalPos(
        {
            x : this.parentGameObject.GetGlobalPos().x,
            y : this.parentGameObject.GetGlobalPos().y
        });

        // Adding new projectile to scene
        this.parentGameObject.parentScene.AddObject(newProjectile);

        // Setting the camera to follow the new projectile
       var sceneCamera = this.parentGameObject.parentScene.sceneCamera;
       sceneCamera.GetComponent("CameraController").cameraTarget = newProjectile;

        // Reset Charge Meter
        this.ResetCharge();
    }


    /*
    ====================================================================================================
    Handling Player Health
    ====================================================================================================
    */
    ResetPlayer()
    {
        // Player has fallen out of bounds
        // Moves the player back to the position that they were in before jumping
        this.parentGameObject.SetGlobalPos(this.turnStartPos);

        // Resets player's velocity
        this.parentGameObject.GetComponent("PhysicsMovement").speedX = 0;
        this.parentGameObject.GetComponent("PhysicsMovement").speedY = 0;

        // Reset also damages player for 33 health
        this.DamagePlayer(33);
    }

    DamagePlayer(damageAmount)
    {
        this.playerHealth -= damageAmount;

        // Updates the player's health UI
        this.playerHealthUI.text = 'HP: ' + this.playerHealth;

        // If the player's power is less than 0 then the game should go to the game over screen
        if (this.playerHealth <= 0)
        {
            // Game Manager handles game over transition animation

            // Tells the game data which player won the game
        }
    }
}