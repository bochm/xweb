package cn.bx.xweb.util;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.support.RequestContextUtils;

import cn.bx.bframe.common.spring.SpringContextHolder;

/**
 *  根据Spring RequestContextHolder获取web上下文
 * @author bcm
 *
 */
public class WebContextHolder {
	public static HttpServletRequest getRequest(){
		ServletRequestAttributes attr = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		return attr != null ? attr.getRequest() : null;
	}
	public static HttpSession getCurrentSession(boolean create){
		
		return getRequest() != null ? getRequest().getSession(create) : null;
	}
	public static HttpSession getCurrentSession(){
		return getCurrentSession(false);
	}
	public static Object getSessionAttribute(String attrName){
		return getCurrentSession().getAttribute(attrName);
	}
	public static Locale getLocale(){
		return RequestContextUtils.getLocale(getRequest());
	}
	public static String getMessage(String code){
		return getMessage(code,code); 
	}
	public static String getMessage(String code,String defaultMessage){
		return ((ResourceBundleMessageSource)SpringContextHolder.getBean("messageSource")).getMessage(code, null, defaultMessage, getLocale());
	}
}
