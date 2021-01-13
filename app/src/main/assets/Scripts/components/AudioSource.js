class AudioSource extends Component
{
    componentName = "AudioSource";

    // General Audio Details
    filePath = "";
    isSFX = true;
    loop = false;

    // Web Specific Audio Details
    audioElement = null;


    /*
    ====================================================================================================
    Component Inherited Methods
    ====================================================================================================
    */
    Start()
    {
        if (!platformMobile)
        {
            // Need to create and setup an audio element for the web page
            this.audioElement = document.createElement("AUDIO");

            // Setting audio element property's for game use
            this.audioElement.src = this.filePath;

            this.audioElement.setAttribute("preload", "auto");
            this.audioElement.setAttribute("controls", "none");
            this.audioElement.style.display = "none";

            document.body.appendChild(this.audioElement);
        }
    }

    Update()
    {
    }


    /*
    ====================================================================================================
    Audio Specific Methods
    ====================================================================================================
    */
    PlaySound()
    {
        if (platformMobile)
        {
            // Audio Handled by Android Native Code
            console.info(this.filePath);
            soundManager.PlaySound(this.filePath);
        }
        else
        {
            this.audioElement.play();
        }
    }

    PlayMusic()
    {
        if (platformMobile)
        {
            // Audio Handled by Android Native Code
            soundManager.PlayMusic(this.filePath);
        }
        else
        {
            this.audioElement.play();
        }
    }
}