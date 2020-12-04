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
    }

    /*
    ====================================================================================================
    Handling Jumping & Firing
    ====================================================================================================
    */
    Charge()
    {

    }

    Jump()
    {
        // Direction determined by reticle direction
        var direction = this.theReticle.GetLocalPos();
        direction.x /= this.reticleOffsetMagnitude;
        direction.y /= this.reticleOffsetMagnitude;

        // Adding force to player physics handler
        var physicsHandler = this.parentGameObject.GetComponent("PhysicsMovement");
        physicsHandler.speedX += (direction.x * 500);
        physicsHandler.speedY += (direction.y * 500);

        // Reset Charge Meter
    }

    Fire()
    {
        // Reset Charge Meter
    }

    ResetCharge()
    {

    }
}