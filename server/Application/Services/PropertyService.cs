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

    public List<Property> GetAll()
    {
        return _context.Properties.ToList();
    }

    public PropertyResponseDto Create(PropertyCreateDto propertyCreateDto)
    {
        CreatePropertyValidator(propertyCreateDto);
        
        Property property = propertyCreateDto.ToProperty();

        try
        {
            _context.Properties.Add(property);
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

    private void CreatePropertyValidator(PropertyCreateDto createDto)
    {
        var result = new PropertyCreateValidator().Validate(createDto);
        
        if (!result.IsValid)
        {
            throw new ValidationException(result.Errors);
        }
    }
}