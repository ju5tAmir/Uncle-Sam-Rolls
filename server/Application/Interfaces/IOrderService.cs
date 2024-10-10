using Application.DTOs.customer;
using Application.DTOs.order;
using DataAccess;

namespace Application.Interfaces;

public interface IOrderService
{
    List<Order> GetOrders();
    List<OrderResponseDto> GetAllOrders();
    Order GetOrder(int id);
    OrderResponseDto Create(OrderCreateDto orderCreateDto);
    OrderResponseDto GetOrderById(int id);
    List<OrderResponseDto> GetOrdersByCustomerId(int customerId);
    List<CustomerOrdersDto> GetHistoryForUsers();
    OrderResponseDto Update(OrderUpdateDto updateDto);
    List<OrderEntryDetailedDto> GetOrderEntryDetails(int orderId);

}