using Application.DTOs.paper;
using Application.Interfaces;
using DataAccess;
using Microsoft.AspNetCore.Mvc;
using YamlDotNet.Core.Tokens;


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

    [HttpDelete]
    [Route("{paperid}")]
    public ActionResult DiscontinuePaper([FromRoute] int id)
    {
        bool success = _paperService.Discontinue(id);

        if (success == false)
        {
            return BadRequest();
        }

        return NoContent();
    }
}