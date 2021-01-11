class TextRenderer extends Component
{
    componentName = "TextRenderer";

    font = 'forest_thing';
    fontSize = 10;
    text = '';
    textAlign = 'start';

    maxWidth = 0;


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
        var screenPosX = (canvas.width * this.parentGameObject.anchorX);
        screenPosX += (this.parentGameObject.GetGlobalPos().x - (this.parentGameObject.width / 2));

        var screenPosY = (canvas.height * this.parentGameObject.anchorY);
        screenPosY += (this.parentGameObject.GetGlobalPos().y - (this.parentGameObject.height / 2));

        // Setting font rendering details
        canvasContext.textAlign = this.textAlign;
        canvasContext.font = this.fontSize + 'px ' + this.font;

        // Rendering text to the screen, only applies max width if it is above 0
        if (this.maxWidth != 0)
        {
            canvasContext.fillText(this.text, screenPosX, screenPosY, this.maxWidth);
        }
        else
        {
            canvasContext.fillText(this.text, screenPosX, screenPosY);
        }
    }
}