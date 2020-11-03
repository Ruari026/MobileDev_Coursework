class GameObject
{
    objectComponents = [];
    objectRenderer = null;

    Init()
    {

    }

    Update()
    {
        for (i = 0; i < this.objectComponents.length; i++)
        {
            this.objectComponents[i].Update();
        }
    }

    Draw()
    {

    }
}