class PlatformPrefab extends GameObject
{
    platformWidth = 21;
    platformHeight = 3;

    constructor(name, scene, width, height)
    {
        super(name, scene);

        this.platformWidth = width;
        this.platformHeight = height;

        for (var h = 1; h <= this.platformHeight; h++)
        {
            for (var w = 1; w <= this.platformWidth; w++)
            {
                var newTile = new GameObject('Tile', scene);

                // Dimensions
                newTile.width = 25;
                newTile.height = 25;

                // Position
                newTile.SetLocalPos(
                {
                    'x' : ((newTile.width) * (w - 1)) - ((this.platformWidth / 2) * newTile.width),
                    'y' : ((newTile.height) * (h - 1)) - ((this.platformHeight / 2) * newTile.height)
                });

                // Renderer
                var newRenderer = new SpriteRenderer(newTile);
                newRenderer.filePath = 'Images/Platforms_TileSheet.png';

                // Determining what tile type is
                // Checking top and bottom
                if (w == 1)
                    newRenderer.offsetX = 0;
                else if (w == this.platformWidth)
                    newRenderer.offsetX = 128;
                else
                    newRenderer.offsetX = 64;

                // Checking top and bottom
                if (h == 1)
                    newRenderer.offsetY = 0;
                else if (h == this.platformHeight)
                    newRenderer.offsetY = 128;
                else
                    newRenderer.offsetY = 64;
                newTile.AddRenderer(newRenderer);

                // Collider
                var boxCollider = new BoxCollider(newTile);
                boxCollider.sizeX = newTile.width;
                boxCollider.sizeY = newTile.height;
                newTile.AddCollider(boxCollider);

                newTile.parentObject = this;
                this.children.push(newTile);
            }
        }
    }
}