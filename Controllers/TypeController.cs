using Microsoft.AspNetCore.Mvc;
using Sandwich.Models;
using Sandwich.Data;
using Sandwich.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Sandwich.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TypeController : ControllerBase
    {
        private readonly SandwichDbContext _dbContext;
        public TypeController(SandwichDbContext context)
        {
            _dbContext = context;
        }
        [HttpGet()]
        public IActionResult GetTypes()
        {
            var typesDTO = _dbContext.Types.Select((t) => new TypeDTO
            {
                Id = t.Id,
                Name = t.Name
            }).ToList();

            return Ok(typesDTO);
        }
    }
}