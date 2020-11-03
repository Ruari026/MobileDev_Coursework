class SceneManager
{
    gameScenes = [];
    currentScene = null;

    Init()
    {
        // Loads up all the required scenes & Creates a simple dictionary for accessing loaded scenes
        this.gameScenes["MainMenu"] = new MainMenuScene();
        this.gameScenes["Gameplay"] = new GameplayScene();
        this.gameScenes["GameOver"] = new GameOverScene();

        // Setting Starting Scene
        this.currentScene = this.gameScenes["MainMenu"];
    }

    ChangeScene(sceneName)
    {
        this.currentScene = this.gameScenes[sceneName];
        this.currentScene.StartScene();
    }

    GetCurrentScene()
    {
        if (this.currentScene != null)
        {
            return this.currentScene;
        }
    }
}