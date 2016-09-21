package cn.bx.xweb.util;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.util.StringUtils;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class RequestUtil extends ServletRequestUtils{
	public static boolean isAjax(HttpServletRequest request) {
		if (request != null && "XMLHttpRequest".equalsIgnoreCase(request.getHeader("X-Requested-With")))
			return true;
		return false;
	}
	
	/**
	 * 获取当前请求对象
	 * @return HttpServletRequest
	 */
	public static HttpServletRequest getRequest(){
		try{
			return ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		}catch(Exception e){
			return null;
		}
	}
	/**
	 * 返回request中的请求参数,数组形式以,隔开
	 * @return Map
	 */
	@SuppressWarnings({"rawtypes" })
	public static Map<String,String> parseParamMap(HttpServletRequest request) {
		Map<String,String> paraMap = new HashMap<String,String>();
		
		Enumeration paraNames = request.getParameterNames();
		String paraName;
		String[] paraValues;
		while(paraNames.hasMoreElements()){
			paraName = (String)paraNames.nextElement();
			paraValues = request.getParameterValues(paraName);
			if(paraValues !=null ){
				if(paraValues.length == 1) paraMap.put(paraName, paraValues[0]);
				if(paraValues.length > 1) paraMap.put(paraName,StringUtils.arrayToDelimitedString(paraValues,","));
			}
		}
		return paraMap;
	}
}
