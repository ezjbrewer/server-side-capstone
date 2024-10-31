using Microsoft.AspNetCore.Mvc;
using Sandwich.Models;
using Sandwich.Data;
using Sandwich.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Sandwich.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IngredientController : ControllerBase
    {
        private readonly SandwichDbContext _dbContext;
        public IngredientController(SandwichDbContext context)
        {
            _dbContext = context;
        }
        [HttpGet("{input}")]
        public IActionResult GetIngredients(int input)
        {
            if (input > 3 || input < 1)
            {
                return StatusCode(416, "Range not satisfiable. Input must be values 1, 2, or 3!");
            }

            List<Ingredient> ingredients = new List<Ingredient>();

            switch (input)
            {
                // bread
                case 1:
                ingredients =  _dbContext.Ingredients.Include(i => i.Type).Where(i => i.TypeId == 1).ToList();
                break;
                case 2:
                ingredients =  _dbContext.Ingredients.Include(i => i.Type).Where(i => i.TypeId == 2).ToList();
                break;
                case 3:
                ingredients =  _dbContext.Ingredients.Include(i => i.Type).Where(i => i.TypeId > 2).ToList();
                break;
            }
            
            
            return Ok(ingredients.Select(b => new IngredientDTO
            {
                Id = b.Id,
                Name = b.Name,
                Price = b.Price,
                Calories = b.Calories,
                TypeId = b.TypeId,
                Type = new TypeDTO
                {
                    Id = b.Type.Id,
                    Name = b.Type.Name
                }
            }).ToList());
        }

        [HttpGet]
        public IActionResult getIngredients()
        {
            var IngredientDTOs = _dbContext.Ingredients
                                .Include(i => i.Type)
                                .Select((i) => new IngredientDTO
            {
                Id = i.Id,
                Name = i.Name,
                Price = i.Price,
                Calories = i.Calories,
                TypeId = i.TypeId,
                Type = new TypeDTO
                {
                    Id = i.Type.Id,
                    Name = i.Type.Name
                },
                SandwichIngredients = null
            }).ToList();

            return Ok(IngredientDTOs);
        }

        [HttpDelete("{id}")]
        public IActionResult deleteIngredient(int id)
        {
            Ingredient ingredientToDelete = _dbContext.Ingredients.FirstOrDefault((i) => i.Id == id);

            if (ingredientToDelete == null)
            {
                return NotFound();
            }

            _dbContext.Ingredients.Remove(ingredientToDelete);
            _dbContext.SaveChanges();

            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult editIngredient(int id, [FromBody] Ingredient updatedIngredient)
        {
            Ingredient existingIngredient = _dbContext.Ingredients.FirstOrDefault((i) => i.Id == updatedIngredient.Id);

            if (existingIngredient == null)
            {
                return NotFound();
            }

            existingIngredient.Name = updatedIngredient.Name ?? existingIngredient.Name;
            existingIngredient.Price = updatedIngredient.Price;
            existingIngredient.Calories = updatedIngredient.Calories;
            existingIngredient.TypeId = updatedIngredient.TypeId;
            existingIngredient.Type = _dbContext.Types.FirstOrDefault((t) => t.Id == existingIngredient.TypeId);

            _dbContext.SaveChanges();

            return Ok(existingIngredient);
        }

        [HttpPost]
        public IActionResult postIngredient([FromBody] Ingredient ingredient)
        {
            _dbContext.Ingredients.Add(ingredient);
            _dbContext.SaveChanges();
            return Ok(ingredient);
        }

        [HttpGet("ingredient/{id}")]
        public IActionResult getIngredientById(int id)
        {
            Ingredient ingredient = _dbContext.Ingredients.FirstOrDefault((i) => i.Id == id);
            TypeObj type = _dbContext.Types.FirstOrDefault((t) => t.Id == ingredient.TypeId);

            ingredient.Type = new TypeObj
            {
                Id = type.Id,
                Name = type.Name
            };

            if (ingredient == null) {
                return NotFound();
            }

            return Ok(ingredient);
        }
    }
}