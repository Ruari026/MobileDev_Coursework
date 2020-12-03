class BoxCollider extends Component
{
    componentName = "BoxCollider";

    offsetX = 0;
    offsetY = 0;

    sizeX = 0;
    sizeY = 0;

    IsCollidingWith(otherBoxCollider)
    {
        var thisColliderMin = {x : this.parentGameObject.GetGlobalPos().x - (this.sizeX / 2), y : this.parentGameObject.GetGlobalPos().y - (this.sizeY / 2)};
        var thisColliderSize = {w : this.sizeX, h : this.sizeY};

        var otherColliderMin = {x : otherBoxCollider.parentGameObject.GetGlobalPos().x - (otherBoxCollider.sizeX / 2), y : otherBoxCollider.parentGameObject.GetGlobalPos().y - (otherBoxCollider.sizeY / 2)};
        var otherColliderSize= {w : otherBoxCollider.sizeX, h : otherBoxCollider.sizeY};

        if (thisColliderMin.x < otherColliderMin.x + otherColliderSize.w &&
           thisColliderMin.x + thisColliderSize.w > otherColliderMin.x &&
           thisColliderMin.y < otherColliderMin.y + otherColliderSize.h &&
           thisColliderMin.y + thisColliderSize.h > otherColliderMin.y)
        {
           return true
        }
        else
        {
            return false;
        }
    }
}