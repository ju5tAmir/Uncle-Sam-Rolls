using Application.DTOs.paper;
using Application.Interfaces;
using DataAccess;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/paper/")]
    public class PaperController : ControllerBase
    {
        private readonly IPaperService _paperService;

        public PaperController(IPaperService paperService)
        {
            _paperService = paperService;
        }

        [HttpGet]
        [Route("papers")]
        public ActionResult<List<Paper>> GetAllPapers()
        {
            return Ok(_paperService.GetPapers());
        }

        [HttpGet]
        [Route("{paperid}")]
        public ActionResult<Paper> GetPaper([FromRoute] int id)
        {
            Paper? paper = _paperService.GetPaperById(id);

            if (paper == null)
            {
                return NotFound();
            }

            return Ok(paper);
        }

        [HttpPost]
        [Route("createpaper")]
        public ActionResult<PaperResponseDto>? CreatePaper([FromBody] PaperCreateDto createDto)
        {
            PaperResponseDto? responseDto = _paperService.CreatePaper(createDto);

            if (responseDto == null)
            {
                return BadRequest();
            }

            return Ok(responseDto);
        }

        [HttpPost]
        [Route("{paperid}")]
        public ActionResult DiscontinuePaper([FromRoute] int paperid) 
        {
            bool success = _paperService.Discontinue(paperid); 

            if (!success)
            {
                return BadRequest(); 
            }

            return NoContent(); 
        }
        
        [HttpPost]
        [Route("{paperid}/restock")]
        public ActionResult RestockPaper([FromRoute] int paperId, [FromBody] int additionalStock)
        {
            bool success = _paperService.RestockPaper(paperId, additionalStock);

            if (!success)
            {
                return BadRequest();
            }

            return Ok();
        }
        
        [HttpPost]
        [Route("{paperid}/addproperty/{propertyId}")]
        public ActionResult AddPropertyToPaper([FromRoute] int paperId, [FromRoute] int propertyId)
        {
            bool success = _paperService.AddPropertyToPaper(paperId, propertyId);

            if (!success)
            {
                return BadRequest();
            }

            return Ok();
        }
        
        [HttpPost]
        [Route("createproperty")]
        public ActionResult<Property>? CreateProperty([FromBody] string propertyName)
        {
            Property? property = _paperService.CreateProperty(propertyName);

            if (property == null)
            {
                return BadRequest();
            }

            return Ok(property);
        }
    }
}