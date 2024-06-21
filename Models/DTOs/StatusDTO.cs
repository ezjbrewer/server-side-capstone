using System.ComponentModel.DataAnnotations;
using Sandwich.Models.DTOs;

namespace Sandwich.Models
{
    public class StatusDTO
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        public List<OrderDTO>? Orders { get; set; }
    }
}
