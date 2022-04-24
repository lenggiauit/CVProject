using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using CV.API.Domain.Entities;
using CV.API.Resources;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CV.API.Domain.Helpers
{
    public class AccessToken
    {
		public string GenerateToken(User user, string secretKey)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(secretKey);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new Claim[]
				{
					 new Claim(ClaimTypes.Name, user.Id.ToString()),
					 new Claim(ClaimTypes.UserData, JsonConvert.SerializeObject(user)),
				}),
				Expires = DateTime.UtcNow.AddYears(10),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}
	}
}
