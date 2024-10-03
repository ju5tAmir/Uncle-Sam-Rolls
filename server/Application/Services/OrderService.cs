using Application.DTOs.order;
using Application.Interfaces;
using DataAccess;
using Domain.Enums;

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
        throw new NotImplementedException();
    }

    public OrderResponseDto Create(OrderCreateDto orderCreateDto)
    {
        // Created new order object
        Order order = new Order();
        double totalAmount = 0;
        // Fetch the customer
        Customer? customer = _context.Customers.Find(orderCreateDto.CustomerId);
        if (customer == null)
        {
            throw new KeyNotFoundException("Customer not found!");
        }
        
        foreach (var orderEntry in orderCreateDto.OrderEntries)
        {
            // Fetch Product object
            Paper? paper = _context.Papers.Find(orderEntry.PaperId);

            if (paper == null)
            {
                throw new KeyNotFoundException("Paper not found!");
            }

        
            // Calculate the price
            totalAmount += paper.Price * orderEntry.Quantity;
    
            order.OrderEntries.Add(new OrderEntry()
            {
                Quantity = orderEntry.Quantity,
                ProductId = paper.Id
            });
       
        }
        
        order.Status = OrderStatus.Paid.ToString();
        order.OrderDate = DateTime.UtcNow;
        order.DeliveryDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(10));
        order.Customer = customer;
        order.TotalAmount = totalAmount;
        order.CustomerId = customer.Id;

        try
        {
            _context.Orders.Add(order);
            _context.SaveChanges();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
        
        // Return the DTO
        return OrderResponseDto.FromEntity(order);
    }

    public OrderResponseDto GetOrderById(int id)
    {
        throw new NotImplementedException();
    }
}