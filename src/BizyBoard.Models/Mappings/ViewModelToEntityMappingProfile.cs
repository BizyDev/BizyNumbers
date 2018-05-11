﻿namespace BizyBoard.Models.Mappings
{
    using AutoMapper;
    using DbEntities;
    using ViewModels;

    public class ViewModelToEntityMappingProfile : Profile
    {
        public ViewModelToEntityMappingProfile()
        {
            CreateMap<RegistrationViewModel, AppUser>().ForMember(au => au.Email, map => map.MapFrom(vm => vm.Email));
        }
    }
}