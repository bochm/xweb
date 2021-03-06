<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Calendar"%>
<%@ include file="/WEB-INF/include/head_inc.jsp" %>
<%@ include file="/WEB-INF/include/script_inc.jsp"%>

<body class="page-header-fixed page-sidebar-fixed" style="display: none">

<!-- BEGIN HEADER -->
<div class="page-header navbar navbar-fixed-top">
	<!-- BEGIN HEADER INNER -->
	<div class="page-header-inner">
		<!-- BEGIN LOGO -->
		<div class="page-logo">
			<a href="index.html"><img src="${resourcePath}/images/logo.png" alt="logo" class="logo-default"/></a>
			<div class="menu-toggler sidebar-toggler">
			</div>
		</div>
		
		<!-- END LOGO -->
		<!-- BEGIN RESPONSIVE MENU TOGGLER -->
		<a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"></a>
		<!-- END RESPONSIVE MENU TOGGLER -->
	</div><!-- END PAGE HEADER -->

	<!-- BEGIN TOP NAVIGATION MENU -->
	<div class="top-menu">
	
	<ul class="nav navbar-nav pull-right">
		<li class="dropdown"><a class="dropdown-toggle" data-toggle="refresh-page"><i class="iconfont icon-sync"></i></a><ul></ul></li>
		<!-- BEGIN NOTIFICATION DROPDOWN -->
		<li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">
			<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"><i class="iconfont icon-bell"></i><span class="badge badge-default">2 </span></a>
			<ul class="dropdown-menu">
				<li class="external">
					<h3><span class="bold">12个</span> 通知消息</h3>
					<a href="#">查看所有</a>
				</li>
				<li>
					<ul class="dropdown-menu-list scroller" style="height: 250px;" data-scroll-color="#637283">
						<li><a href="javascript:;"><span class="time">刚刚</span><span class="details"><span class="label label-sm label-icon label-success"><i class="fa fa-plus"></i></span>新用户注册. </span></a></li>
						<li><a href="javascript:;"><span class="time">3分钟</span><span class="details"><span class="label label-sm label-icon label-danger"><i class="fa fa-bolt"></i></span>测试信息. </span></a></li>
					</ul>
				</li>
			</ul>
		</li>
		<!-- END NOTIFICATION DROPDOWN -->
		
		
		<!-- BEGIN USER LOGIN DROPDOWN -->
		<li class="dropdown dropdown-user">
			<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
				<img alt="" class="img-circle" src="${resourcePath}/images/user-admin-sm.jpg"/>
				<span class="username username-hide-on-mobile">Admin </span>
				<i class="fa fa-angle-down"></i>
			</a>
			<ul class="dropdown-menu dropdown-menu-default">
				<li><a href="#"><i class="iconfont icon-user"></i> 我的账号 </a></li>
				<li><a href="#" id="toggleCss"><i class="iconfont icon-calendarfull"></i> 我的日历 </a></li>
				<li><a href="#"><i class="iconfont icon-envelope"></i> 我的邮件 <span class="badge badge-danger">3 </span></a></li>
				<li><a href="page_todo.html"><i class="iconfont icon-bullhorn"></i> 我的任务 <span class="badge badge-success">7 </span></a></li>
				<li class="divider"></li>
				<li><a href="#"><i class="iconfont icon-lock"></i> 锁屏 </a></li>
				<li><a href="logout"><i class="iconfont icon-powerswitch"></i> 登出 </a></li>
			</ul>
		</li>
		<!-- END USER LOGIN DROPDOWN -->
	</ul>
	</div><!-- END TOP NAVIGATION MENU -->
</div><!-- END HEADER INNER -->
<!-- END HEADER -->
<div class="clearfix"></div>

<!-- BEGIN CONTAINER -->
<div class="page-container">
	<!-- BEGIN SIDEBAR -->
	<div class="page-sidebar-wrapper">
		<div class="page-sidebar navbar-collapse collapse" >
			<!-- BEGIN SIDEBAR MENU -->
			<ul class="page-sidebar-menu" id="index-page-sidebar-menu" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
				<li class="sidebar-search-wrapper">
					<form class="sidebar-search sidebar-search-bordered" action="extra_search.html" method="POST">
						<a href="javascript:;" class="remove"><i class="icon-close"></i></a>
						<div class="input-group">
							<input type="text" class="form-control" placeholder="搜索...">
							<span class="input-group-btn"><a href="javascript:;" class="btn submit"><i class="iconfont icon-search"></i></a></span>
						</div>
					</form>
				</li>
				<li class="start active"><a href="#"><i class="iconfont icon-home"></i><span class="title">主页</span><span class="selected"></span></a></li>
				<li><a href="javascript:;"><i class="iconfont icon-component"></i><span class="title">组件</span><span class="selected"></span><span class="arrow"></span></a>
					<ul class="sub-menu">
						<li><a href="/pages/ui-demo/base-elements" class="act-menu"><i class="iconfont icon-select"></i>常用组件</a></li>
						<li><a href="/pages/ui-demo/ui-icons" class="act-menu"><i class="iconfont icon-heart"></i>图标库</a></li>
					</ul>
				</li>
				<li><a href="javascript:;"><i class="iconfont icon-table"></i><span class="title">表格</span><span class="selected"></span><span class="arrow"></span></a>
					<ul class="sub-menu">
						<li><a href="/pages/datatables/base-datatables" class="act-menu"><i class="iconfont icon-select"></i>基础表格</a></li>
						<li><a href="/pages/datatables/curd-table" class="act-menu"><i class="iconfont icon-heart"></i>表格应用</a></li>
					</ul>
				</li>
				<li><a href="javascript:;"><i class="iconfont icon-fileadd"></i><span class="title">多级菜单</span><span class="selected"></span><span class="arrow"></span></a>
					<ul class="sub-menu">
						<li><a href="javascript:;"><i class="iconfont icon-phone"></i> 2级 <span class="arrow"></span></a>
							<ul class="sub-menu">
								<li><a href="javascript:;"><i class="iconfont icon-user"></i> 测试 <span class="arrow"></span></a>
									<ul class="sub-menu">
										<li><a href="#"><i class="iconfont icon-musicnote"></i> 1</a></li>
										<li><a href="#"><i class="iconfont icon-pencil"></i> 2</a></li>
										<li><a href="#"><i class="iconfont icon-star"></i> 3</a></li>
									</ul>
								</li>
								<li><a href="#"><i class="iconfont icon-camera"></i> 测试 1</a></li>
								<li><a href="#"><i class="iconfont icon-link"></i> 测试 2</a></li>
								<li><a href="#"><i class="iconfont icon-poop"></i> 测试 3</a></li>
							</ul>
						</li>
					</ul>
				</li>
				<li><a href="javascript:;"><i class="iconfont icon-cog"></i><span class="title">系统管理</span><span class="selected"></span><span class="arrow"></span></a>
					<ul class="sub-menu">
						<li><a href="pages/system/user/user-list" class="act-menu"><i class="iconfont icon-users"></i> 用户管理</a></li>
						<li><a href="pages/system/menu/menu-list" class="act-menu"><i class="iconfont icon-heart"></i> 菜单管理</a></li>
						<li><a href="pages/system/dict/dict-list" class="act-menu"><i class="iconfont icon-book"></i> 字典数据</a></li>
						<li><a href="pages/system/org/org-list" class="act-menu"><i class="iconfont icon-apartment"></i> 组织机构</a></li>
					</ul>
				</li>
			</ul>
			<!-- END SIDEBAR MENU -->
		</div>
	</div>
	<!-- END SIDEBAR -->
	<!-- BEGIN CONTENT -->
	<div class="page-content-wrapper">
		<div class="page-content"></div>
	</div>
	<!-- END CONTENT -->
</div>
<!-- END CONTAINER -->

<!-- BEGIN FOOTER -->
<div class="page-footer">
	<div class="page-footer-inner">2016 &copy; Neusoft by bochm.</div>
</div>
<!-- END FOOTER -->
</body>
<script type="text/javascript">
require(['domReady!','main'],function(doc,APP){
	APP.initIndex();
	$('body').fadeIn('fast');
});
	
</script>

