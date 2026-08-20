using Microsoft.AspNetCore.Mvc;
using Muse.Api.Services;

namespace Muse.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AppController : ControllerBase
{
   private readonly ISpotifyService _spotifyService;

   public AppController(ISpotifyService spotifyService)
   {
      _spotifyService = spotifyService;
   }
   
   [HttpGet]
   public ActionResult<string> Get()
   {
      return Ok("Hello World");
   }

   [HttpGet("songs")]
   public async Task<IActionResult> GetSongsFromMovies([FromQuery] string title)
   {
      var result = await _spotifyService.GetSoundtrackAsync(title);

      if (result is null) return NotFound("No soundtrack for '{title}'.");
      
      return Ok(new { movie = title, album = result.Value.AlbumName, songs = result.Value.Songs });
   }
}