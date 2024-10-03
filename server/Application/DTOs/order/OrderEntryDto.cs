namespace Application.DTOs.order;

public class OrderEntryDto
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    public int PaperId { get; set; }
    public int CustomerId { get; set; } 
}