using DataAccess;

namespace Application.DTOs.customer;

public class CustomerResponseDto
{
    public string Name { get; set; } = null!;
    public string? Address { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public ICollection<Order>? Orders;

    public CustomerResponseDto FromEntity(Customer customer)
    {
        return new CustomerResponseDto()
        {
            Name = customer.Name,
            Address = customer.Address,
            Email = customer.Email,
            Phone = customer.Phone,
            Orders = new List<Order>()
        };
    }
}