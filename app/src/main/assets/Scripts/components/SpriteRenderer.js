class SpriteRenderer extends Component
{
    componentName = "SpriteRenderer";

    // General sprite details
    filePath = 'Images/test.png';

    spriteWidth = 64;
    spriteHeight = 64;

    offsetX = 0;
    offsetY = 0;

    img = new Image();

    // Sprite Animation Details
    canAnimate = false;

    currentFrame = 0;
    maxFrames = 1;

    frameTimer = 1;
    frameTimeMax = 0.5;

    debug = false;

    Start()
    {
        this.img.src = this.filePath;
    }

    Update()
    {
        if (this.canAnimate)
        {
            this.frameTimer = this.frameTimer - deltaTime;
            if (this.frameTimer <= 0)
            {
                this.frameTimer = this.frameTimeMax;
                this.currentFrame++;
                if (this.currentFrame >= this.maxFrames)
                {
                    this.currentFrame = 0;
                }
            }
        }
    }

    Draw(camera)
    {
        // Getting the gameobject's position & size relative to the camera
        var screenPosX = (this.parentGameObject.GetGlobalPos().x - (this.parentGameObject.width / 2));
        var screenPosY = (this.parentGameObject.GetGlobalPos().y - (this.parentGameObject.height / 2));

        // Adjusting position & size for the orthographic camera zoom
        screenPosX *= camera.zoom;
        screenPosY *= camera.zoom;

        // Setting Canvas Position
        screenPosX += canvasX;
        screenPosY += canvasY;

        var screenSpaceWidth = this.parentGameObject.width;
        var screenSpaceHeight = this.parentGameObject.height;

        screenSpaceWidth *= camera.zoom;
        screenSpaceHeight *= camera.zoom;

        canvasContext.drawImage(this.img, (this.spriteWidth * 0) + this.offsetX, (this.spriteHeight * this.currentFrame) + this.offsetY, this.spriteWidth, this.spriteHeight, screenPosX, screenPosY, screenSpaceWidth, screenSpaceHeight);
    }
}