using Application.DTOs.property;
using DataAccess;

namespace Application.DTOs.paper;

public class AddPropertiesToPaperDto
{
    public int PaperId { get; set; }
    public List<int> Properties { get; set; } = new();

}