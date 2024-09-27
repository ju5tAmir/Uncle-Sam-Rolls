using DataAccess;

namespace Application.DTOs.paper;

public class PaperResponseDto
{
    public string Name { get; set; }

    public int Stock { get; set; }

    public double Price { get; set; }

    public bool Discontinued { get; set; }

    public ICollection<OrderEntry> orderEntries;

    public ICollection<Property> properties;
    
    
    public PaperResponseDto FromEntity(Paper paper)
    {

        return new PaperResponseDto()

        {
            Name = paper.Name,
            Stock = paper.Stock,
            Price = paper.Price,
            Discontinued = paper.Discontinued,
            orderEntries = new List<OrderEntry>(),
            properties = new List<Property>(),
        };
    }
}