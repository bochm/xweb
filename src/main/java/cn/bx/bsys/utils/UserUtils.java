package cn.bx.bsys.utils;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.UnavailableSecurityManagerException;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.cache.ehcache.EhCacheManager;
import org.apache.shiro.session.InvalidSessionException;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

import cn.bx.bframe.common.spring.SpringContextHolder;
import cn.bx.bsys.security.LoginUser;
import cn.bx.bsys.user.mapper.User;

public class UserUtils {
	public static final String USER_CACHE = "sys-userCache";
	public static final String PWD_RETRY_CACHE = "sys-passwordRetryCache";
	public static final String USER_CACHE_ID_ = "id_";
	public static final String USER_CACHE_LOGIN_NAME_ = "ln_";
	public static final String USER_CACHE_LIST_BY_OFFICE_ID_ = "oid_";

	public static final String CACHE_ROLE_LIST = "roleList";
	public static final String CACHE_MENU_LIST = "menuList";
	public static final String CACHE_AREA_LIST = "areaList";
	public static final String CACHE_OFFICE_LIST = "officeList";
	public static final String CACHE_OFFICE_ALL_LIST = "officeAllList";
	private static CacheManager cacheManager = ((EhCacheManager)SpringContextHolder.getBean("shiroCacheManager"));
	
	/**
	 * 获取用户缓存
	 * @param username
	 * @return
	 */
	public static void putUserInCache(User user) {
		putInCache(USER_CACHE, USER_CACHE_ID_ + user.getId(), user);
		putInCache(USER_CACHE, USER_CACHE_LOGIN_NAME_ + user.getLoginName(), user);
	}
	/**
	 * 获取用户缓存
	 * @param username
	 * @return
	 */
	public static User getUserByLoginName(String loginname) {
		return (User)getCache(USER_CACHE).get(USER_CACHE_LOGIN_NAME_+loginname);
	}
	
	/**
	 * 获取缓存
	 * @param cacheName
	 * @param key
	 * @return
	 */
	public static Object getFromCache(String cacheName, String key) {
		return getCache(cacheName).get(key);
	}

	/**
	 * 写入缓存
	 * @param cacheName
	 * @param key
	 * @param value
	 */
	public static void putInCache(String cacheName, String key, Object value) {
		getCache(cacheName).put(key,value);
	}

	/**
	 * 从缓存中移除
	 * @param cacheName
	 * @param key
	 */
	public static void removeFromCache(String cacheName, String key) {
		getCache(cacheName).remove(key);
	}
	/**
	 * 获得一个Cache
	 * @param cacheName
	 * @return
	 */
	private static <K, V> Cache<K,V> getCache(String cacheName){
		return cacheManager.getCache(cacheName);
	}
	/**
	 * 获取当前用户
	 * @return 取不到返回 new User()
	 */
	public static User getUser(){
		LoginUser loginUser = getLoginUser();
		if (loginUser!=null){
			User user = loginUser.getUser();
			if (user != null){
				return user;
			}
			return new User();
		}
		return new User();
	}
	
	/**
	 * 获取授权主要对象
	 */
	public static Subject getSubject(){
		return SecurityUtils.getSubject();
	}
	
	/**
	 * 获取当前登录用户
	 */
	public static LoginUser getLoginUser(){
		try{
			LoginUser loginuser = (LoginUser)getSubject().getPrincipal();
			if (loginuser != null){
				return loginuser;
			}
		}catch (UnavailableSecurityManagerException e) {
			
		}catch (InvalidSessionException e){
			
		}
		return null;
	}
	
	public static Session getSession(){
		try{
			Subject subject = SecurityUtils.getSubject();
			Session session = subject.getSession(false);
			if (session == null){
				session = subject.getSession();
			}
			if (session != null){
				return session;
			}
		}catch (InvalidSessionException e){
			
		}
		return null;
	}
	

	
	public static Object get(String key) {
		return get(key, null);
	}
	
	public static Object get(String key, Object defaultValue) {
		Object obj = getSession().getAttribute(key);
		return obj==null?defaultValue:obj;
	}

	public static void put(String key, Object value) {
		getSession().setAttribute(key, value);
	}

	public static void remove(String key) {
		getSession().removeAttribute(key);
	}
}
