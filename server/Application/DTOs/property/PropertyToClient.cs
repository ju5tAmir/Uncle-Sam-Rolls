using DataAccess;

namespace Application.DTOs.property;

public class PropertyToClient
{
    public int PropertyId { get; set; }

    public string PropertyName { get; set; } = null!;
    
    public Property ToProperty()
    {
        return new Property()
        {
            Id = PropertyId,
            PropertyName = PropertyName
        };
    }

}