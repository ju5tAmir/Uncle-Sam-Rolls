using Application.DTOs.property;
using DataAccess;

namespace Application.DTOs.paper;

public class PaperResponseDto
{
    public string Name { get; set; } = null!;
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }
    public List<PropertyDto> Properties { get; set; } = new List<PropertyDto>();


    public PaperResponseDto IncludePaper(Paper paper)
    {

        Name = paper.Name;
        Discontinued = paper.Discontinued;
        Stock = paper.Stock;
        Price = paper.Price;


        return this;
    }

    public PaperResponseDto IncludeProperties(List<Property> properties)
    {
        Properties = properties.Select(p => new PropertyDto
        {
            Id = p.Id,
            PropertyName = p.PropertyName
        }).ToList();

        return this;
    }
}