package cn.bx.bsys.user.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.bx.bsys.user.mapper.User;
import cn.bx.bsys.user.service.UserService;

@Controller
@RequestMapping("bsys/user")
<<<<<<< HEAD
public class UserController{
=======
public class UserController {
>>>>>>> 33e67fcad051d27e92940115f59a37b5c3f5830e
	@Resource(name="UserService")
	UserService userService;
	@RequestMapping(value={"list",""})
	public @ResponseBody List<User> listUser(@RequestBody Map<String,String> param){
		System.out.println(param.get("pcompany"));
		return userService.selectList("listUser", param);
	}
<<<<<<< HEAD
	@RequestMapping(value="add")
	public @ResponseBody User addUser(User user){
		userService.insert("addUser", user);
		return user;
	}
=======
>>>>>>> 33e67fcad051d27e92940115f59a37b5c3f5830e
}
