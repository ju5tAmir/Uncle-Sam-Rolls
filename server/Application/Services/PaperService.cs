using Application.DTOs.paper;
using Application.Interfaces;
using DataAccess;

namespace Application.Services;

public class PaperService : IPaperService
{
    private readonly UncleSamContext _context;

    public PaperService(UncleSamContext context)
    {
        _context = context;
    }

public List<Paper> GetPapers()
    {
       return _context.Papers.ToList();
    }

    public Paper? GetPaperById(int id)
    {
        return _context.Papers.Find(id);
    }

    public PaperResponseDto? CreatePaper(PaperCreateDto paperCreateDto)
    {
        Paper paper = paperCreateDto.FromEntity(paperCreateDto);
        
        _context.Papers.Add(paper);
        
        int affectedRows = _context.SaveChanges();
        if (affectedRows > 0)
        {
            PaperResponseDto responseDto = new PaperResponseDto().FromEntity(paper);
            return responseDto;
        }
        return null;
    }

    public bool Discontinue(int id)
    {
        var paper = _context.Papers.Find(id);
        
        if (paper == null)
        {
            return false; 
        }
        paper.Discontinued = false;
        
        int affectedRows = _context.SaveChanges();

        return affectedRows > 0;
    }
}