package cn.bx.system.security;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.Permission;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;

import cn.bx.bframe.common.config.AppConstants;
import cn.bx.bframe.common.security.PasswordUtil;
import cn.bx.system.entity.User;
import cn.bx.system.service.SystemService;
import cn.bx.system.utils.UserUtils;

public class SysAuthorizingRealm extends AuthorizingRealm {

    @Resource(name="SystemService")
    private SystemService systemService;
    
    /**
	 * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用
	 */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
    	User principal = (User) getAvailablePrincipal(principals);
    	System.out.println("@@@@@@@@@@@@@@"+principal);
        //User user = systemService.findUserByLoginName(principal.getLoginName());
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        //authorizationInfo.setRoles(userService.findRolesByUser(user));
        //authorizationInfo.setStringPermissions(userService.findPermissionsByUser(user));
        return authorizationInfo;
    }
    /**
	 * 认证回调函数, 登录时调用
	 */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
    	UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
        String username = token.getUsername();
        System.out.println(username+","+getName()+","+new String(token.getPassword()));
        HashMap<String,String> user = systemService.findUserByLoginName(username);
        if(user == null) {
            throw new UnknownAccountException();//没找到帐号
        }
        if (AppConstants.NO.equals(UserUtils.getStatus(user))){
			throw new AuthenticationException("msg:该帐号已停用");
		}
        return new SimpleAuthenticationInfo(
        		user,
        		PasswordUtil.decryptPassword(UserUtils.getPassword(user)),
                ByteSource.Util.bytes(PasswordUtil.decryptSalt(UserUtils.getPassword(user))),
                getName()
        );
    }

    public void clearAllCachedAuthorizationInfo() {
        getAuthorizationCache().clear();
    }

    public void clearAllCachedAuthenticationInfo() {
        getAuthenticationCache().clear();
    }

    public void clearAllCache() {
        clearAllCachedAuthenticationInfo();
        clearAllCachedAuthorizationInfo();
    }
    @Override
	protected void checkPermission(Permission permission, AuthorizationInfo info) {
		authorizationValidate(permission);
		super.checkPermission(permission, info);
	}
	
	@Override
	protected boolean[] isPermitted(List<Permission> permissions, AuthorizationInfo info) {
		if (permissions != null && !permissions.isEmpty()) {
            for (Permission permission : permissions) {
        		authorizationValidate(permission);
            }
        }
		return super.isPermitted(permissions, info);
	}
	
	@Override
	public boolean isPermitted(PrincipalCollection principals, Permission permission) {
		authorizationValidate(permission);
		return super.isPermitted(principals, permission);
	}
	
	@Override
	protected boolean isPermittedAll(Collection<Permission> permissions, AuthorizationInfo info) {
		if (permissions != null && !permissions.isEmpty()) {
            for (Permission permission : permissions) {
            	authorizationValidate(permission);
            }
        }
		return super.isPermittedAll(permissions, info);
	}
	
	/**
	 * 授权验证方法
	 * @param permission
	 */
	private void authorizationValidate(Permission permission){
		//模块授权预留接口
	}

  
}