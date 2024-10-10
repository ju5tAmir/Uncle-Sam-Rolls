using DataAccess;

namespace Application.DTOs.paper;

public class PaperResponseDto
{
    public int Id { get; set; } 
    public string Name { get; set; } = null!;
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }

    public static PaperResponseDto FromEntity(Paper paper)
    {
        return new PaperResponseDto()
        {
            Id = paper.Id,
            Name = paper.Name,
            Discontinued = paper.Discontinued,
            Stock = paper.Stock,
            Price = paper.Price
        };
    }
}

