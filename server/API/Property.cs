namespace API;

public class Property
{
    public int id { get; set; }
    public string propertyName { get; set; }
    public ICollection<PaperProperty> paperProperties { get; set; }
}

