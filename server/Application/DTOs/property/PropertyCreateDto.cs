using DataAccess;

namespace Application.DTOs.property;

public class PropertyCreateDto
{
    public string PropertyName { get; set; } = null!;

    public Property FromEntity(PropertyCreateDto createDto)
    {
        return new Property()
        {
            PropertyName = createDto.PropertyName,
            Papers = new List<Paper>()
        };
    }
}