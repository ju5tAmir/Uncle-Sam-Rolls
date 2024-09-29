using Application.DTOs.paper;

using DataAccess;

namespace Application.Interfaces;

public interface IPaperService
{
    List<Paper> GetPapers();
    Paper? GetPaperById(int id);
    PaperResponseDto? CreatePaper(PaperCreateDto paperCreateDto);
    bool Discontinue(int id);
    bool RestockPaper(int id, int additionalStock);
    bool AddPropertyToPaper(int paperId, int propertyId);
    Property? CreateProperty(string propertyName);
}