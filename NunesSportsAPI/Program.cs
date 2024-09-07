using NunesSportsAPI.Data;  
using Microsoft.EntityFrameworkCore;  

var builder = WebApplication.CreateBuilder(args);

// Função separada para configuração de CORS
void ConfigureCors(IServiceCollection services)
{
    services.AddCors(options =>
    {
        options.AddPolicy("AllowAllOrigins", builder =>
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader());
    });
}

// Chamada da função de CORS
ConfigureCors(builder.Services);

// Variável intermediária para a versão do MySQL
var mySqlVersion = new MySqlServerVersion(new Version(8, 0, 39));

// Adicionando o serviço do ApplicationDbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), mySqlVersion)); 

builder.Services.AddControllersWithViews(); 

var app = builder.Build();

// Configuração do pipeline de middleware
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Habilitando o CORS
app.UseCors("AllowAllOrigins");

app.UseAuthorization();

// Atualizando a rota padrão para refletir o ProdutosController
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Produtos}/{action=Index}/{id?}");

app.Run();