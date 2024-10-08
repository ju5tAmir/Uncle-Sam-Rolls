using Application.DTOs.property;
using FluentValidation;

namespace Application.Validators.property;

public class PropertyCreateValidator: AbstractValidator<PropertyCreateDto>
{
    public PropertyCreateValidator()
    {
        RuleFor(property => property.PropertyName)
            .NotEmpty().WithMessage("The property name cannot be empty.")
            .Length(1, 32).WithMessage("The property name must be between 1 and 32 characters.");
    }

    public static void IsValid(PropertyCreateDto createDto)
    {
        var result = new PropertyCreateValidator().Validate(createDto);
        
        if (!result.IsValid)
        {
            throw new ValidationException(result.Errors);
        }
    }
}