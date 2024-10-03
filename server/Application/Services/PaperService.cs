using Application.DTOs.paper;
using Application.DTOs.property;
using Application.Interfaces;
using Application.Validators;
using Application.Validators.paper;
using DataAccess;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

/**
 * This paper is like products that we have to list and show for the customer
 * It should be accessible only for admins to CRUD
 */
/*
 * ToDo: Show user friendly exceptions for the user.
 */
public class PaperService: IPaperService
{
    private readonly UncleSamContext _context;
    
    public PaperService(UncleSamContext context)
    {
        _context = context;
    }


    public List<Paper> GetAll()
    {
        return _context.Papers.ToList();
    }

    public PaperResponseDto Create(PaperCreateDto createDto)
    {
        PaperCreateValidator.IsValid(createDto);
        
        Paper paper = createDto.ToPaper();

        try
        {
            _context.Papers.Add(paper);
            _context.SaveChanges();
        }
        catch (DbUpdateException e)
        {
            throw new DbUpdateException(e.Message);
        }
        
        return PaperResponseDto.FromEntity(paper);
    }

    /**
     * This method is getting paper id and a list of properties to add
     * it returns the paper object with the list of the properties it does.
     */
    public AddPropertiesToPaperResponseDto AddPropertiesToPaper(AddPropertiesToPaperDto addDto)
    {
        var paper = _context.Papers
            .Include(p => p.Properties) // Eagerly load related properties (avoid lazy loading)
            .FirstOrDefault(p => p.Id == addDto.PaperId); // Use FirstOrDefault instead of Find

        if (paper == null)
        {
            throw new KeyNotFoundException("Paper not found.");
        }

        foreach (var p in addDto.Properties)
        {
            var property = _context.Properties.Find(p);
            
            if (property == null)
            {
                throw new KeyNotFoundException("Property not found.");
            }
            
            // Skip adding the property to the paper if it already contains it
            if (paper.Properties.Any(prop => prop.Id == property.Id))
            {
                continue;
            }
            
            paper.Properties.Add(property);
        }

        try
        {
            _context.SaveChanges();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return AddPropertiesToPaperResponseDto.FromEntity(paper);
    }
}