using Application.DTOs.property;
using Application.Interfaces;
using DataAccess;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("/api/property/")]
public class PropertyController: ControllerBase
{
    private readonly IPropertyService _propertyService;

    public PropertyController(IPropertyService propertyService)
    {
        _propertyService = propertyService;
    }

    [HttpGet]
    [Route("all")]
    public ActionResult<List<Property>> GetAll()
    {
        return _propertyService.GetAll();
    }

    [HttpPost]
    [Route("create")]
    public ActionResult<Property> Create([FromBody] PropertyCreateDto createDto)
    {
        try
        {
            return Ok(_propertyService.Create(createDto));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut]
    [Route("update")]
    public ActionResult<Property> Update([FromBody] PropertyToClient property)
    {
        try
        {
            return Ok(_propertyService.UpdatePropertyById(property));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete]
    [Route("{id}")]
    public ActionResult Delete([FromRoute] int id)
    {
        bool success = _propertyService.Delete(id);

        if (!success)
        {
            return NotFound();
        }
        return NoContent();
    }
}