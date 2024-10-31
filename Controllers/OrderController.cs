using Microsoft.AspNetCore.Mvc;
using Sandwich.Models;
using Sandwich.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Sandwich.Models.DTOs;

namespace Sandwich.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly SandwichDbContext _dbContext;
        public OrderController(SandwichDbContext context)
        {
            _dbContext = context;
        }

        [HttpGet("allOrders")]
        public IActionResult GetAllOrders()
        {
            var orders = _dbContext.Orders
                        .Include(o => o.Sandwiches)
                            .ThenInclude(s => s.SandwichIngredients)
                                .ThenInclude(si => si.Ingredient)
                        .Select(o => new OrderDTO
                        {
                            Id = o.Id,
                            TotalPrice = o.TotalPrice,
                            CustomerId = o.CustomerId,
                            Customer = null,
                            StatusId = o.StatusId,
                            Status = null,
                            IsActive = o.IsActive,
                            OrderReceived = o.OrderReceived,
                            Sandwiches = o.Sandwiches.Select(s => new SandwichDTO
                            {
                                Id = s.Id,
                                SandwichIngredients = s.SandwichIngredients.Select(si => new SandwichIngredientDTO
                                {
                                    Id = si.Id,
                                    SandwichId = si.SandwichId,
                                    Sandwich = null,
                                    IngredientId = si.IngredientId,
                                    Ingredient = new IngredientDTO
                                    {
                                        Id = si.Ingredient.Id,
                                        Name = si.Ingredient.Name,
                                        Price = si.Ingredient.Price,
                                        Calories = si.Ingredient.Calories,
                                        TypeId = si.Ingredient.TypeId,
                                        SandwichIngredients = null
                                    }
                                }).ToList(),
                                CustomerId = s.CustomerId
                            }).ToList()
                        }).ToList();
            foreach (var order in orders)
            {
                order.CalculateTotalPrice();
            }

            return Ok(orders);
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id)
        {
           Order order = _dbContext.Orders
            .Include(o => o.Status)
            .Include(o => o.Sandwiches)
                .ThenInclude(s => s.SandwichIngredients)
                    .ThenInclude(si => si.Ingredient)
            .FirstOrDefault(o => o.Id == id);

            if (order == null)
            {
                return NotFound("Order was not found.");
            }

            OrderDTO orderDTO = new OrderDTO
            {
                Id = order.Id,
                TotalPrice = order.TotalPrice,
                CustomerId = order.CustomerId,
                StatusId = order.StatusId,
                Status = new StatusDTO
                {
                    Id = order.Status.Id,
                    Name = order.Status.Name
                },
                OrderReceived = order.OrderReceived,
                IsActive = order.IsActive,
                Sandwiches = order.Sandwiches.Select(s => new SandwichDTO
                {
                    Id = s.Id,
                    SandwichIngredients = s.SandwichIngredients.Select(si => new SandwichIngredientDTO
                    {
                        Id = si.Id,
                        SandwichId = si.SandwichId,
                        Ingredient = new IngredientDTO
                        {
                            Id = si.Ingredient.Id,
                            Name = si.Ingredient.Name,
                            Price = si.Ingredient.Price,
                            Calories = si.Ingredient.Calories,
                            TypeId = si.Ingredient.TypeId
                        }
                    }).ToList(),
                    CustomerId = s.CustomerId
                }).ToList()                
            };

            orderDTO.CalculateTotalPrice();            

            return Ok(orderDTO);
        }

        [HttpGet("users/{userId}")]
        public IActionResult GetOrdersByUserId(int userId)
        {
            UserProfile doesUserExists = _dbContext.UserProfiles.FirstOrDefault(u => u.Id == userId);

            if (doesUserExists == null) {
                return NotFound();
            }

            var orders = _dbContext.Orders
                        .Where(o => o.CustomerId == userId)
                        .Include(o => o.Sandwiches)
                            .ThenInclude(s => s.SandwichIngredients)
                                .ThenInclude(si => si.Ingredient)
                        .Select(o => new OrderDTO
                        {
                            Id = o.Id,
                            TotalPrice = o.TotalPrice,
                            CustomerId = o.CustomerId,
                            Customer = null,
                            StatusId = o.StatusId,
                            Status = new StatusDTO
                            {
                                Id = o.Status.Id,
                                Name = o.Status.Name
                            },
                            IsActive = o.IsActive,
                            OrderReceived = o.OrderReceived,
                            Sandwiches = o.Sandwiches.Select(s => new SandwichDTO
                            {
                                Id = s.Id,
                                SandwichIngredients = s.SandwichIngredients.Select(si => new SandwichIngredientDTO
                                {
                                    Id = si.Id,
                                    SandwichId = si.SandwichId,
                                    Sandwich = null,
                                    IngredientId = si.IngredientId,
                                    Ingredient = new IngredientDTO
                                    {
                                        Id = si.Ingredient.Id,
                                        Name = si.Ingredient.Name,
                                        Price = si.Ingredient.Price,
                                        Calories = si.Ingredient.Calories,
                                        TypeId = si.Ingredient.TypeId,
                                        SandwichIngredients = null
                                    }
                                }).ToList(),
                                CustomerId = s.CustomerId
                            }).ToList()
                        }).ToList();
            foreach (var order in orders)
            {
                order.CalculateTotalPrice();
            }

            return Ok(orders);  
        }

        [HttpGet("activeOrders")]
        public IActionResult GetAllActiveOrders()
        {
            var activeOrders = _dbContext.Orders
                                .Where(o => o.StatusId != 1 || o.StatusId != 5)
                                .Include(o => o.Sandwiches)
                                    .ThenInclude(s => s.SandwichIngredients)
                                        .ThenInclude(si => si.Ingredient);

            var activeOrdersDTO = activeOrders.Select(aO => new OrderDTO
            {
                Id = aO.Id,
                            TotalPrice = aO.TotalPrice,
                            CustomerId = aO.CustomerId,
                            Customer = null,
                            StatusId = aO.StatusId,
                            Status = new StatusDTO
                            {
                                Id = aO.Status.Id,
                                Name = aO.Status.Name
                            },
                            IsActive = aO.IsActive,
                            OrderReceived = aO.OrderReceived,
                            Sandwiches = aO.Sandwiches.Select(s => new SandwichDTO
                            {
                                Id = s.Id,
                                SandwichIngredients = s.SandwichIngredients.Select(si => new SandwichIngredientDTO
                                {
                                    Id = si.Id,
                                    SandwichId = si.SandwichId,
                                    Sandwich = null,
                                    IngredientId = si.IngredientId,
                                    Ingredient = new IngredientDTO
                                    {
                                        Id = si.Ingredient.Id,
                                        Name = si.Ingredient.Name,
                                        Price = si.Ingredient.Price,
                                        Calories = si.Ingredient.Calories,
                                        TypeId = si.Ingredient.TypeId,
                                        SandwichIngredients = null
                                    }
                                }).ToList(),
                                CustomerId = s.CustomerId
                            }).ToList()
            }).ToList();

            return Ok(activeOrdersDTO);
        }

        [HttpPost]
        public IActionResult InitiateNewOrder(Order newOrder)
        {   
            newOrder.Status = _dbContext.Statuses.FirstOrDefault(s => s.Id == newOrder.StatusId);
            newOrder.OrderReceived = DateTime.Now;
            newOrder.IsActive = true;
            _dbContext.Orders.Add(newOrder);
            _dbContext.SaveChanges();

            return Ok(newOrder);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateOrder(int id, [FromBody] int OrderId)
        {
            Status status = _dbContext.Statuses.FirstOrDefault((s) => s.Id == id);
            Order existingOrder = _dbContext.Orders.FirstOrDefault((o) => o.Id == OrderId);

            if (status == null)
            {
                return NotFound();
            }

            existingOrder.StatusId = status.Id;
            existingOrder.Status = new Status
            {
                Id = status.Id,
                Name = status.Name
            };

            _dbContext.SaveChanges();

            return NoContent();
        }
    }   
}