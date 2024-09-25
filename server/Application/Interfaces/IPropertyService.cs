using Application.DTOs.property;
using DataAccess;

namespace Application.Interfaces;

public interface IPropertyService
{
    List<Property> GetAll();
    Property? Create(PropertyCreateDto propertyCreateDto);
}