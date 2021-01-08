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


    /*
    ====================================================================================================
    Component Inherited Methods
    ====================================================================================================
    */
    Start()
    {

    }

    Update()
    {

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
            x : (this.parentGameObject.GetGlobalPos().x * this.parentGameObject.parentScene.sceneCamera.zoom) + canvasX,
            y : (this.parentGameObject.GetGlobalPos().y * this.parentGameObject.parentScene.sceneCamera.zoom) + canvasY
        }

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

        // Reset Charge Meter
        this.ResetCharge();
    }
}