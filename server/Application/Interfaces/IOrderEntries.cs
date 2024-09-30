using DataAccess;

namespace Application.Interfaces;

public interface IOrderEntries
{
    OrderEntry Create(OrderEntry orderEntry);
}