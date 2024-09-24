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
}