class SpriteRenderer extends Component
{
    componentName = "SpriteRenderer";

    // General sprite details
    filePath = 'Images/test.png';

    spriteWidth = 64;
    spriteHeight = 64;

    offsetX = 0;
    offsetY = 0;

    spriteRotation = 0;
    rotationOffset = 0;

    flipX = false;
    flipY = false;

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
        this.img.style.transform = 'rotate(90deg)'
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
        var spriteCenter =
        {
            x : ((this.parentGameObject.GetGlobalPos().x - camera.GetGlobalPos().x) * camera.zoom),
            y : ((this.parentGameObject.GetGlobalPos().y - camera.GetGlobalPos().y) * camera.zoom)
        }

        // Canvas Transformation for flipping sprites
        if (this.flipX)
        {
            canvasContext.translate(canvas.width, 0)
            canvasContext.scale(-1, 1);

            spriteCenter.x *= -1;
        }
        if (this.flipY)
        {
            canvasContext.translate(0, canvas.height)
            canvasContext.scale(1, -1);

            spriteCenter.y *= -1;
        }

        // Adjusting for screen space coordinates
        spriteCenter.x += canvasX;
        spriteCenter.y += canvasY;

        /// Canvas Transformation for rotated sprites (Only Required if rotation is not 0)
        if (this.spriteRotation != 0)
        {
            canvasContext.translate(spriteCenter.x, spriteCenter.y);
            canvasContext.rotate((this.spriteRotation + this.rotationOffset) * Math.PI / 180);
            canvasContext.translate(-spriteCenter.x, -spriteCenter.y);
        }

        // Adjusting position to set draw pos relative to sprite size
        var screenPosX = spriteCenter.x - ((this.parentGameObject.width / 2) * camera.zoom);
        var screenPosY = spriteCenter.y - ((this.parentGameObject.height / 2) * camera.zoom);

        var screenSpaceWidth = this.parentGameObject.width * camera.zoom;
        var screenSpaceHeight = this.parentGameObject.height * camera.zoom;

        canvasContext.drawImage(this.img, (this.spriteWidth * 0) + this.offsetX, (this.spriteHeight * this.currentFrame) + this.offsetY, this.spriteWidth, this.spriteHeight, screenPosX, screenPosY, screenSpaceWidth, screenSpaceHeight);

        /// Resetting Canvas Transformation for rotated sprites (only required if rotation is not 0)
        if (this.spriteRotation != 0)
        {
            canvasContext.translate(spriteCenter.x, spriteCenter.y);
            canvasContext.rotate((-this.spriteRotation - this.rotationOffset) * Math.PI / 180);
            canvasContext.translate(-spriteCenter.x, -spriteCenter.y);
        }

        // Resetting Canvas Transformation for flipping sprites
        if (this.flipX)
        {
            canvasContext.scale(-1, 1);
            canvasContext.translate(-canvas.width, 0)
        }
        if (this.flipY)
        {
            canvasContext.scale(1, -1);
            canvasContext.translate(0, -canvas.height)
        }
    }
}