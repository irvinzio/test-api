using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using api_test.BL;
using api_test.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api_test.Controllers
{
    [ApiController]
    [Route("api/directory")]
    public class DirectoryController : ControllerBase
    {

        private readonly ILogger<DirectoryController> _logger;
        private IDirectoryManager _directoryManager;

        public DirectoryController(ILogger<DirectoryController> logger, IDirectoryManager directoryManager)
        {
            _logger = logger;
            _directoryManager = directoryManager;
        }

        [HttpGet]
        public List<DirectoryViewModel> Get()
        {
            return _directoryManager.GetDirectoryData();
        }

    }
}
