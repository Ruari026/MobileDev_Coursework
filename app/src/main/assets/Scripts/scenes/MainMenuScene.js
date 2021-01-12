class MainMenuScene extends GameScene
{
    LoadScene()
    {
        /*
        ====================================================================================================
        Necessary Scene Details
        ====================================================================================================
        */
        {
            this.sceneName = 'MainMenu';
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
        var sceneController = new GameObject("Main Menu Controller", this);

        var theController = new MainMenuManager(sceneController);
        sceneController.AddComponent(theController);

        this.sceneObjects.push(sceneController);


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
        Screen Space UI
        ====================================================================================================
        */
        {
            // Parents for mass showing/ hiding GameObjects
            var menuParent = new GameObject("Main Menu Parent");
            this.sceneObjects.push(menuParent);

            var instructionsParent = new GameObject("Instructions Menu Parent");
            instructionsParent.active = false;
            this.sceneObjects.push(instructionsParent);

            theController.mainMenuParent = menuParent;
            theController.instructionsParent = instructionsParent;

            // Main Menu Elements
            // Menu Title
            {
                // Background Layer
                var menuTitle = new GameObject('Title Background Text', this);
                menuTitle.posX = 0;
                menuTitle.posY = -25;
                menuTitle.anchorX = 0.5;
                menuTitle.anchorY = 0.5;
                var textRenderer = new TextRenderer(menuTitle);
                textRenderer.text = "Battle Frogs";
                textRenderer.fontSize = 75;
                textRenderer.textColor = '#303030';
                textRenderer.textAlign = 'center';
                menuTitle.AddRenderer(textRenderer, 10);
                menuParent.children.push(menuTitle);

                // Foreground Layer
                menuTitle = new GameObject('Title Background Text', this);
                menuTitle.posX = 4;
                menuTitle.posY = -21;
                menuTitle.anchorX = 0.5;
                menuTitle.anchorY = 0.5;
                textRenderer = new TextRenderer(menuTitle);
                textRenderer.text = "Battle Frogs";
                textRenderer.fontSize = 75;
                textRenderer.textColor = '#E1E1E1';
                textRenderer.textAlign = 'center';
                menuTitle.AddRenderer(textRenderer, 10);
                menuParent.children.push(menuTitle);
            }
            // Menu Buttons
            {
                // Start Game Button
                {
                    var startButton = new GameObject('Start Button', this);
                    startButton.posX = -125;
                    startButton.posY = 75;
                    startButton.width = 150;
                    startButton.height = 75;
                    startButton.anchorX = 0.5;
                    startButton.anchorY = 0.5;

                    var buttonRenderer = new UIRenderer(startButton);
                    buttonRenderer.filePath = 'Images/Button (Medium).png';
                    buttonRenderer.spriteWidth = 128;
                    startButton.AddRenderer(buttonRenderer, 10);

                    var buttonController = new ButtonComponent(startButton);
                    buttonController.targetRenderer = buttonRenderer;
                    buttonController.buttonBehaviour = StartGameButtonEvent;
                    startButton.AddComponent(buttonController);

                    var childText = new GameObject("Button Text", this);
                    childText.SetLocalPos({ x : 0, y : -3 });
                    childText.parentObject = startButton;

                    var textRenderer = new TextRenderer(childText);
                    textRenderer.fontSize = 18;
                    textRenderer.text = "- Start Game -";
                    textRenderer.textAlign = 'center';

                    childText.AddRenderer(textRenderer);

                    startButton.children.push(childText);
                    menuParent.children.push(startButton);
                }

                // Instructions Button
                {
                    var instructionsButton = new GameObject('Instructions Button', this);
                    instructionsButton.posX = 125;
                    instructionsButton.posY = 75;
                    instructionsButton.width = 150;
                    instructionsButton.height = 75;
                    instructionsButton.anchorX = 0.5;
                    instructionsButton.anchorY = 0.5;

                    var buttonRenderer = new UIRenderer(instructionsButton);
                    buttonRenderer.filePath = 'Images/Button (Medium).png';
                    buttonRenderer.spriteWidth = 128;
                    instructionsButton.AddRenderer(buttonRenderer, 10);

                    var buttonController = new ButtonComponent(instructionsButton);
                    buttonController.targetRenderer = buttonRenderer;
                    buttonController.buttonBehaviour = OpenInstructionsButtonEvent;
                    instructionsButton.AddComponent(buttonController);

                    var childText = new GameObject("Button Text", this);
                    childText.SetLocalPos({ x : 0, y : -3 });
                    childText.parentObject = instructionsButton;

                    var textRenderer = new TextRenderer(childText);
                    textRenderer.fontSize = 18;
                    textRenderer.text = "- Instructions -";
                    textRenderer.textAlign = 'center';

                    childText.AddRenderer(textRenderer);

                    instructionsButton.children.push(childText);
                    menuParent.children.push(instructionsButton);
                }
            }


            // Instructions Elements
            // Instructions Title
            {
                // Background Layer
                /*var menuTitle = new GameObject('Title Background Text', this);
                menuTitle.posX = 0;
                menuTitle.posY = -25;
                menuTitle.anchorX = 0.5;
                menuTitle.anchorY = 0.5;
                var textRenderer = new TextRenderer(menuTitle);
                textRenderer.text = "Battle Frogs";
                textRenderer.fontSize = 75;
                textRenderer.textColor = '#303030';
                textRenderer.textAlign = 'center';
                menuTitle.AddRenderer(textRenderer, 10);
                instructionsParent.children.push(menuTitle);

                // Foreground Layer
                menuTitle = new GameObject('Title Background Text', this);
                menuTitle.posX = 4;
                menuTitle.posY = -21;
                menuTitle.anchorX = 0.5;
                menuTitle.anchorY = 0.5;
                textRenderer = new TextRenderer(menuTitle);
                textRenderer.text = "Battle Frogs";
                textRenderer.fontSize = 75;
                textRenderer.textColor = '#E1E1E1';
                textRenderer.textAlign = 'center';
                menuTitle.AddRenderer(textRenderer, 10);
                instructionsParent.children.push(menuTitle);*/
            }
            // Back Button
            {
                var returnButton = new GameObject('Return Button', this);
                returnButton.posX = 0;
                returnButton.posY = 150;
                returnButton.width = 150;
                returnButton.height = 75;
                returnButton.anchorX = 0.5;
                returnButton.anchorY = 0.5;

                var buttonRenderer = new UIRenderer(returnButton);
                buttonRenderer.filePath = 'Images/Button (Medium).png';
                buttonRenderer.spriteWidth = 128;
                returnButton.AddRenderer(buttonRenderer, 10);

                var buttonController = new ButtonComponent(returnButton);
                buttonController.targetRenderer = buttonRenderer;
                buttonController.buttonBehaviour = CloseInstructionsButtonEvent;
                returnButton.AddComponent(buttonController);

                var childText = new GameObject("Button Text", this);
                childText.SetLocalPos({ x : 0, y : -1 });
                childText.parentObject = returnButton;

                var textRenderer = new TextRenderer(childText);
                textRenderer.fontSize = 24;
                textRenderer.text = "- Return -";
                textRenderer.textAlign = 'center';

                childText.AddRenderer(textRenderer);

                returnButton.children.push(childText);
                instructionsParent.children.push(returnButton);
            }
        }
    }
}