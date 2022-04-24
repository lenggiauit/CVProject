using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using CV.API.Domain.Entities;
using CV.API.Domain.Helpers;
using CV.API.Domain.Repositories;
using CV.API.Domain.Services;
using CV.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV.API.Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountServiceRepository;
        private readonly IEmailService _emailService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly AppSettings _appSettings;
        private readonly ILogger<AccountService> _logger;

        public AccountService(IAccountRepository accountServiceRepository, IEmailService emailService, ILogger<AccountService> logger, IUnitOfWork unitOfWork, IOptions<AppSettings> appSettings)
        {
            _accountServiceRepository = accountServiceRepository;
            _emailService = emailService;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _appSettings = appSettings.Value;
        }

        public async Task<ResultCode> CheckEmail(string email)
        {
            return await _accountServiceRepository.CheckEmail(email);
        }

        public async Task<ResultCode> CheckEmailWithUser(string email, Guid id)
        {
            return await _accountServiceRepository.CheckEmailWithUser(email, id);
        }

        public async Task<ResultCode> CheckUserName(string userName)
        {
            return await _accountServiceRepository.CheckUserName(userName);
        }

        public async Task<ResultCode> ForgotPassword(string email)
        {
            var user = await _accountServiceRepository.GetByEmail(email);
            if (user != null)
            {
                try
                {
                    long expireTime = DateTime.Now.AddDays(1).ToUniversalTime().Ticks;
                    string resetPasswordUrl = string.Format("{0}?code={1}", _appSettings.ForgotPasswordUrl, EncryptionHelper.Encrypt(user.Id.ToString() + "_" + expireTime.ToString(), _appSettings.Secret));
                    await _emailService.Send(email,
                        _appSettings.MailForgotPasswordSubject,
                        string.Format(_appSettings.MailForgotPasswordContent, user.UserName, resetPasswordUrl));

                    return ResultCode.Success;
                }
                catch (Exception e)
                {
                    _logger.LogError(e.Message);
                    return ResultCode.Error;
                }
            }
            else
            {
                return ResultCode.NotExistEmail;
            }
        }

        public async Task<User> GetById(Guid id)
        {
            return await _accountServiceRepository.GetById(id);
        }

        public async Task<User> Login(string name, string password)
        {
            return await _accountServiceRepository.Login(name, password);
        }

        public async Task<User> LoginWithGoogle(string email)
        {
            return await _accountServiceRepository.LoginWithGoogle(email);
        }

        public async Task<ResultCode> Register(string name, string email, string password)
        {
            return await _accountServiceRepository.Register(name, email, password);
        }

        public async Task<ResultCode> ResetPassword(string userInfo, string newPassword)
        {
            try
            {
                string decryptedStr = EncryptionHelper.Decrypt(userInfo, _appSettings.Secret);

                Guid userId = Guid.Parse(decryptedStr.Split('_')[0]);
                long expireTime = long.Parse(decryptedStr.Split('_')[1]);
                if (expireTime > DateTime.Now.ToUniversalTime().Ticks)
                {
                    var user = await _accountServiceRepository.GetById(userId);
                    if (user != null)
                    {
                        await _accountServiceRepository.UpdateUserPasword(userId, newPassword);
                        await _unitOfWork.CompleteAsync();
                        return ResultCode.Success;
                    }
                    else
                    {
                        return ResultCode.NotExistUser;
                    }
                }
                else
                {
                    return ResultCode.Expired;
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return ResultCode.Error;
            }
        }

        public async Task<ResultCode> UpdateProfile(Guid userId, BaseRequest<UpdateProfileRequest> request)
        {
            try
            { 
                if (await _accountServiceRepository.UpdateProfile(userId, request.Payload))
                { 
                    await _unitOfWork.CompleteAsync();
                    return ResultCode.Success;
                }
                else
                {
                    return ResultCode.NotExistUser;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return (ResultCode.Error);
            }
        }

        public async Task<ResultCode> UpdateUserAvatar(Guid userId, BaseRequest<UpdateUserAvatarRequest> request)
        {
            try
            { 
                if (await _accountServiceRepository.UpdateUserAvatar(userId, request.Payload.Avatar))
                { 
                    await _unitOfWork.CompleteAsync();
                    return (ResultCode.Success);
                }
                else
                {
                    return (ResultCode.NotExistUser);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return (ResultCode.Error);
            }
        }
    }
}
