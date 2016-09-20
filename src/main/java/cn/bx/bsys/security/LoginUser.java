package cn.bx.bsys.security;

import java.io.Serializable;

import cn.bx.bsys.user.mapper.User;
/**
* 授权用户信息
*/
public class LoginUser implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String id; // 编号
	private String loginName; // 登录名
	private String name; // 姓名
	private boolean mobileLogin; // 是否手机登录
	private User user;

	public LoginUser(User user, boolean mobileLogin) {
		this.user = user;
		this.id = user.getId();
		this.loginName = user.getLoginName();
		this.name = user.getName();
		this.mobileLogin = mobileLogin;
	}

	public String getId() {
		return id;
	}

	public String getLoginName() {
		return loginName;
	}

	public String getName() {
		return name;
	}

	public boolean isMobileLogin() {
		return mobileLogin;
	}
	
	public User getUser() {
		return user;
	}

	@Override
	public String toString() {
		return id;
	}

}
