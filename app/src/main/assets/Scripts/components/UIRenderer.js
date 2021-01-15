class UIRenderer extends Component
{
    componentName = "UIRenderer";

    filePath = 'Images/test.png';

    spriteWidth = 64;
    spriteHeight = 64;

    spriteOffsetX = 0;
    spriteOffsetY = 0;

    img = new Image();


    /*
    ====================================================================================================
    Component Inherited Methods
    ====================================================================================================
    */
    Start()
    {
        this.img.src = this.filePath;
    }

    Draw(camera)
    {
        var screenPosX = (canvas.width * this.parentGameObject.anchorX);
        screenPosX += (this.parentGameObject.GetGlobalPos().x * currentScene.sceneCamera.viewScale);
        screenPosX -= ((this.parentGameObject.width * currentScene.sceneCamera.viewScale) / 2);

        var screenPosY = (canvas.height * this.parentGameObject.anchorY);
        screenPosY += (this.parentGameObject.GetGlobalPos().y * currentScene.sceneCamera.viewScale);
        screenPosY -= ((this.parentGameObject.height * currentScene.sceneCamera.viewScale) / 2);

        var screenSizeX = this.parentGameObject.width * currentScene.sceneCamera.viewScale;
        var screenSizeY = this.parentGameObject.height * currentScene.sceneCamera.viewScale;

        canvasContext.drawImage(this.img, this.spriteOffsetX, this.spriteOffsetY, this.spriteWidth, this.spriteHeight, screenPosX, screenPosY, screenSizeX, screenSizeY);
    }
}