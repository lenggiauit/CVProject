using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using CV.API.Domain.Entities;
using CV.API.Domain.Helpers;
using CV.API.Domain.Services;
using CV.API.Domain.Services.Communication.Request;
using CV.API.Domain.Services.Communication.Response;
using CV.API.Infrastructure;
using CV.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace CV.API.Controllers
{
    [Authorize]
    [Route("Account")]
    public class AccountController : PMBaseController
    {
        private readonly IAccountService _accountServices;
        private readonly IHttpClientFactoryService _httpClientFactoryService;
        private readonly ILogger<AccountController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        public AccountController(
            ILogger<AccountController> logger,
            IMapper mapper,
            IAccountService accountService,
            IHttpClientFactoryService httpClientFactoryService,
            IOptions<AppSettings> appSettings)
        {
            _accountServices = accountService;
            _httpClientFactoryService = httpClientFactoryService;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value; 
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<AuthenticateResponse> Login([FromBody] BaseRequest<AuthenticateRequest> request)
        {
            if (ModelState.IsValid)
            {
                var user = await _accountServices.Login( request.Payload.Name, request.Payload.Password );
                if (user != null)
                {
                    var resources = _mapper.Map<User, UserResource>(user);
                    AccessToken accessToken = new AccessToken(); 
                    resources.AccessToken = accessToken.GenerateToken(user, _appSettings.Secret); 
                    return new AuthenticateResponse(resources);
                }
                else
                {
                    return new AuthenticateResponse(Constants.InvalidMsg, ResultCode.NotExistUser);
                }
            }
            else
            {
                return new AuthenticateResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [AllowAnonymous]
        [HttpGet("LoginWithGoogle")]
        public async Task<AuthenticateResponse> LoginWithGoogle(string access_token)
        {
            try
            {
                var googleApiResponse = _httpClientFactoryService.GetAsync(string.Format(_appSettings.GoogleapisUrl, access_token)).Result;
                if (googleApiResponse != null)
                {
                    var user = await _accountServices.LoginWithGoogle(googleApiResponse["email"].ToString());
                    if (user != null)
                    {
                        var resources = _mapper.Map<User, UserResource>(user);
                        AccessToken accessToken = new AccessToken(); 
                        resources.AccessToken = accessToken.GenerateToken(user, _appSettings.Secret); 
                        return new AuthenticateResponse(resources);
                    }
                    else
                    {
                        return new AuthenticateResponse(Constants.UnknowMsg, ResultCode.NotExistEmail);
                    }
                }
                else
                {
                    return new AuthenticateResponse(Constants.InvalidMsg, ResultCode.Unknown);
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new AuthenticateResponse(Constants.InvalidMsg, ResultCode.Error);
            }
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<RegisterResponse> Register([FromBody] BaseRequest<RegisterRequest> request)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountServices.Register(request.Payload.UserName, request.Payload.Email, request.Payload.Password);
                return new RegisterResponse(string.Empty, result);
            }
            else
            {
                return new RegisterResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [AllowAnonymous]
        [HttpGet("RegisterWithGoogle")]
        public async Task<RegisterResponse> RegisterWithGoogle(string access_token)
        {  
            try
            {
               var googleApiResponse = _httpClientFactoryService.GetAsync(string.Format(_appSettings.GoogleapisUrl, access_token)).Result;
               if(googleApiResponse != null)
                {
                    var result = await _accountServices.Register(googleApiResponse["email"].ToString(), googleApiResponse["email"].ToString(), string.Empty);
                    return new RegisterResponse(string.Empty, result); 
                }
                else
                {
                    return new RegisterResponse(Constants.InvalidMsg, ResultCode.Unknown);
                } 
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new RegisterResponse(Constants.InvalidMsg, ResultCode.Error);
            }
        }

        [AllowAnonymous]
        [HttpGet("CheckEmail")]
        public async Task<RegisterResponse> CheckEmail(string email)
        { 
            var result = await _accountServices.CheckEmail(email);
            return new RegisterResponse(string.Empty, result); 
        }

        [AllowAnonymous]
        [HttpGet("CheckEmailWithUser")]
        public async Task<CommonResponse> CheckEmailWithUser(string email, Guid Id)
        {
            var result = await _accountServices.CheckEmailWithUser(email, Id);
            return new CommonResponse(string.Empty, result);
        }

        [AllowAnonymous]
        [HttpGet("CheckUserName")]
        public async Task<RegisterResponse> CheckUserName(string name)
        {
            var result = await _accountServices.CheckUserName(name);
            return new RegisterResponse(string.Empty, result);
        }

        [AllowAnonymous]
        [HttpPost("ForgotPassword")]
        public async Task<CommonResponse> ForgotPassword([FromBody] BaseRequest<ForgotPasswordRequest> request)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountServices.ForgotPassword(request.Payload.Email);
                return new CommonResponse(string.Empty, result);
            }
            else
            {
                return new CommonResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("ResetPassword")]
        public async Task<CommonResponse> ResetPassword([FromBody] BaseRequest<ResetPasswordRequest> request)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountServices.ResetPassword(request.Payload.UserInfo, request.Payload.NewPassword);
                return new CommonResponse(string.Empty, result);
            }
            else
            {
                return new CommonResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("UpdateProfile")]
        public async Task<CommonResponse> UpdateProfile([FromBody] BaseRequest<UpdateProfileRequest> request)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountServices.UpdateProfile(GetCurrentUserId(), request);
                return new CommonResponse(string.Empty, result); 
            }
            else
            {
                return new CommonResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }
        
        [HttpPost("UpdateUserAvatar")]
        public async Task<CommonResponse> UpdateUserAvatar([FromBody] BaseRequest<UpdateUserAvatarRequest> request)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountServices.UpdateUserAvatar(GetCurrentUserId(), request);
                return new CommonResponse(result);
            }
            else
            {
                return new CommonResponse(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

    }
}
