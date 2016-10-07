package cn.bx.bsys.menu.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.bx.bsys.menu.mapper.Menu;
import cn.bx.bsys.menu.service.MenuService;

@Controller
@RequestMapping("bsys/menu")
public class MenuController {
	
	@Resource(name="MenuService")
	MenuService menuService;
	@RequestMapping(value={"list",""})
	public @ResponseBody List<Menu> listMenu(@RequestBody Map<String,String> param){
		return menuService.selectList("listMenu", param);
	}
	
}
