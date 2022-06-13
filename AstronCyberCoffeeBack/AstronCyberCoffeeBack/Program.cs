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

    // Option g�n�raliste pour le d�veloppement
    options.AddPolicy("allConnections", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});
builder.Services.AddAuthentication(options =>
{
    // Les options du sh�ma de l'authentification en elle m�me. Ici ne rien mettre n'aurait rien chang�, mais c'est pour montrer qu'il est configurable
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    // Les options du token a proprement parl� 
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true, // Utilisation d'une cl� crypt�e pour la s�curit� du token
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["JWT:SecretKey"])), // Assignation de la valeur de la cl�
        ValidateLifetime = true, // V�rification du temps d'expiration du token&&
        ValidateAudience = true, // V�rification de l'audience du token
        ValidAudience = builder.Configuration["JWT:ValidAudience"], // Audience valid�e pour ce token
        ValidateIssuer = true, // V�rification du donneur du token 
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"], // Donneur de token accept� pour ce token
        ClockSkew = TimeSpan.Zero // D�calage possible de l'expiration du token

    };
});
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin")); // Cette r�gle est cette fois-ci bas�e sur le r�le (qui est une claim de type Claim("Role", "Admin")
    options.AddPolicy("ManagerOnly", policy => policy.RequireRole("Manager")); // Cette r�gle est cette fois-ci bas�e sur le r�le (qui est une claim de type Claim("Role", "Admin")
    options.AddPolicy("EmployeeOnly", policy => policy.RequireRole("Employee")); // Cette r�gle est cette fois-ci bas�e sur le r�le (qui est une claim de type Claim("Role", "Admin")
    options.AddPolicy("UserOnly", policy => policy.RequireRole("User")); // Cette r�gle est cette fois-ci bas�e sur le r�le (qui est une claim de type Claim("Role", "Admin")
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
