using Application.DTOs.order;
using Application.Interfaces;
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
    
    [HttpGet]
    [Route("{id}")]
    public ActionResult<OrderResponseDto> GetOrderById([FromRoute] int id)
    {
        try
        {
            return Ok(_orderService.GetOrderById(id));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    [Route("create")]
    public ActionResult<OrderResponseDto> CreateOrder([FromBody] OrderCreateDto orderCreateDto)
    {

        try
        {
            return Ok(_orderService.Create(orderCreateDto));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}