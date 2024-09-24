using DataAccess;

namespace Application.DTOs.customer;
public class CustomerCreateDto
{
    public string Name { get; set; } = null!;
    public string? Address { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }

    public Customer FromEntity(CustomerCreateDto customerCreateDto)
    {
        return new Customer()
        {
            Name = customerCreateDto.Name,
            Address = customerCreateDto.Address,
            Email = customerCreateDto.Email,
            Phone = customerCreateDto.Phone,
            Orders = new List<Order>()
        };
    }
}