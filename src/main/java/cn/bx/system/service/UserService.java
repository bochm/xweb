package cn.bx.system.service;

import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.bx.bframe.service.SimpleService;
import cn.bx.system.entity.User;

@Service("UserService")
@Transactional(rollbackFor=Exception.class)
public class UserService extends SimpleService<User>{
	public User findByUserName(String username){
		return selectOne("findUserByLoginName", username);
	}
	
	public Set<String> findRolesByUser(User user){
		return null;
	}
	public Set<String> findPermissionsByUser(User user){
		return null;
	}
}
