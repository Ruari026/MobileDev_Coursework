class TextRenderer extends Component
{
    componentName = "TextRenderer";

    font = 'forest_thing';
    fontSize = 10;
    text = '';
    textAlign = 'start';
    textColor = '#000000';

    maxWidth = 0;

    isScreenSpace = true;

    /*
    ====================================================================================================
    Component Inherited Methods
    ====================================================================================================
    */
    Start()
    {
        var junction_font = new FontFace('Junction Regular', 'url(fonts/junction-regular.woff)');
    }

    Draw(camera)
    {
        var posX = 0;
        var posY = 0;

        if (this.isScreenSpace)
        {
            posX = (canvas.width * this.parentGameObject.anchorX);
            posX += (this.parentGameObject.GetGlobalPos().x * currentScene.sceneCamera.viewScale);
            posX -= ((this.parentGameObject.width * currentScene.sceneCamera.viewScale) / 2);

            posY = (canvas.height * this.parentGameObject.anchorY);
            posY += (this.parentGameObject.GetGlobalPos().y * currentScene.sceneCamera.viewScale);
            posY -= ((this.parentGameObject.height * currentScene.sceneCamera.viewScale) / 2);

            // Setting font rendering details
            canvasContext.textAlign = this.textAlign;
            canvasContext.font = (this.fontSize * currentScene.sceneCamera.viewScale) + 'px ' + this.font;
            canvasContext.fillStyle = this.textColor;
        }
        else
        {

        }

        // Rendering text to the screen, only applies max width if it is above 0
        if (this.maxWidth != 0)
        {
            canvasContext.fillText(this.text, posX, posY, (this.maxWidth * currentScene.sceneCamera.viewScale));
        }
        else
        {
            canvasContext.fillText(this.text, posX, posY);
        }
    }
}