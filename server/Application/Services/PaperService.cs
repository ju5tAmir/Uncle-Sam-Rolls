using Application.DTOs.paper;
using Application.Interfaces;
using DataAccess;

namespace Application.Services;

/**
 * This paper is like products that we have to list and show for the customer
 * It should be accessible only for admins to CRUD
 */
public class PaperService: IPaperService
{
    private readonly UncleSamContext _context;
    
    public PaperService(UncleSamContext context)
    {
        _context = context;
    }


    public List<Paper> GetAll()
    {
        return _context.Papers.ToList();
    }

    public Paper Create(PaperCreateDto createDto)
    {
        Paper? paper = createDto.FromEntity(createDto);

        if (paper == null)
        {
            throw new Exception("Failed to create");
        }

        return paper;
    }
}