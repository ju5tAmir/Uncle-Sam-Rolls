using Application.Interfaces;
using DataAccess;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("/api/customer/")]
public class CustomerController: ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomerController(ICustomerService customerService)
    {
        _customerService = customerService;
    }
    
    // Admin privilege only
    [HttpGet]
    [Route("all")]
    public ActionResult<List<Customer>> GetAllCustomers()
    {
        return Ok(_customerService.GetAll());
    }

    [HttpGet]
    [Route("{id}")]
    public ActionResult<Customer> GetCustomer([FromQuery] int id)
    {
        Customer? customer = _customerService.GetById(id);

        // It raises the question, should we notify 404 or 200?
        // As it's giving the possibility of brute forcing for an attacker
        // But if an attacker knows what he's doing, it shouldn't be a problem
        // Defender POV? authorization, rate-limiting, decrease scope of response

        if (customer == null)
        {
            return NotFound();
        }

        return Ok(customer);
    }
}