package cn.bx.xweb.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.HandlerMapping;

import cn.bx.system.utils.UserUtils;


@Controller
public class PagesController {
	Logger log  = Logger.getLogger(PagesController.class);
	@Value("${login.url}")
	private String loginUrl;
	@Value("${index.url}")
	private String indexUrl;
	@Value("${pages.url}")
	private String pagesUrl;
	@RequestMapping("/index")
	public String index(){
		return indexUrl;
	}
	@RequestMapping("/login")
	public String login(){
		Map<String, String> user = UserUtils.getUser();
		return (user != null && UserUtils.getUserId(user) != null) ? indexUrl : loginUrl;
	}
	@RequestMapping("${pages.url}**")
	public String pages(HttpServletRequest request) {
		String requestUrl = (String)request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
		log.debug("jsp请求:"+requestUrl);
		return requestUrl.replaceFirst(pagesUrl, "");
	}
}
