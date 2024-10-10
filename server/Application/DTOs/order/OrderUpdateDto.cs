namespace Application.DTOs.order;

public class OrderUpdateDto
{
    public int Id { get; set; }
    public string Status { get; set; } = null!;
}