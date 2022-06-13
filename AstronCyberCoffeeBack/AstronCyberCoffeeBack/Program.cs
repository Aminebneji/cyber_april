using AstronCyberCoffeeBack.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Azure"));
});

builder.Services.AddCors(options => {

    // Option généraliste pour le développement
    options.AddPolicy("allConnections", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});
builder.Services.AddAuthentication(options =>
{
    // Les options du shéma de l'authentification en elle même. Ici ne rien mettre n'aurait rien changé, mais c'est pour montrer qu'il est configurable
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    // Les options du token a proprement parlé 
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true, // Utilisation d'une clé cryptée pour la sécurité du token
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["JWT:SecretKey"])), // Assignation de la valeur de la clé
        ValidateLifetime = true, // Vérification du temps d'expiration du token&&
        ValidateAudience = true, // Vérification de l'audience du token
        ValidAudience = builder.Configuration["JWT:ValidAudience"], // Audience validée pour ce token
        ValidateIssuer = true, // Vérification du donneur du token 
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"], // Donneur de token accepté pour ce token
        ClockSkew = TimeSpan.Zero // Décalage possible de l'expiration du token

    };
});
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin")); // Cette règle est cette fois-ci basée sur le rôle (qui est une claim de type Claim("Role", "Admin")
    options.AddPolicy("ManagerOnly", policy => policy.RequireRole("Manager")); // Cette règle est cette fois-ci basée sur le rôle (qui est une claim de type Claim("Role", "Admin")
    options.AddPolicy("EmployeeOnly", policy => policy.RequireRole("Employee")); // Cette règle est cette fois-ci basée sur le rôle (qui est une claim de type Claim("Role", "Admin")
    options.AddPolicy("UserOnly", policy => policy.RequireRole("User")); // Cette règle est cette fois-ci basée sur le rôle (qui est une claim de type Claim("Role", "Admin")
});














var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
