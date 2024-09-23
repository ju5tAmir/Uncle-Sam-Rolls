namespace API;

public class Order
{
    public int id { get; set; }
    public DateTime orderDate { get; set; }
    public DateTime deliveryDate { get; set; }
    public string status { get; set; }
    public double totalAmount { get; set; }
    public int customerId { get; set; }
    public Customer customer { get; set; }
    public ICollection<OrderEntry> orderEntries { get; set; }
}