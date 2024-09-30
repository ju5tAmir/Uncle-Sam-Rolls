using Application.DTOs.paper;
using DataAccess;

namespace Application.Interfaces;

public interface IPaperService
{
    List<Paper> GetAll();
    PaperResponseDto? Create(PaperCreateDto createDto);

}