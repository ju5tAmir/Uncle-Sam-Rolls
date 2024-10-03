using Application.DTOs.order;
using DataAccess;

namespace Application.DTOs.customer;

public class CustomerOrdersDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Address { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public List<OrderResponseDto> Orders { get; set; } = new();
    
    
    public static CustomerOrdersDto FromEntity(Customer customer)
    {
        return new CustomerOrdersDto()
        {
            Id = customer.Id,
            Name = customer.Name,
            Address = customer.Address,
            Email = customer.Email,
            Phone = customer.Phone,
            Orders = customer.Orders.Select(o => OrderResponseDto.FromEntity(o)).ToList()
        };
    }

}