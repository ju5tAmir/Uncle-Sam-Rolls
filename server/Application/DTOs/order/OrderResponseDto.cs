using DataAccess;

namespace Application.DTOs.order;

public class OrderResponseDto
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public DateOnly? DeliveryDate { get; set; }
    public string Status { get; set; } = null!;
    public double TotalAmount { get; set; }
    public int? CustomerId { get; set; }
    public List<OrderEntryDto> OrderEntries { get; set; } = new List<OrderEntryDto>();

    public static OrderResponseDto FromEntity(Order order)
    {
        return new OrderResponseDto()
        {
            Id = order.Id,
            OrderDate = order.OrderDate,
            DeliveryDate = order.DeliveryDate,
            Status = order.Status,
            TotalAmount = order.TotalAmount,
            CustomerId = order.CustomerId,
            OrderEntries = order.OrderEntries.Select(o => new OrderEntryDto
            {
                Quantity = o.Quantity,
                PaperId = o.ProductId
            }).ToList()
        };
    }
    
    
    public static OrderResponseDto FromEntity(Order order, List<OrderEntry> orderEntries)
    {
        return new OrderResponseDto()
        {
            Id = order.Id,
            OrderDate = order.OrderDate,
            DeliveryDate = order.DeliveryDate,
            Status = order.Status,
            TotalAmount = order.TotalAmount,
            CustomerId = order.CustomerId,
            OrderEntries = orderEntries.Select(o => new OrderEntryDto
            {
                Quantity = o.Quantity,
                PaperId = o.ProductId
            }).ToList()
        };
    }
}