using DataAccess;

namespace Application.DTOs.order
{
    public class OrderResponseDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public DateOnly? DeliveryDate { get; set; }
        public string Status { get; set; }
        public double TotalAmount { get; set; }
        public int? CustomerId { get; set; }
        public List<OrderEntryResponseDto> OrderEntries { get; set; } = new List<OrderEntryResponseDto>();

        public static OrderResponseDto FromEntity(Order order)
        {
            return new OrderResponseDto
            {
                Id = order.Id,
                OrderDate = order.OrderDate,
                DeliveryDate = order.DeliveryDate,
                Status = order.Status,
                TotalAmount = order.TotalAmount,
                CustomerId = order.CustomerId,
                OrderEntries = order.OrderEntries != null 
                    ? OrderEntryResponseDto.FromEntityList(order.OrderEntries) 
                    : new List<OrderEntryResponseDto>()
            };
        }
    }

    public class OrderEntryResponseDto
    {
        public int? ProductId { get; set; }
        public int Quantity { get; set; }

        public static List<OrderEntryResponseDto> FromEntityList(ICollection<OrderEntry> entries)
        {
            var responseDtos = new List<OrderEntryResponseDto>();
            foreach (var entry in entries)
            {
                responseDtos.Add(new OrderEntryResponseDto
                {
                    ProductId = entry.ProductId,
                    Quantity = entry.Quantity
                });
            }
            return responseDtos;
        }
    }
}