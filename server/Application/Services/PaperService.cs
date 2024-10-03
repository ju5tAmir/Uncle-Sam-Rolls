using Application.DTOs.paper;
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
}