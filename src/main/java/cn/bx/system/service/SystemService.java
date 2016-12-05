package cn.bx.system.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.bx.bframe.service.SimpleService;

/**
 * 系统服务类，包含用户、角色、菜单等系统安全数据
 * @author bcm
 * @version 2016-05-19
 */
@Service("SystemService")
@Transactional(readOnly=true)
public class SystemService extends SimpleService<HashMap<String,String>>{
	public HashMap<String,String> findUserByLoginName(String loginname){
		return this.selectOne("findUserByLoginName", loginname);
	}
	public List<HashMap<String,String>> listMenuByRules(String[] ruleIds){
		return this.selectList("listMenuByRules", ruleIds);
	}
}
