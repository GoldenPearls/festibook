package com.in4mation.festibook.service.login;

import com.in4mation.festibook.dto.member.MemberDTO;
import com.in4mation.festibook.exception.LoginException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


public interface LoginService { // username(UserDetailsService 인터페이스의 일부로서, Spring Security에서 제공)은 user id
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
    public MemberDTO checkLoin(String username, String password) throws LoginException;
}
