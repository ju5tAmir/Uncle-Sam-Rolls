using DataAccess;

namespace Application.DTOs.paper;

public class PaperCreateDto
{
    public string Name { get; set; } = null!;
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }
    public ICollection<Property> Properties { get; set; } = new List<Property>();

    public Paper? FromEntity(PaperCreateDto createDto)
    {
        return new Paper()
        {
            Name = createDto.Name,
            Discontinued = createDto.Discontinued,
            Stock = createDto.Stock,
            Price = createDto.Price,
            Properties = createDto.Properties
        };
    }
}