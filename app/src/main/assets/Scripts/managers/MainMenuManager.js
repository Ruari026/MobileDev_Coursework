class MainMenuManager extends Component
{
    componentName = "MainMenuManager";

    mainMenuParent = null;
    instructionsParent = null;

    gameMusic = null;


    /*
    ====================================================================================================
    Component Inherited Methods
    ====================================================================================================
    */
    Start()
    {
        // Ensures that the game starts with the main menu being shown
        this.OpenMainMenu();

        // Playing the background music
        this.gameMusic.PlaySound();
    }

    Update()
    {

    }


    /*
    ====================================================================================================
    Methods To Be Called From Scene UI Buttons
    ====================================================================================================
    */
    OpenMainMenu()
    {
        if (platformMobile)
        {
            // Mobile Platform audio handled by android native app code
            if (soundManager != null)
            {
                soundManager.PlaySound(0);
            }
        }
        else
        {
            // Web Platform audio handled by web audio API

        }

        this.mainMenuParent.active = true;
        this.instructionsParent.active = false;
    }

    OpenInstructions()
    {
        if (platformMobile)
        {
            if (soundManager != null)
            {
                soundManager.PlaySound(0);
            }
        }
        else
        {

        }

        this.mainMenuParent.active = false;
        this.instructionsParent.active = true;
    }
}