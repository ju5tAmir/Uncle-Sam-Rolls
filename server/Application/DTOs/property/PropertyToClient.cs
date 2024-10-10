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

    public static PropertyToClient FromEntity(Property property)
    {
        return new PropertyToClient()
        {
            PropertyId = property.Id,
            PropertyName = property.PropertyName
        };
    } 
}