package com.neusoft.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.bx.bframe.paging.PageHelper;
import cn.bx.bframe.paging.PageInfo;
import cn.bx.xweb.util.RequestUtil;

import com.neusoft.demo.service.DemoService;

@Controller
public class DemoController {
	@Resource(name="DemoService")
	DemoService service;
	@RequestMapping("demo/table/simple/queryResource")
	public @ResponseBody List<HashMap<String,Object>> queryResource(@RequestBody Map<String,String> param){
		System.out.println(param.get("pcompany"));
		return service.selectList("queryResource", param);
	}
	@RequestMapping("demo/table/simple/queryResourceForPage")
	public @ResponseBody PageInfo<HashMap<String,Object>> queryResource(HttpServletRequest req){
		System.out.println(req.getParameter("tableDraw")+"***********");
		PageHelper.startPage(req);
		return new PageInfo<HashMap<String,Object>>(queryResource(RequestUtil.parseParamMap(req)));
	}
	
}
