package cn.bx.system.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.bx.bframe.entity.DataMessage;
import cn.bx.system.entity.Dict;
import cn.bx.system.service.DictService;

@Controller
@RequestMapping("system/dict")
public class DictController {
	@Resource(name="DictService")
	DictService service;
	@RequestMapping(value={"list",""})
	public @ResponseBody List<Dict> listDict(@RequestBody Map<String,String> param){
		return service.selectList("list", param);
	}
	@RequestMapping(value="query/{type}")
	public @ResponseBody List<Dict> getDictByType(@PathVariable("type") String type){
		return service.findDictByType(type);
	}
	@RequestMapping(value="add")
	public @ResponseBody DataMessage addDict(Dict dict){
		if(service.insert("add", dict) > 0)
			return DataMessage.success("保存字典数据成功", dict);
		else
			return DataMessage.error("保存失败", dict);
	}
	@RequestMapping(value="save")
	public @ResponseBody DataMessage saveDict(Dict dict){
		if(service.update("save", dict) > 0)
			return DataMessage.success("保存字典数据成功", dict);
		else
			return DataMessage.error("保存失败", dict);
	}
	@RequestMapping(value="delete")
	public @ResponseBody DataMessage deleteDict(@RequestBody String[] ids){
		if(service.delete("delete", ids)  == ids.length)
			return DataMessage.success("删除成功", ids);
		else
			return DataMessage.error("删除失败", ids);
	}
}
