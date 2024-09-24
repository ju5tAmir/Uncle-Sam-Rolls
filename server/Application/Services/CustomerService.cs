using Application.Interfaces;
using DataAccess;

namespace Application.Services;

public class CustomerService: ICustomerService
{

    private readonly UncleSamContext _context;
    
    public CustomerService(UncleSamContext context)
    {
        _context = context;
    }
    
    public List<Customer> GetAll()
    {
        return _context.Customers.ToList();
    }

    public Customer? GetById(int id)
    {
        return _context.Customers.Find(id);
    }
}