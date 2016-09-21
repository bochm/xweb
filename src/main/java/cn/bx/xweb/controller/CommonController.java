package cn.bx.xweb.controller;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.bx.bframe.common.config.AppConstants;
import cn.bx.bframe.mapper.SqlMapperTemplet;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 通用请求处理
 * @author bcm
 *
 */
@Controller
@RequestMapping(value="/app/common")
public class CommonController {
	@Resource(name="sqlMapperTemplet")
	private SqlMapperTemplet<?> sqlMapperTemplet;
	/*
	 * 常量 js获取系统常量,使用json注解为js初始化调用
	 */
	@RequestMapping("/constrants")
	public @ResponseBody Map<String,Object> getConstrants() {
		Map<String,Object> ret = new HashMap<String,Object>();
		Field[] fields = AppConstants.class.getDeclaredFields();
		for(Field f : fields){
			try {
				if(f.getAnnotation(JsonProperty.class) != null){
					ret.put(f.getAnnotation(JsonProperty.class).value(), f.get(f.getName()));
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return ret;
	}
	/*
	 * 根据sqlMapper中的stmID获取数据数据
	 */
	@RequestMapping("/selectArrayByStmID")
	@SuppressWarnings("unchecked")
	public @ResponseBody List<Map<String,Object>> queryArrayByStmID(@RequestBody Map<String,Object> parameter) {
		String stmID = String.valueOf(parameter.get("stmID"));
		Map<String,String> param = (Map<String,String>)parameter.get("param");
		List<Map<String,Object>> ret = (List<Map<String, Object>>) sqlMapperTemplet.selectList(stmID, param);
		return ret;
	}
	
	/*
	 * 根据sqlMapper中的stmID获取数据数据
	 */
	@RequestMapping("/selectMapByStmID")
	@SuppressWarnings("unchecked")
	public @ResponseBody Map<String,Object> queryMapByStmID(@RequestBody Map<String,Object> parameter) {
		String stmID = String.valueOf(parameter.get("stmID"));
		Map<String,String> param = (Map<String,String>)parameter.get("param");
		Map<String,Object> ret = sqlMapperTemplet.selectMap(stmID, param);
		return ret;
	}
}
