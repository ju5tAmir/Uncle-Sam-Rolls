using Application.DTOs.customer;

using DataAccess;

namespace Application.Interfaces;

public interface ICustomerService
{
    List<Customer> GetAll();
    Customer? GetById(int id);
    CustomerResponseDto? Create(CustomerCreateDto customerCreateDto);
    bool Delete(int id);
}