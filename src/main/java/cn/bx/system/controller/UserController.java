package cn.bx.system.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.bx.bframe.common.security.PasswordUtil;
import cn.bx.bframe.entity.DataMessage;
import cn.bx.system.entity.User;
import cn.bx.system.service.UserService;

@Controller
@RequestMapping("system/user")
public class UserController {
	
	@Resource(name="UserService")
	UserService userService;
	
	@RequestMapping("checkLoginName")
	public @ResponseBody boolean checkLoginName(@RequestBody Map<String,Object> param){
		User u = userService.selectOne("checkUserExists", param.get("param"));
		return u == null || u.getId() == null;
	}
	@RequestMapping(value={"list",""})
	public @ResponseBody List<User> listUser(@RequestBody Map<String,String> param){
		return userService.selectList("listUser", param);
	}
	@RequestMapping(value="add")
	public @ResponseBody DataMessage addUser(User user){
		user.setPassword(PasswordUtil.entryptPassword(user.getPassword()));
		if(userService.insert("addUser", user) > 0)
			return DataMessage.success("保存成功", user);
		else
			return DataMessage.error("保存失败", user);
	}
	@RequestMapping(value="save")
	public @ResponseBody DataMessage saveUser(User user){
		if(!StringUtils.isEmpty(user.getPassword()))
			user.setPassword(PasswordUtil.entryptPassword(user.getPassword()));
		if(userService.update("saveUser", user) > 0)
			return DataMessage.success("保存成功", user);
		else
			return DataMessage.error("保存失败", user);
	}
	@RequestMapping(value="delete")
	public @ResponseBody DataMessage deleteUser(@RequestBody String[] ids){
		if(userService.delete("deleteUser", ids)  == ids.length)
			return DataMessage.success("删除成功", ids);
		else
			return DataMessage.error("删除失败", ids);
	}
}
