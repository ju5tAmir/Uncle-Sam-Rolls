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
    public ActionResult<List<Paper>> GetAll()
    {
        return Ok(_paperService.GetAll());
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

}