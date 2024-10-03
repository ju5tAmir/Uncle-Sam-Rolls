using DataAccess;

namespace Application.DTOs.property;

public class PropertyCreateDto
{
    public string PropertyName { get; set; } = null!;

    public Property ToProperty()
    {
        return new Property()
        {
            PropertyName = PropertyName
        };
    }
}