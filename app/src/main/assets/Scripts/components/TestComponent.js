class TestComponent extends Component
{
    componentName = "TestComponent";

    sceneCamera = null;

    touchStartX = 0;
    touchStartY = 0;

    touchCurrentX = 0;
    touchCurrentY = 0;

    Start()
    {

    }

    Update()
    {
        console.info('Updating');
    }

    Input(event)
    {
        //console.info(event.type);
        /*if (event.type == 'touchstart' || event.type == 'mousedown')
        {
                console.info('Zooming In');
                if (this.sceneCamera.zoom < 2.0)
                {
                    this.sceneCamera.zoom *= 2;
                }
        }

        if (event.type == 'touchend' || event.type == 'mouseup')
        {
            console.info('Zooming Out');
            if (this.sceneCamera.zoom > 0.5)
            {
                this.sceneCamera.zoom /= 2;
            }
        }*/
    }

    End()
    {

    }
}