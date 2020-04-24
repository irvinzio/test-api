using api_test.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;

namespace api_test.BL
{
    public interface IDirectoryManager
    {
        List<DirectoryViewModel> GetDirectoryData();
    }
    public class DirectoryManager : IDirectoryManager
    {
        private const int RECORD_LIMIT = 400;
        public List<DirectoryViewModel> GetDirectoryData()
        {
            var data = fetchDirectoryData();
            JsonSerializer serializer = new JsonSerializer();
            var dataresponse = serializer.Deserialize<IEnumerable<DirectoryViewModel>>(new JsonTextReader(new StringReader(data)));
            return dataresponse.Concat(GetDuplicatedItems(dataresponse)).ToList();
        }
        private string fetchDirectoryData()
        {
            HttpClient http = new HttpClient();
            return http.GetAsync("https://www.experiencesiouxfalls.com/export/directory-items/").Result.Content.ReadAsStringAsync().Result;
        }
        private IEnumerable<DirectoryViewModel> GetDuplicatedItems(IEnumerable<DirectoryViewModel> data)
        {
            var duplicatedResponse = data.Take(RECORD_LIMIT - data.Count()).ToList();
            duplicatedResponse.ForEach(x => x.title = x.title + " " + Array.IndexOf(duplicatedResponse.ToArray(), x));
            return duplicatedResponse;
        }
    }
}
