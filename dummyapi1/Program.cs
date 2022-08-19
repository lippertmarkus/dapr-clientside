using Dapr;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDaprClient(); // TODO only needed if you want to send

var app = builder.Build();
app.UseCloudEvents();
app.MapSubscribeHandler();
app.MapPost("/ping", [Topic("kafka-pubsub", "ping")](dynamic inputOrder)
    =>
{
    Console.WriteLine($"WE GOT: {inputOrder}");
    return Results.Ok();
});
app.Run();