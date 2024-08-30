var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseStaticFiles(); // Isso permite que o servidor sirva arquivos estáticos da pasta wwwroot

app.UseAuthorization();

app.MapControllers();

app.Run();
