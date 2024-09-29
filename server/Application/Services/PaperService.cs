using Application.DTOs.paper;
using Application.Interfaces;
using DataAccess;

namespace Application.Services
{
    public class PaperService : IPaperService
    {
        private readonly UncleSamContext _context;

        public PaperService(UncleSamContext context)
        {
            _context = context;
        }

        public List<Paper> GetPapers()
        {
            return _context.Papers.ToList();
        }

        public Paper? GetPaperById(int id)
        {
            return _context.Papers.Find(id);
        }
        
        public PaperResponseDto? CreatePaper(PaperCreateDto paperCreateDto)
        {
            Paper paper = paperCreateDto.FromEntity(paperCreateDto);

            _context.Papers.Add(paper);
            int affectedRows = _context.SaveChanges();
            if (affectedRows > 0)
            {
                PaperResponseDto responseDto = new PaperResponseDto().FromEntity(paper);
                return responseDto;
            }
            return null;
        }
        
        public bool Discontinue(int paperId)
        {
            var paper = _context.Papers.FirstOrDefault(p => p.Id == paperId);

            if (paper == null)
            {
                return false; 
            }
            
            paper.Discontinued = true;
            _context.Papers.Update(paper);
            _context.SaveChanges();

            return true;
        }
        
        public bool RestockPaper(int id, int additionalStock)
        {
            var paper = _context.Papers.Find(id);

            if (paper == null)
            {
                return false;
            }

            paper.Stock += additionalStock; 

            int affectedRows = _context.SaveChanges();

            return affectedRows > 0;
        }
        
        public bool AddPropertyToPaper(int paperId, int propertyId)
        {
            var paper = _context.Papers.Find(paperId);
            var property = _context.Properties.Find(propertyId);

            if (paper == null || property == null)
            {
                return false;
            }
            
            var paperProperty = new PaperProperty
            {
                PaperId = paperId,
                PropertyId = propertyId
            };

            _context.PaperProperties.Add(paperProperty);

            int affectedRows = _context.SaveChanges();

            return affectedRows > 0;
        }
        
        public Property? CreateProperty(string propertyName)
        {
            var property = new Property
            {
                PropertyName = propertyName
            };

            _context.Properties.Add(property);
            int affectedRows = _context.SaveChanges();

            return affectedRows > 0 ? property : null;
        }
    }
}