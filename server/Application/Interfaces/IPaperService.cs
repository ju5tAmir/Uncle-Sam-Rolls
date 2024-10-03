using Application.DTOs.paper;
using Application.DTOs.property;
using DataAccess;

namespace Application.Interfaces;

public interface IPaperService
{
    List<Paper> GetAll();
    PaperResponseDto Create(PaperCreateDto createDto);

    AddPropertiesToPaperResponseDto AddPropertiesToPaper(AddPropertiesToPaperDto addPropertiesToPaperDto);

    PaperResponseDto RestockPaper(int paperId, int restockCount);
    PaperResponseDto DiscontinuePaper(int paperId, bool status);
}