using Application.Interfaces;
using DataAccess;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("/api/order/")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;
    
    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpPost]
    [Route("create")]
    public ActionResult<Order> CreateOrder([FromBody] Order order)
    {
        Order? o =  _orderService.Create(order);

        return Ok(o);

    }
}