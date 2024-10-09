using Application.DTOs.customer;
using Application.DTOs.order;
using Application.Interfaces;
using DataAccess;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

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
        try
        {
            Order? order = _context.Orders
                .Include(o => o.OrderEntries)
                .SingleOrDefault(o => o.Id == id); 

            // Check if the order is null
            if (order == null)
            {
                throw new KeyNotFoundException($"Order with ID {id} not found.");
            }

            return OrderResponseDto.FromEntity(order);
        }
        catch (Exception e)
        {
            // Optionally, log the exception here
            throw new Exception("An error occurred while retrieving the order.", e);
        }
    }

    public List<OrderResponseDto> GetOrdersByCustomerId(int customerId)
    {
        List<OrderResponseDto> orders = new();

        foreach (var order in _context.Orders.Where(o => o.CustomerId == customerId).ToList())
        {
            List<OrderEntry> orderEntries = _context.OrderEntries.Where(oe => oe.OrderId == order.Id).ToList();
            orders.Add(OrderResponseDto.FromEntity(order, orderEntries));
        }

        return orders;
    }

    public List<CustomerOrdersDto> GetHistoryForUsers()
    {
        try
        {
            List<Customer> customers = _context.Customers.Include(o => o.Orders).ThenInclude(oe => oe.OrderEntries).ToList();
            
            return customers.Select(c => CustomerOrdersDto.FromEntity(c)).ToList();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    public OrderResponseDto Update(OrderUpdateDto updateDto)
    {
        // Fetch the existing order
        var order = _context.Orders
            .Include(o => o.OrderEntries)
            .FirstOrDefault(o => o.Id == updateDto.Id);

        if (order == null)
        {
            throw new Exception("Order not found."); 
        }

        // Update the order status
        order.Status = updateDto.Status;

        // Save changes
        _context.SaveChanges();

        return OrderResponseDto.FromEntity(order);
    }

  
}