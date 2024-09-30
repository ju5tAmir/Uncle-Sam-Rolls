using Application.DTOs.property;
using DataAccess;

namespace Application.DTOs.paper;

public class PaperResponseDto
{
    public string Name { get; set; } = null!;
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }

    public PaperResponseDto FromEntity(Paper paper)
    {
        return new PaperResponseDto
        {
            Name = paper.Name,
            Discontinued = paper.Discontinued,
            Stock = paper.Stock,
            Price = paper.Price,
        };
    }
}