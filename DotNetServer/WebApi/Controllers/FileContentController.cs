using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("[controller]")]

public class FileContentController : ControllerBase
{
    private readonly ILogger<FileContentController> _logger;

    public FileContentController(ILogger<FileContentController> logger)
    {
        _logger = logger;
    }

    [HttpGet("HomeFolder")]
    public ActionResult<string> GetHomeFolder()
    {
        try
        {
            string root = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
            // string[] subfolders = root.Split(Path.DirectorySeparatorChar, StringSplitOptions.RemoveEmptyEntries);
            return Ok(root);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet("Folders")]
    public ActionResult<List<string>> GetFolders(string currentDir)
    {
        try
        {
            string decoded = System.Web.HttpUtility.UrlDecode(currentDir);
            string[] folders = Directory.GetDirectories(decoded);
            return Ok(folders);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet("Files")]
    public ActionResult<List<string>> GetFiles(string currentDir)
    {
        try
        {
            string decoded = System.Web.HttpUtility.UrlDecode(currentDir);
            string[] files = Directory.GetFiles(decoded);
            return Ok(files);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet("AllText")]
    public ActionResult<string> GetAllText(string filePath)
    {
        try
        {
            string decoded = System.Web.HttpUtility.UrlDecode(filePath);
            string allText = System.IO.File.ReadAllText(decoded);
            return Ok(allText);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }
}
