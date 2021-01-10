class CameraPrefab extends GameObject
{
    viewScale = 1.0;
    scaleX = false;

    referenceResolution = { x : 600, y : 300 };

    SetCameraZoom(newZoom)
    {
        // Camera zoom can never be 0 or negative
        if (newZoom > 0)
        {
            // Calculates the screen scale based on the new zoom, the window's size & the reference resolution
            // The game scales against the x axis of the reference resolution
            var resolutionScale = 0;
            if (this.scaleX)
            {
                resolutionScale = (canvasX / this.referenceResolution.x);
            }
            else
            {
                resolutionScale = (canvasY / this.referenceResolution.y);
            }

            console.info("New Camera Zoom: " + (resolutionScale * newZoom));
            this.viewScale = (resolutionScale * newZoom);
        }
    }
}