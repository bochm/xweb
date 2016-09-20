package cn.bx.xweb.tags;

import cn.bx.bframe.common.config.AppConstants;
/**
 * 页面自定义EL标签
 * @author bcm
 */
public class AppInfoEL {
	public static AppConstants getAppConstants(){
		return AppConstants.getInstance();
	}
	public static String getConfig(String key){
		return getAppConstants().getConfig(key);
	}
}
