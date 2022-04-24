using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using CV.API.Domain.Helpers;
using CV.API.Domain.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace CV.API.Services
{
    public class HttpClientFactoryService : IHttpClientFactoryService
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly AppSettings _apiDataSettings;
        private readonly ILogger<HttpClientFactoryService> _logger;
        public HttpClientFactoryService(IHttpClientFactory clientFactory, ILogger<HttpClientFactoryService> logger, IOptions<AppSettings> apiDataSettings)
        {
            _clientFactory = clientFactory;
            _apiDataSettings = apiDataSettings.Value;
            _logger = logger;
        }

        public async Task<JObject> GetAsync(string url)
        {
            var client = _clientFactory.CreateClient();
            client.Timeout = TimeSpan.FromMinutes(15);
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            using var response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);

            if (response.IsSuccessStatusCode)
            {
                try
                { 
                    using (Stream stream = await response.Content.ReadAsStreamAsync()) 
                    using (StreamReader streamReader = new StreamReader(stream))
                    using (JsonReader reader = new JsonTextReader(streamReader))
                    {
                        reader.SupportMultipleContent = true;
                        return new JsonSerializer().Deserialize<JObject>(reader);
                    }
                }
                catch (NotSupportedException)
                {
                    _logger.LogError("The content type is not supported.");
                }
                catch (JsonException ex)
                {
                    _logger.LogError("Invalid JSON.");
                }
                return null;
            }
            else
            {
                return null;
            }
        }
    }
}
