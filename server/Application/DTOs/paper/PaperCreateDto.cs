using Application.DTOs.property;
using DataAccess;

namespace Application.DTOs.paper;
public class PaperCreateDto
{
    public string Name { get; set; } = null!;
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }
    public List<PropertyDto> Properties { get; set; } = new List<PropertyDto>();
    public Paper GetPaper()
    {
        return new Paper
        {
            Name = Name,
            Discontinued = Discontinued,
            Stock = Stock,
            Price = Price,
        };
    }

    public List<Property> GetProperties()
    {
        return Properties.Select(p => new Property
        {
            Id = p.Id,
            PropertyName = p.PropertyName
        }).ToList();
    }
}

