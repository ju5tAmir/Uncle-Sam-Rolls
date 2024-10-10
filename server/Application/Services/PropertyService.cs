using Application.DTOs.property;
using Application.Interfaces;
using Application.Validators.property;
using DataAccess;
using FluentValidation;

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

    public List<PropertyToClient> GetAll()
    {
        return _context.Properties.Select(p => PropertyToClient.FromEntity(p)).ToList();
    }

    public PropertyResponseDto Create(PropertyCreateDto propertyCreateDto)
    {
        PropertyCreateValidator.IsValid(propertyCreateDto);
        
        Property property = propertyCreateDto.ToProperty();

        try
        {
            _context.Properties.Add(property);
            _context.SaveChanges();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
        
        
        
        return PropertyResponseDto.FromEntity(property);
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

    public PropertyToClient UpdatePropertyById(PropertyToClient property)
    {
        try
        {
            _context.Properties.Update(property.ToProperty());
            _context.SaveChanges();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return property;

    }
}