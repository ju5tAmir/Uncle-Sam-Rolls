namespace API;

public class Paper
{
    public int id { get; set; }
    public string name { get; set; }
    public bool discontinued { get; set; }
    public int stock { get; set; }
    public double price { get; set; }
    public ICollection<OrderEntry> orderEntries { get; set; }
    public ICollection<Property> paperProperties { get; set; }
}