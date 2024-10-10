using Application.DTOs.property;
using DataAccess;

namespace Application.DTOs.paper;

public class AddPropertiesToPaperResponseDto
{
    public PaperResponseDto PaperResponse { get; set; } = null!;
    public List<PropertyResponseDto> PropertyResponse { get; set; } = null!;

    public static AddPropertiesToPaperResponseDto FromEntity(Paper paper)
    {
        return new AddPropertiesToPaperResponseDto()
        {
            PaperResponse = PaperResponseDto.FromEntity(paper),
            PropertyResponse = paper.Properties.Select(p => new PropertyResponseDto
            {
                PropertyId = p.Id,
                PropertyName = p.PropertyName
            }).ToList()
        };
    }
}