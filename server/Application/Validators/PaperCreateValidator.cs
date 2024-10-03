using Application.DTOs.paper;
using FluentValidation;

namespace Application.Validators;

public class PaperCreateValidator: AbstractValidator<PaperCreateDto>
{
    public PaperCreateValidator()
    {
        RuleFor(paper => paper.Name)
            .NotEmpty().WithMessage("The paper name cannot be empty.")
            .Length(1, 100).WithMessage("The paper name must be between 1 and 100 characters.");
    }
}