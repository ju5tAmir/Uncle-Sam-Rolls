using Application.DTOs.order;
using DataAccess;

namespace Application.Interfaces;

public interface IOrderService
{
    List<Order> GetOrders();
    Order GetOrder(int id);
    OrderResponseDto Create(OrderCreateDto orderCreateDto);
    OrderResponseDto GetOrderById(int id);
    List<OrderResponseDto> GetOrdersByCustomerId(int customerId);
    OrderResponseDto Update(OrderUpdateDto updateDto);
}