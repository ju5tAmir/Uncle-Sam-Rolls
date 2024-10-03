using Application.DTOs.paper;
using FluentValidation;

namespace Application.Validators.paper;

public class PaperCreateValidator: AbstractValidator<PaperCreateDto>
{
    public PaperCreateValidator()
    {
        RuleFor(paper => paper.Name)
            .NotEmpty().WithMessage("The paper name cannot be empty.")
            .Length(1, 32).WithMessage("The paper name must be between 1 and 32 characters.");
    }
    
    
    public static void IsValid(PaperCreateDto createDto)
    {
        var result = new PaperCreateValidator().Validate(createDto);
        
        if (!result.IsValid)
        {
            throw new ValidationException(result.Errors);
        }
    }
}