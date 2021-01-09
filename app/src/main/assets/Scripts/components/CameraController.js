class CameraController extends Component
{
    componentName = "CameraController";

    cameraTarget = null;
    cameraOffsetX = 0;
    cameraOffsetY = 0;

    moveSpeed = 5;

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
        // Lerp towards the target gameobject's position for smooth movement
        if (this.cameraTarget != null)
        {
            //console.info("Targeting " + this.cameraTarget.gameObjectName);

            var targetPosX = this.cameraTarget.posX + this.cameraOffsetX;
            var targetPosY = this.cameraTarget.posY + this.cameraOffsetY;

            var currentPosX = this.parentGameObject.posX;
            var currentPosY = this.parentGameObject.posY;

            // Lerping Equations (uses the change in time as the lerp time point)
            var newX = (currentPosX + (deltaTime * this.moveSpeed) * (targetPosX - currentPosX));
            var newY = (currentPosY + (deltaTime * this.moveSpeed) * (targetPosY - currentPosY));

            this.parentGameObject.posX = newX;
            this.parentGameObject.posY = newY;
        }
        else
        {
            //console.info("ERROR: No Camera Target Set");
        }
    }
}