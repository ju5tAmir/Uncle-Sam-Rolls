using Application.DTOs.property;
using DataAccess;

namespace Application.Interfaces;

public interface IPropertyService
{
    List<Property> GetAll();
    PropertyResponseDto Create(PropertyCreateDto propertyCreateDto);
    bool Delete(int id);
}