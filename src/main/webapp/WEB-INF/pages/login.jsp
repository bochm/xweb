<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Calendar"%>
<%@ include file="/WEB-INF/include/head_inc.jsp" %>
<%@ include file="/WEB-INF/include/script_inc.jsp"%>
<body class="login">
<div style="display: none;">
<div class="content">
	<form class="login-form" action="login" method="post">
		<h3 class="form-title">登&nbsp;&nbsp;录</h3>
		<div class="form-group">
			<label class="control-label visible-ie8 visible-ie9">用户名</label>
			<input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="用户名" name="username"/>
		</div>
		<div class="form-group">
			<label class="control-label visible-ie8 visible-ie9">密码</label>
			<input class="form-control form-control-solid placeholder-no-fix" type="password" autocomplete="off" placeholder="密码" name="password"/>
		</div>
		<div class="form-actions">
			<button type="submit" class="btn btn-success uppercase">登录</button>
			<span class="x-check check-success rememberme"><input type="checkbox" name="rememberMe" id="login-rememberMe" value="1" checked="checked"><label for="login-rememberMe">记住</label></span>
			
		</div>
		<div class="create-account">
			<p><a href="javascript:;" id="register-btn" class="uppercase">创建账号</a></p>
		</div>
	</form>
</div>
<div class="copyright">
	 2016 © NEUSOFT. bcm.
</div>
</div>
<script type="text/javascript">
require(['domReady!','main'],function(doc,APP){
	var _login_msg = "${loginMsg}";
	if(_login_msg != ""){
		APP.alert("",_login_msg,"error");
	}
	$('body>div').slideDown('fast',function(){
		document.forms[0].username.focus();
		$('form.login-form').on('submit',function(){
			if(document.forms[0].username.value == "" || document.forms[0].password.value == ""){
				APP.alert("","请输入用户名和密码","error");
				return false;
			}
		})
	});
	
	
});
</script>
</body>