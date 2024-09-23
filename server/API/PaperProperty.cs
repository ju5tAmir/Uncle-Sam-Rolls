namespace API;

public class PaperProperty
{
    public int paperId { get; set; }
    public Paper paper { get; set; }
    public int propertyId { get; set; }
    public Property property { get; set; }
}