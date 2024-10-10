using Application.DTOs.property;
using DataAccess;

namespace Application.DTOs.paper;

public class PaperToClient
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }
    public List<PropertyToClient> Properties { get; set; } = new List<PropertyToClient>();

    public static PaperToClient FromEntity(Paper paper)
    {
        return new PaperToClient()
        {
            Id = paper.Id,
            Name = paper.Name,
            Discontinued = paper.Discontinued,
            Stock = paper.Stock,
            Price = paper.Price,
            Properties = paper.Properties.Select(p => new PropertyToClient
            {
                PropertyId = p.Id,
                PropertyName = p.PropertyName
            }).ToList()
        };
    }
}