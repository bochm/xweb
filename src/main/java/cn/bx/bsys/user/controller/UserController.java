package cn.bx.bsys.user.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.bx.bframe.entity.DataMessage;
import cn.bx.bsys.user.mapper.User;
import cn.bx.bsys.user.service.UserService;

@Controller
@RequestMapping("bsys/user")
public class UserController {

	@Resource(name="UserService")
	UserService userService;
	@RequestMapping(value={"list",""})
	public @ResponseBody List<User> listUser(@RequestBody Map<String,String> param){
		return userService.selectList("listUser", param);
	}
	@RequestMapping(value="add")
	public @ResponseBody DataMessage addUser(User user){
		if(userService.insert("addUser", user) > 0)
			return DataMessage.success("保存成功", user);
		else
			return DataMessage.error("保存失败", user);
	}
}
