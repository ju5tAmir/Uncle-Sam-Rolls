using System.Security.Cryptography;
using Application.DTOs.paper;
using Application.Interfaces;
using DataAccess;

namespace Application.Services;

/**
 * This paper is like products that we have to list and show for the customer
 * It should be accessible only for admins to CRUD
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

    // ToDo: Possibility to create paper with properties
    public PaperResponseDto Create(PaperCreateDto createDto)
    {
        // Receive user input as DTO and convert it into paper
        Paper paper = createDto.GetPaper();
        // Retrieve list of properties linked to the paper
        List<Property>? properties = createDto.GetProperties();
        
        // Check if a paper with the same name already exists
        var existingPaper = _context.Papers.FirstOrDefault(p => p.Name == paper.Name);
        if (existingPaper != null)
        {
            Console.WriteLine(existingPaper.Id);
            throw new Exception("A paper with the same name already exists.");
        }

        // Check for properties
        foreach (var modelProperty in properties)
        {
            // Check if a property with the same name exists 
            var existingProperty = _context.Properties
                .FirstOrDefault(p => p.PropertyName == modelProperty.PropertyName);

            if (existingProperty != null)
            {
                // Set the id to the existing property id
                modelProperty.Id = existingProperty.Id;
                continue; // Move to the next property
            }
    
            // Retrieve the property object from the db via id
            var dbProperty = _context.Properties.Find(modelProperty.Id);
    
            // If the property doesn't exist, add it to the context
            
            if (dbProperty == null)
            {
                modelProperty.Id = 0; // Set Id to default for new entry
                _context.Properties.Add(modelProperty);
                _context.SaveChanges();
            }
        }

        // Question: How to link paper and properties in paper_properties table?
        
        // Adding paper object into the db
        _context.Papers.Add(paper);
        _context.SaveChanges();
        
        return new PaperResponseDto()
            .IncludePaper(paper)
            .IncludeProperties(properties);
    }
}