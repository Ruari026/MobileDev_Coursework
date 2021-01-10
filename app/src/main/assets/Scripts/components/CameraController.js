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

            // Checks that the camera doesn't go out of the game area
            // X Axis has limits for the left and right sides of the screen
            if (newX > - 500 && newX < 500)
            {
                this.parentGameObject.posX = newX;
            }
            // Y Axis only has a limit on the bottom of the screen (positive due to screen coordinates)
            if (newY < 100)
            {
                this.parentGameObject.posY = newY;
            }
        }
        else
        {
            //console.info("ERROR: No Camera Target Set");
        }
    }
}