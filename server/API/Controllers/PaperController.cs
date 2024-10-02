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
        [Route("{id}")]
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
        [Route("{id}/discontinue")]
        public ActionResult DiscontinuePaper([FromRoute] int id) 
        {
            bool success = _paperService.Discontinue(id); 

            if (!success)
            {
                return BadRequest(); 
            }

            return NoContent(); 
        }
        
        [HttpPost]
        [Route("{id}/restock")]
        public ActionResult RestockPaper([FromRoute] int id, [FromBody] int additionalStock)
        {
            bool success = _paperService.RestockPaper(id, additionalStock);

            if (!success)
            {
                return BadRequest();
            }

            return Ok();
        }
        
        [HttpPost]
        [Route("{paperid}/addproperty/{propertyid}")]
        public ActionResult AddPropertyToPaper([FromRoute] int paperid, [FromRoute] int propertyid)
        {
            bool success = _paperService.AddPropertyToPaper(paperid, propertyid);

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