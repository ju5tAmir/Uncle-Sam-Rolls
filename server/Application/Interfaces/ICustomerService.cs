using DataAccess;

namespace Application.Interfaces;

public interface ICustomerService
{
    List<Customer> GetAll();
    Customer? GetById(int id);
}