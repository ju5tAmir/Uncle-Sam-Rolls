using DataAccess;

namespace Application.DTOs.property;

public class PropertyResponseDto
{
    public int PropertyId { get; set; }

    public string PropertyName { get; set; } = null!;

    public static PropertyResponseDto FromEntity(Property property)
    {
        return new PropertyResponseDto()
        {
            PropertyId = property.Id,
            PropertyName = property.PropertyName
        };
    }
}