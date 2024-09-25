using Application.DTOs.customer;
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

    /**
     * This method gets information of a customer for creation (except orders)
     * Then creates a customer object by adding empty orders list into it
     * Finally returns another dto which has everything which Customer has (this object can be modified to return whatever we want to return to user after creation of the customer object)
     */
    public CustomerResponseDto? Create(CustomerCreateDto customerCreateDto)
    {
        // Creating a customer object from the received DTO
        Customer customer = customerCreateDto.FromEntity(customerCreateDto); // Assuming FromEntity is a valid method
    
        // Adding the object into the database
        _context.Customers.Add(customer);
    
        // Save changes and check if the operation was successful
        int affectedRows = _context.SaveChanges();
    
        if (affectedRows > 0) // Check if any rows were affected
        {
            // Create a response DTO from the created customer
            CustomerResponseDto responseDto = new CustomerResponseDto().FromEntity(customer);
            return responseDto; // Return the response DTO
        }
    
        // If no rows were affected, return null or handle the failure case
        return null;
    }

    public bool Delete(int id)
    {
        var customer = _context.Customers.Find(id);

        if (customer == null) 
            return false;

        _context.Customers.Remove(customer);
        return _context.SaveChanges() > 0;
    }
}