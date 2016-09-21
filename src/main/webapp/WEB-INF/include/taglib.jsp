<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="/WEB-INF/tags/shiros.tld" prefix="shiro"%>
<%@ taglib uri="http://www.bx.cn/app-info" prefix="app" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" scope="session"/>
<c:set var="resourcePath" value="${pageContext.request.contextPath}/static/resources" scope="session"/>