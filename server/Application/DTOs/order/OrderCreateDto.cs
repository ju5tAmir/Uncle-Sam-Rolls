using DataAccess;

namespace Application.DTOs.order
{
    public class OrderCreateDto
    {
        public DateTime OrderDate { get; set; }
        public DateOnly? DeliveryDate { get; set; }
        public string Status { get; set; }
        public double TotalAmount { get; set; }
        public int CustomerId { get; set; }
        public List<OrderEntryCreateDto> OrderEntries { get; set; } = new List<OrderEntryCreateDto>();

        public Order ToEntity()
        {
            return new Order
            {
                OrderDate = this.OrderDate,
                DeliveryDate = this.DeliveryDate,
                Status = this.Status,
                TotalAmount = this.TotalAmount,
                CustomerId = this.CustomerId,
                OrderEntries = OrderEntries.ConvertAll(entry => entry.ToEntity())
            };
        }
    }

    public class OrderEntryCreateDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }

        public OrderEntry ToEntity()
        {
            return new OrderEntry
            {
                ProductId = this.ProductId,
                Quantity = this.Quantity
            };
        }
    }
}