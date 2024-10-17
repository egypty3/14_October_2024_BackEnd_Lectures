using Microsoft.EntityFrameworkCore;
using Lect1.Models;

namespace Lect1.Data
{
	public class TodoContext : DbContext
	{
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
		{
            
        }
	    public DbSet<Lect1.Models.TodoItem> TodoItems { get; set; } = default!;
    }
}
