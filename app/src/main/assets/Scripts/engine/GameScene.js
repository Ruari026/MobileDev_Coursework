class GameScene
{
    sceneObjects = [];

    // Handles loading all of the required game objects into the scene
    LoadScene()
    {

    }

    // Handles both updating each game object in the scene then drawing the game object to the screen
    UpdateScene(gameCanvas)
    {
        //console.info('Scene Updating');

        // Update Components
        for (var i = 0; i < this.sceneObjects.length; i++)
        {
            this.sceneObjects[i].Update();
        }

        // Draw GameObjects (Orders objects by their layerValue to ensure the correct objects are drawn on top)
        for (i = 0; i < this.sceneObjects.length; i++)
        {
            this.sceneObject[i].Draw();
        }
    }
}

class MainMenuScene extends GameScene
{

}

class GameplayScene extends GameScene
{

}

class GameOverScene extends GameScene
{

}