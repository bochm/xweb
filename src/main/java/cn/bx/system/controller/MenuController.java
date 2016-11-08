package cn.bx.system.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.bx.bframe.entity.DataMessage;
import cn.bx.system.entity.Menu;
import cn.bx.system.service.MenuService;

@Controller
@RequestMapping("system/menu")
public class MenuController {
	
	@Resource(name="MenuService")
	MenuService menuService;
	@RequestMapping(value={"list",""})
	public @ResponseBody List<Menu> listMenu(@RequestBody Map<String,String> param){
		List<Menu> list =  menuService.list(param);
		return list;
	}
	@RequestMapping(value="add")
	public @ResponseBody DataMessage addMenu(Menu menu){
		if(menuService.add(menu) > 0)
			return DataMessage.success("菜单保存成功", menu);
		else
			return DataMessage.error("菜单保存失败", menu);
	}
	@RequestMapping(value="save")
	public @ResponseBody DataMessage saveMenu(Menu menu){
		if(menuService.save(menu) == 1)
			return DataMessage.success("菜单保存成功", menu);
		else
			return DataMessage.error("菜单保存失败", menu);
	}
	@RequestMapping(value="delete")
	public @ResponseBody DataMessage deleteMenu(@RequestBody String[] ids){
		if(menuService.removeListWithChildren(ids) > 0)
			return DataMessage.success("菜单删除成功", ids);
		else
			return DataMessage.error("菜单保存失败", ids);
	}
}
