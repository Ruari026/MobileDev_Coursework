var gameScenes = [];
var currentScene = null;

function InitScenes()
{
    // Loads up all the required scenes & Creates a simple dictionary for accessing loaded scenes
    this.gameScenes[0] = new MainMenuScene();
    this.gameScenes[1] = new GameplayScene();
    this.gameScenes[2] = new GameOverScene();

    for (var i = 0; i < this.gameScenes.length; i++)
    {
        this.gameScenes[i].LoadScene();
    }

    // Setting Starting Scene
    this.ChangeScene("Gameplay");
}

function ChangeScene(sceneName)
{
    switch (sceneName)
    {
        case "MainMenu":
            this.currentScene = this.gameScenes[0];
            break;

        case "Gameplay":
            this.currentScene = this.gameScenes[1];
            break;

        case "GameOver":
            this.currentScene = this.gameScenes[2];
            break;
    }

    this.currentScene.StartScene();
}