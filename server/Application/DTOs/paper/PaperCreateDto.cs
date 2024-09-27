using DataAccess;

namespace Application.DTOs.paper;

public class PaperCreateDto
{
    public string Name { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }
    public bool Discontinued { get; set; }


    public Paper FromEntity(PaperCreateDto paperCreateDto)
    {
        return new Paper()
        {
            Name = paperCreateDto.Name,
            Stock = paperCreateDto.Stock,
            Price = paperCreateDto.Price,
            Discontinued = paperCreateDto.Discontinued,
        };
    }
}