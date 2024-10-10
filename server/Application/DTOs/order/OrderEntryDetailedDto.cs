using Application.DTOs.paper;
using DataAccess;

namespace Application.DTOs.order;

public class OrderEntryDetailedDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }

    public static OrderEntryDetailedDto FromEntity(Paper paper, int qty)
    {
        return new OrderEntryDetailedDto()
        {
            Id = paper.Id,
            Name = paper.Name,
            Discontinued = paper.Discontinued,
            Price = paper.Price,
            Stock = paper.Stock,
            Quantity = qty
        };
    }
}