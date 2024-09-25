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
    
    
    public Paper Create(Paper paper)
    {
        throw new NotImplementedException();
    }
}