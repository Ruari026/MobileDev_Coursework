class GameOverScene extends GameScene
{
    LoadScene()
    {
        /*
        ====================================================================================================
        Necessary Scene Details
        ====================================================================================================
        */
        {
            this.sceneName = 'Game Over';
            console.info('Loading Scene: '.concat(this.sceneName));;

            // Every scene needs a camera
            var newCamera = new CameraPrefab("Camera", this);
            this.sceneCamera = newCamera;
            this.sceneObjects.push(newCamera);

            // Ensuring that the camera starts at it's default zoom value (this also calculates the screen scaling for rendering across multiple devices)
            this.sceneCamera.SetCameraZoom(1.0);
        }


        /*
        ====================================================================================================
        Scene Controller
        ====================================================================================================
        */
        /*var sceneController = new GameObject("Main Menu Controller", this);

        var backgroundMusic = new AudioSource(sceneController);
        backgroundMusic.filePath = "Audio/Andrew_Codeman_-_01_-_Tired_traveler_on_the_way_to_home.ogg"
        backgroundMusic.isSFX = false;
        backgroundMusic.loop = true;
        sceneController.AddComponent(backgroundMusic);

        var theController = new MainMenuManager(sceneController);
        theController.gameMusic = backgroundMusic;
        sceneController.AddComponent(theController);

        this.sceneObjects.push(sceneController);*/


        /*
        ====================================================================================================
        Scene Background
        ====================================================================================================
        */
        {
            // Tiles the background a few times (only tiles on the x axis)
            var backgroundSize = 800;
            var numberOfTiles = 3;
            for (var i = 0; i < numberOfTiles; i++)
            {
                var background = new GameObject("Background", this);
                background.width = backgroundSize;
                background.height = backgroundSize;

                background.SetGlobalPos(
                {
                    'x' : ((-backgroundSize) + (backgroundSize * i)),
                    'y' : -50
                });

                var backgroundRenderer = new SpriteRenderer(background);
                backgroundRenderer.filePath = 'Images/environment_layer.png';
                backgroundRenderer.spriteWidth = 1024;
                backgroundRenderer.spriteHeight = 1024;
                backgroundRenderer.frameMax = 1;
                background.AddRenderer(backgroundRenderer);
                this.sceneObjects.push(background);
            }
        }


        /*
        ====================================================================================================
        Winning Player UI
        ====================================================================================================
        */
        {
            // Winning Player Sprite
            var playerSprite = new GameObject("Winning Player")
            playerSprite.posX = -200;
            playerSprite.posY = -50;
            playerSprite.width = 256;
            playerSprite.height = 220;
            playerSprite.anchorX = 0.5;
            playerSprite.anchorY = 0.5;
            var newRenderer = new SpriteRenderer(playerSprite);
            if (winningPlayer == "Player 1")
            {
                newRenderer.filePath = 'Images/frog.png';
            }
            else
            {
                newRenderer.filePath = 'Images/frog2.png';
            }
            newRenderer.spriteWidth = 128;
            newRenderer.spriteHeight = 110;
            newRenderer.canAnimate = true;
            newRenderer.maxFrames = 2;
            playerSprite.AddRenderer(newRenderer);
            this.sceneObjects.push(playerSprite);

            // Descriptive Text
            var text = new GameObject("Text (1)");
            text.posX = -150;
            text.posY = 180;
            text.width = 112.5;
            text.height = 112.5;
            text.anchorX = 0.5;
            text.anchorY = 0.5;
            var textRenderer = new TextRenderer(text);
            textRenderer.text = "Winning Player:";
            textRenderer.fontSize = 36;
            textRenderer.textAlign = 'center';
            textRenderer.textColor = '#323232';
            text.AddRenderer(textRenderer, 10);
            this.sceneObjects.push(text);

            text = new GameObject("Text (2)");
            text.posX = -147.5;
            text.posY = 182.5;
            text.width = 112.5;
            text.height = 112.5;
            text.anchorX = 0.5;
            text.anchorY = 0.5;
            textRenderer = new TextRenderer(text);
            textRenderer.text = "Winning Player:";
            textRenderer.fontSize = 36;
            textRenderer.textAlign = 'center';
            textRenderer.textColor = '#E1E1E1';
            text.AddRenderer(textRenderer, 10);
            this.sceneObjects.push(text);

            text = new GameObject("Text (3)");
            text.posX = -150;
            text.posY = 235;
            text.width = 112.5;
            text.height = 112.5;
            text.anchorX = 0.5;
            text.anchorY = 0.5;
            textRenderer = new TextRenderer(text);
            textRenderer.text = winningPlayer;
            textRenderer.fontSize = 55;
            textRenderer.textAlign = 'center';
            textRenderer.textColor = '#323232';
            text.AddRenderer(textRenderer, 10);
            this.sceneObjects.push(text);

            text = new GameObject("Text (4)");
            text.posX = -147.5;
            text.posY = 237.5;
            text.width = 112.5;
            text.height = 112.5;
            text.anchorX = 0.5;
            text.anchorY = 0.5;
            textRenderer = new TextRenderer(text);
            textRenderer.text = winningPlayer;
            textRenderer.fontSize = 55;
            textRenderer.textAlign = 'center';
            textRenderer.textColor = '#E1E1E1';
            text.AddRenderer(textRenderer, 10);
            this.sceneObjects.push(text);
        }


        /*
        ====================================================================================================
        Scene Buttons
        ====================================================================================================
        */
        {
            // Main Menu Button
            {
                var returnButton = new GameObject('Replay Button', this);
                returnButton.posX = 150;
                returnButton.posY = -75;
                returnButton.width = 225;
                returnButton.height = 112.5;
                returnButton.anchorX = 0.5;
                returnButton.anchorY = 0.5;

                var buttonRenderer = new UIRenderer(returnButton);
                buttonRenderer.filePath = 'Images/Button (Medium).png';
                buttonRenderer.spriteWidth = 128;
                returnButton.AddRenderer(buttonRenderer, 10);

                var buttonController = new ButtonComponent(returnButton);
                buttonController.targetRenderer = buttonRenderer;
                buttonController.buttonBehaviour = StartGameButtonEvent;
                returnButton.AddComponent(buttonController);

                var childText = new GameObject("Button Text", this);
                childText.SetLocalPos({ x : 0, y : -2 });
                childText.parentObject = returnButton;

                var textRenderer = new TextRenderer(childText);
                textRenderer.fontSize = 36;
                textRenderer.text = "-Replay Game-";
                textRenderer.textAlign = 'center';

                childText.AddRenderer(textRenderer);

                returnButton.children.push(childText);
                this.sceneObjects.push(returnButton);
            }

            // Main Menu Button
            {
                var returnButton = new GameObject('Return Button', this);
                returnButton.posX = 150;
                returnButton.posY = 75;
                returnButton.width = 225;
                returnButton.height = 112.5;
                returnButton.anchorX = 0.5;
                returnButton.anchorY = 0.5;

                var buttonRenderer = new UIRenderer(returnButton);
                buttonRenderer.filePath = 'Images/Button (Medium).png';
                buttonRenderer.spriteWidth = 128;
                returnButton.AddRenderer(buttonRenderer, 10);

                var buttonController = new ButtonComponent(returnButton);
                buttonController.targetRenderer = buttonRenderer;
                buttonController.buttonBehaviour = ReturnMenuButtonEvent;
                returnButton.AddComponent(buttonController);

                var childText = new GameObject("Button Text", this);
                childText.SetLocalPos({ x : 0, y : -2 });
                childText.parentObject = returnButton;

                var textRenderer = new TextRenderer(childText);
                textRenderer.fontSize = 36;
                textRenderer.text = "-Main Menu-";
                textRenderer.textAlign = 'center';

                childText.AddRenderer(textRenderer);

                returnButton.children.push(childText);
                this.sceneObjects.push(returnButton);
            }
        }
    }
}