package cn.bx.bsys.security;

import java.util.concurrent.atomic.AtomicInteger;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;

import cn.bx.bframe.system.entity.LoginUser;
import cn.bx.bframe.system.utils.UserUtils;
/**
 * <p>Author: bcm
 * <p>Date: 15-8-16
 * <p>验证匹配重试次数
 */
public class SysHashedCredentialsMatcher extends HashedCredentialsMatcher {

    private Cache<String, AtomicInteger> passwordRetryCache;
    public SysHashedCredentialsMatcher(CacheManager cacheManager) {
    	//ehcache-sys.xml中定义的名称
        passwordRetryCache = cacheManager.getCache(UserUtils.PWD_RETRY_CACHE);
    }

    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
        String username = (String)token.getPrincipal();
        AtomicInteger retryCount = passwordRetryCache.get(username);
        if(retryCount == null) {
            retryCount = new AtomicInteger(0);
            passwordRetryCache.put(username, retryCount);
        }
        if(retryCount.incrementAndGet() > 5) { //重试次数大于5次
            throw new ExcessiveAttemptsException("msg:登录次数过多，请稍后再试!");
        }

        boolean matches = super.doCredentialsMatch(token, info);
        if(matches) {
            passwordRetryCache.remove(username);
            LoginUser loginuser = (LoginUser)info.getPrincipals().getPrimaryPrincipal();
            UserUtils.putUserInCache(loginuser.getUser());
        }
        return matches;
    }
}