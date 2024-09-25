using DataAccess;

namespace Application.Interfaces;

public interface IOrderService
{
    List<Order> GetOrders();
    Order GetOrder(int id);
    Order Create(Order order);
}