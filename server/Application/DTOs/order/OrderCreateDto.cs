using DataAccess;

namespace Application.DTOs.order;

public class OrderCreateDto
{
    public List<OrderEntryDto> OrderEntries { get; set; } = new List<OrderEntryDto>();
    public int CustomerId { get; set; }
    
}