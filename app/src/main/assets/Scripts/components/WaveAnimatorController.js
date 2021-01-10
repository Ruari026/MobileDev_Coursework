class WaveAnimatorController extends Component
{
    componentName = "WaveAnimatorController";

    spawnedWaves = [];
    waveWidth = 125;

    animationSpeed = -50;

    Start()
    {

    }

    Update()
    {
        for (var i = 0; i < this.spawnedWaves.length; i++)
        {
            // Handling Animation for every spawned tile
            var wavePos = this.spawnedWaves[i].GetLocalPos();

            // First Checks to see if the tile has moved too far to the left of the screen
            // (based on the number of waves spawned and their width so that it continues to tile correctly)
            var minPos = ((this.spawnedWaves.length - 1) / 2) * (-this.waveWidth);
            if (wavePos.x < minPos)
            {
                // If so then move the wave gameobject to the far right of the screen
                wavePos.x = (wavePos.x + (this.waveWidth * (this.spawnedWaves.length - 1)));
            }
            else
            {
                // Otherwise just move the tile to the left
                wavePos.x = (wavePos.x + (this.animationSpeed * deltaTime));
            }

            this.spawnedWaves[i].SetLocalPos(wavePos);
        }
    }
}