using Application.DTOs.paper;
using Application.DTOs.property;
using DataAccess;

namespace Application.Interfaces;

public interface IPaperService
{
    List<PaperToClient> GetAll();
    List<PropertyToClient> GetPropertiesByPaperId(int paperId);
    PaperResponseDto Create(PaperCreateDto createDto);
    PaperToClient GetPaperById(int id);
    AddPropertiesToPaperResponseDto AddPropertiesToPaper(AddPropertiesToPaperDto addPropertiesToPaperDto);

    PaperResponseDto RestockPaper(int paperId, int restockCount);
    PaperResponseDto DiscontinuePaper(int paperId, bool status);

    bool UpdatePaper(int id, PaperToClient paper);
}