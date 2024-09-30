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

    // ToDo: Possibility to create paper with properties
    public PaperResponseDto Create(PaperCreateDto createDto)
    {
        // Receive user input as DTO and convert it into paper
        Paper? paper = createDto.ToPaper();

        if (paper == null)
        {
            throw new Exception("Failed to create");
        }
        
        // Adding paper object into the db
        _context.Papers.Add(paper);
        _context.SaveChanges();

        // Return necessary fields as DTO
        // PaperResponseDto responseDto = new PaperResponseDto().FromEntity(paper);
        PaperResponseDto responseDto = new PaperResponseDto().FromEntity(paper);
        
        return responseDto;
    }
}