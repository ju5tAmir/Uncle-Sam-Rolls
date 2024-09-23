namespace API;

public class OrderEntry
{
    public int id { get; set; }
    public int quantity { get; set; }
    public int productId { get; set; }
    public int orderId { get; set; }
    public Order order { get; set; }
    public Paper product { get; set; }
}