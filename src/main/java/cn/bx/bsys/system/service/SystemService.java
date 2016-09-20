package cn.bx.bsys.system.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.bx.bsys.user.mapper.User;
import cn.bx.bsys.user.service.UserService;

/**
 * 系统服务类，包含用户、角色、菜单等系统安全数据
 * @author bcm
 * @version 2016-05-19
 */
@Service("SystemService")
@Transactional(readOnly=true)
public class SystemService {
	@Resource(name="UserService")
	private UserService userService;
	
	public User findUserByLoginName(String loginname){
		return userService.findByUserName(loginname);
	}
}
