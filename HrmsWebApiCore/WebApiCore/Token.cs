using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace WebApiCore
{
    public class Token
    {
        private readonly string _key;
        private readonly string _issuer;
        private readonly string _audience;
        private readonly DateTime? _expires;
        private readonly Claim[] _claims;

        public Token(string key, string issuer, string audience, DateTime? expires, Claim[] claims)
        {
            _key = key;
            _issuer = issuer;
            _audience = audience;
            _expires = expires;
            _claims = claims;
        }
        public string BuildToken()
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(_issuer, _audience, claims:_claims, expires: _expires, signingCredentials: credentials);
            
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}