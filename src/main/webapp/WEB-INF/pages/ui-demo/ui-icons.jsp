<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="${resourcePath}/lib/google-code-prettify/prettify.css" />
<script type="text/javascript" src="${resourcePath}/lib/google-code-prettify/prettify.js"></script>
<div class="row">
	<div class="col-md-12">
		<div class="tabbable tabbable-custom tabbable-noborder">
			<ul class="nav nav-tabs">
				<li><a href="#tab_fontawesome-demo" data-toggle="tab" data-url="${ctx}/pages/ui-demo/ui-icons/font-awesome">Fontawesome 图标</a></li>
				<li><a href="#tab_iconfont-demo" data-toggle="tab" data-url="${ctx}/pages/ui-demo/ui-icons/iconfont">阿里IconFont </a></li>
			</ul>
			<div class="tab-content">
				<div class="tab-pane fontawesome-demo" id="tab_fontawesome-demo"/>
				<div class="tab-pane iconfont-demo" id="tab_iconfont-demo"/>
			</div>
		</div>
	</div>
</div>