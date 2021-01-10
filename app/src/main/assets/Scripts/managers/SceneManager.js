var gameScenes = [];
var currentScene = null;

function ChangeScene(sceneName)
{
    switch (sceneName)
    {
        case "MainMenu":
            var newMainMenu = new MainMenuScene();
            newMainMenu.LoadScene();

            this.currentScene = newMainMenu;
            break;

        case "Gameplay":
            var newGameplay = new GameplayScene();
            newGameplay.LoadScene();

            this.currentScene = newGameplay;
            break;

        case "GameOver":
            var newGameOver = new GameOverScene();
            newGameOver.LoadScene();

            this.currentScene = newGameOver;
            break;
    }

    this.currentScene.StartScene();
}