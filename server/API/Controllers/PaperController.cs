using Application.DTOs.paper;
using Application.DTOs.property;
using Application.Interfaces;
using DataAccess;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

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
    [Route("all")]
    public ActionResult<List<PaperToClient>> GetAll()
    {
        return Ok(_paperService.GetAll());
    }
    
    [HttpGet]
    [Route("{id}")]
    public ActionResult<PaperToClient> GetPaperById(int id)
    {
        try
        {
            return Ok(_paperService.GetPaperById(id));
        }
        catch (Exception e)
        {
            return NotFound(e.Data);
        }
}

    [HttpGet]
    [Route("{id}/properties")]
    public ActionResult<List<PropertyToClient>> GetPropertiesByPaperId(int id)
    {
        return Ok(_paperService.GetPropertiesByPaperId(id));
    }

    
    [HttpPost]
    [Route("create")]
    public ActionResult<PaperResponseDto> Create([FromBody] PaperCreateDto createDto)
    {
        try
        {
            return Ok(_paperService.Create(createDto));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    [Route("add/property")]
    public ActionResult<AddPropertiesToPaperResponseDto> AddProperties(
        [FromBody] AddPropertiesToPaperDto addDto)
    {
        try
        {
            return Ok(_paperService.AddPropertiesToPaper(addDto));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpPost]
    [Route("restock")]
    public ActionResult<AddPropertiesToPaperResponseDto> RestockPaper(
        int paperId, int restockCount)
    {
        try
        {
            return Ok(_paperService.RestockPaper(paperId, restockCount));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    [Route("discontinue")]
    public ActionResult<AddPropertiesToPaperResponseDto> DiscontinuePaper(
        int paperId, bool status)
    {
        try
        {
            return Ok(_paperService.DiscontinuePaper(paperId, status));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpPut]
    [Route("{id}/update")]
    public ActionResult<PaperResponseDto> UpdatePaper(int id, [FromBody] PaperToClient updateDto)
    {
        try
        {
            var updatedPaper = _paperService.UpdatePaper(id, updateDto);
            if (updatedPaper == null)
            {
                return NotFound($"Paper with id {id} not found.");
            }
            return Ok(updatedPaper);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}