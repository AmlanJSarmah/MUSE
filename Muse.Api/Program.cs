using Microsoft.EntityFrameworkCore;
using Muse.Api.Data;

namespace Muse.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddDbContext<MuseDbContext>(
                options => options.UseSqlServer(builder.Configuration.GetConnectionString("MuseConnection")));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
            }

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
