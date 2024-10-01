using Application.Interfaces;
using DataAccess;

namespace Application.Services;

/**
 * This class is depended on others,
 */
public class OrderService: IOrderService
{
    private readonly UncleSamContext _context;
    
    public OrderService(UncleSamContext context)
    {
        _context = context;
    }

    public List<Order> GetOrders()
    {
        return _context.Orders.ToList();
    }

    public Order GetOrder(int id)
    {
        return _context.Orders.Find(id) ?? throw new ArgumentException("Order not found");
    }


    public Order Create(Order order)
    {
        if (order == null)
        {
            throw new ArgumentNullException(nameof(order));
        }

        _context.Orders.Add(order);
        _context.SaveChanges();
        return order;
    }
}