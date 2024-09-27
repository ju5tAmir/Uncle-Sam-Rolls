using Application.DTOs.property;
using Application.Interfaces;
using DataAccess;

namespace Application.Services;

/**
 * Only admin access
 */
public class PropertyService: IPropertyService
{
    private readonly UncleSamContext _context;

    public PropertyService(UncleSamContext context)
    {
        _context = context;
    }

    public List<Property> GetAll()
    {
        return _context.Properties.ToList();
    }

    public Property? Create(PropertyCreateDto propertyCreateDto)
    {
        Property? property = propertyCreateDto.FromEntity(propertyCreateDto);

        _context.Properties.Add(property);
        int success = _context.SaveChanges();

        if (success > 0)
        {
            return property;
        }

        throw new Exception("Failed to create");
    }

    public bool Delete(int id)
    {
        Property? property = _context.Properties.Find(id);
        if (property == null)
        {
            return false;
        }
        _context.Properties.Remove(property);
        return _context.SaveChanges() > 0;
    }
}