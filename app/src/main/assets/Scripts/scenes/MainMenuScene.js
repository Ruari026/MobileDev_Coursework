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

        var backgroundMusic = new AudioSource(sceneController);
        backgroundMusic.filePath = "Audio/Andrew_Codeman_-_01_-_Tired_traveler_on_the_way_to_home.ogg"
        backgroundMusic.isSFX = false;
        backgroundMusic.loop = true;
        sceneController.AddComponent(backgroundMusic);

        var theController = new MainMenuManager(sceneController);
        theController.gameMusic = backgroundMusic;
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

                    var buttonAudio = new AudioSource(startButton);
                    buttonAudio.filePath = "Audio/pop.wav";
                    startButton.AddComponent(buttonAudio);

                    var buttonController = new ButtonComponent(startButton);
                    buttonController.targetRenderer = buttonRenderer;
                    buttonController.targetAudio = buttonAudio;
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

                    var buttonAudio = new AudioSource(instructionsButton);
                    buttonAudio.filePath = "Audio/pop.wav";
                    instructionsButton.AddComponent(buttonAudio);

                    var buttonController = new ButtonComponent(instructionsButton);
                    buttonController.targetRenderer = buttonRenderer;
                    buttonController.targetAudio = buttonAudio;
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
                var controlsTitle = new GameObject('Title Background Text', this);
                controlsTitle.posX = 0;
                controlsTitle.posY = -150;
                controlsTitle.anchorX = 0.5;
                controlsTitle.anchorY = 0.5;
                var textRenderer = new TextRenderer(controlsTitle);
                textRenderer.text = "Controls";
                textRenderer.fontSize = 45;
                textRenderer.textColor = '#303030';
                textRenderer.textAlign = 'center';
                controlsTitle.AddRenderer(textRenderer, 10);
                instructionsParent.children.push(controlsTitle);

                // Foreground Layer
                controlsTitle = new GameObject('Title Background Text', this);
                controlsTitle.posX = 4;
                controlsTitle.posY = -146;
                controlsTitle.anchorX = 0.5;
                controlsTitle.anchorY = 0.5;
                textRenderer = new TextRenderer(controlsTitle);
                textRenderer.text = "Controls";
                textRenderer.fontSize = 45;
                textRenderer.textColor = '#E1E1E1';
                textRenderer.textAlign = 'center';
                controlsTitle.AddRenderer(textRenderer, 10);
                instructionsParent.children.push(controlsTitle);
            }
            // Jump Controls
            {
                var icon = new GameObject("Jump Icon")
                icon.posX = -225;
                icon.posY = -95;
                icon.width = 75;
                icon.height = 75;
                icon.anchorX = 0.5;
                icon.anchorY = 0.5;
                var iconRenderer = new UIRenderer(icon);
                iconRenderer.filePath = 'Images/arrow.png';
                iconRenderer.spriteWidth = 64;
                iconRenderer.spriteHeight = 64;
                icon.AddRenderer(iconRenderer);
                instructionsParent.children.push(icon);

                var text = new GameObject("Jump Text (1)");
                text.posX = -125;
                text.posY = -70;
                text.width = 75;
                text.height = 75;
                text.anchorX = 0.5;
                text.anchorY = 0.5;
                var textRenderer = new TextRenderer(text);
                textRenderer.text = "To Jump";
                textRenderer.fontSize = 24;
                textRenderer.textColor = '#323232';
                text.AddRenderer(textRenderer, 10);
                instructionsParent.children.push(text);

                text = new GameObject("Jump Text (2)");
                text.posX = -122;
                text.posY = -67;
                text.width = 75;
                text.height = 75;
                text.anchorX = 0.5;
                text.anchorY = 0.5;
                textRenderer = new TextRenderer(text);
                textRenderer.text = "To Jump";
                textRenderer.fontSize = 24;
                textRenderer.textColor = '#E1E1E1';
                text.AddRenderer(textRenderer, 10);
                instructionsParent.children.push(text);

                text = new GameObject("Jump Text (3)");
                text.posX = -125;
                text.posY = -45;
                text.width = 75;
                text.height = 75;
                text.anchorX = 0.5;
                text.anchorY = 0.5;
                textRenderer = new TextRenderer(text);
                textRenderer.text = "(Holding Causes The Player To Jump Further)";
                textRenderer.fontSize = 24;
                textRenderer.textColor = '#323232';
                text.AddRenderer(textRenderer, 10);
                instructionsParent.children.push(text);

                text = new GameObject("Jump Text (4)");
                text.posX = -122;
                text.posY = -42;
                text.width = 75;
                text.height = 75;
                text.anchorX = 0.5;
                text.anchorY = 0.5;
                textRenderer = new TextRenderer(text);
                textRenderer.text = "(Holding Causes The Player To Jump Further)";
                textRenderer.fontSize = 24;
                textRenderer.textColor = '#E1E1E1';
                text.AddRenderer(textRenderer, 10);
                instructionsParent.children.push(text);
            }
            // Fire Controls
            {
                var icon = new GameObject("Jump Icon")
                icon.posX = -225;
                icon.posY = 0;
                icon.width = 75;
                icon.height = 75;
                icon.anchorX = 0.5;
                icon.anchorY = 0.5;
                var iconRenderer = new UIRenderer(icon);
                iconRenderer.filePath = 'Images/fire.png';
                iconRenderer.spriteWidth = 64;
                iconRenderer.spriteHeight = 64;
                icon.AddRenderer(iconRenderer);
                instructionsParent.children.push(icon);

                var text = new GameObject("Jump Text (1)");
                text.posX = -125;
                text.posY = 25;
                text.width = 75;
                text.height = 75;
                text.anchorX = 0.5;
                text.anchorY = 0.5;
                var textRenderer = new TextRenderer(text);
                textRenderer.text = "Fire A Projectile";
                textRenderer.fontSize = 24;
                textRenderer.textColor = '#323232';
                text.AddRenderer(textRenderer, 10);
                instructionsParent.children.push(text);

                text = new GameObject("Jump Text (2)");
                text.posX = -121;
                text.posY = 28;
                text.width = 75;
                text.height = 75;
                text.anchorX = 0.5;
                text.anchorY = 0.5;
                textRenderer = new TextRenderer(text);
                textRenderer.text = "Fire A Projectile";
                textRenderer.fontSize = 24;
                textRenderer.textColor = '#E1E1E1';
                text.AddRenderer(textRenderer, 10);
                instructionsParent.children.push(text);

                text = new GameObject("Jump Text (3)");
                text.posX = -125;
                text.posY = 50;
                text.width = 75;
                text.height = 75;
                text.anchorX = 0.5;
                text.anchorY = 0.5;
                textRenderer = new TextRenderer(text);
                textRenderer.text = "(Holding Causes The Projectile To Fire Further)";
                textRenderer.fontSize = 24;
                textRenderer.textColor = '#323232';
                text.AddRenderer(textRenderer, 10);
                instructionsParent.children.push(text);

                text = new GameObject("Jump Text (4)");
                text.posX = -122;
                text.posY = 53;
                text.width = 75;
                text.height = 75;
                text.anchorX = 0.5;
                text.anchorY = 0.5;
                textRenderer = new TextRenderer(text);
                textRenderer.text = "(Holding Causes The Projectile To Fire Further)";
                textRenderer.fontSize = 24;
                textRenderer.textColor = '#E1E1E1';
                text.AddRenderer(textRenderer, 10);
                instructionsParent.children.push(text);
            }
            // Aim Controls
            {
                var icon = new GameObject("Jump Icon")
                icon.posX = -232;
                icon.posY = 95;
                icon.width = 50;
                icon.height = 50;
                icon.anchorX = 0.5;
                icon.anchorY = 0.5;
                var iconRenderer = new UIRenderer(icon);
                iconRenderer.filePath = 'Images/crosshairs.png';
                iconRenderer.spriteWidth = 64;
                iconRenderer.spriteHeight = 64;
                icon.AddRenderer(iconRenderer);
                instructionsParent.children.push(icon);

                var text = new GameObject("Jump Text (1)");
                text.posX = -125;
                text.posY = 120;
                text.width = 75;
                text.height = 75;
                text.anchorX = 0.5;
                text.anchorY = 0.5;
                var textRenderer = new TextRenderer(text);
                textRenderer.text = "Aims Where The Player Jumps/ Fires";
                textRenderer.fontSize = 24;
                textRenderer.textColor = '#323232';
                text.AddRenderer(textRenderer, 10);
                instructionsParent.children.push(text);

                text = new GameObject("Jump Text (2)");
                text.posX = -122;
                text.posY = 123;
                text.width = 75;
                text.height = 75;
                text.anchorX = 0.5;
                text.anchorY = 0.5;
                textRenderer = new TextRenderer(text);
                textRenderer.text = "Aims Where The Player Jumps/ Fires";
                textRenderer.fontSize = 24;
                textRenderer.textColor = '#E1E1E1';
                text.AddRenderer(textRenderer, 10);
                instructionsParent.children.push(text);

                text = new GameObject("Jump Text (3)");
                text.posX = -125;
                text.posY = 145;
                text.width = 75;
                text.height = 75;
                text.anchorX = 0.5;
                text.anchorY = 0.5;
                textRenderer = new TextRenderer(text);
                textRenderer.text = "(Click And Drag To Change Direction)";
                textRenderer.fontSize = 24;
                textRenderer.textColor = '#323232';
                text.AddRenderer(textRenderer, 10);
                instructionsParent.children.push(text);

                text = new GameObject("Jump Text (4)");
                text.posX = -122;
                text.posY = 148;
                text.width = 75;
                text.height = 75;
                text.anchorX = 0.5;
                text.anchorY = 0.5;
                textRenderer = new TextRenderer(text);
                textRenderer.text = "(Click And Drag To Change Direction)";
                textRenderer.fontSize = 24;
                textRenderer.textColor = '#E1E1E1';
                text.AddRenderer(textRenderer, 10);
                instructionsParent.children.push(text);
            }
            // Back Button
            {
                var returnButton = new GameObject('Return Button', this);
                returnButton.posX = 0;
                returnButton.posY = 175;
                returnButton.width = 150;
                returnButton.height = 75;
                returnButton.anchorX = 0.5;
                returnButton.anchorY = 0.5;

                var buttonRenderer = new UIRenderer(returnButton);
                buttonRenderer.filePath = 'Images/Button (Medium).png';
                buttonRenderer.spriteWidth = 128;
                returnButton.AddRenderer(buttonRenderer, 10);

                var buttonAudio = new AudioSource(returnButton);
                buttonAudio.filePath = "Audio/pop.wav";
                returnButton.AddComponent(buttonAudio);

                var buttonController = new ButtonComponent(returnButton);
                buttonController.targetRenderer = buttonRenderer;
                buttonController.targetAudio = buttonAudio;
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