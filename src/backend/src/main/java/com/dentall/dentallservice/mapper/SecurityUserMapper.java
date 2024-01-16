package com.dentall.dentallservice.mapper;

import com.dentall.dentallservice.model.domain.SecurityRole;
import com.dentall.dentallservice.model.domain.SecurityUser;
import com.dentall.dentallservice.model.dto.SecurityUserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "Spring")
public interface SecurityUserMapper {

    @Mapping(source = "roles", target = "roles", qualifiedByName = "rolesToStringList")
    SecurityUserDto modelToDto(SecurityUser securityUser);

    List<SecurityUserDto> modelsToDtos(List<SecurityUser> securityUsers);

    @Named("rolesToStringList")
    default List<String> rolesToStringList(List<SecurityRole> roles) {
        if (roles == null) {
            return null;
        }
        return roles.stream().map(SecurityRole::getName).collect(Collectors.toList());
    }
}
