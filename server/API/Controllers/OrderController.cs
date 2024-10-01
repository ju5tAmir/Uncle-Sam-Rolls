using Application.DTOs.order;
using Application.Interfaces;
using DataAccess;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

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
    public IActionResult GetOrders()
    {
        var orders = _orderService.GetOrders();
        var orderDtos = orders.Select(OrderResponseDto.FromEntity).ToList();
        return Ok(orderDtos);
    }
    
    [HttpGet("{id}")]
    public IActionResult GetOrder(int id)
    {
        try
        {
            var order = _orderService.GetOrder(id);
            var orderDto = OrderResponseDto.FromEntity(order);
            return Ok(orderDto);
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPost]
    public IActionResult CreateOrder([FromBody] OrderCreateDto orderCreateDto)
    {
        var order = orderCreateDto.ToEntity();
        var createdOrder = _orderService.Create(order);
        var createdOrderDto = OrderResponseDto.FromEntity(createdOrder);
        return CreatedAtAction(nameof(GetOrder), new { id = createdOrder.Id }, createdOrderDto);
    }
}