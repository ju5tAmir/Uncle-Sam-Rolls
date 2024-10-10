using Application.DTOs.property;
using DataAccess;

namespace Application.Interfaces;

public interface IPropertyService
{
    List<PropertyToClient> GetAll();
    PropertyResponseDto Create(PropertyCreateDto propertyCreateDto);
    bool Delete(int id);
    PropertyToClient UpdatePropertyById(PropertyToClient property);
}