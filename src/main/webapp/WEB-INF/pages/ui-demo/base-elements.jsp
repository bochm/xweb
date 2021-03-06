<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="${resourcePath}/lib/google-code-prettify/prettify.css" />
<script type="text/javascript" src="${resourcePath}/lib/google-code-prettify/prettify.js"></script>

<div class="row">
	
		<div class="col-md-6">
			<!-- start: NOTIFICATION PANEL -->
			<div class="portlet box blue" panel-title="弹出通知" panel-tools="expand,fullscreen,reload" 
				 panel-icon="fa fa-briefcase" data-url="${ctx}/pages/ui-demo/base-elements/notice"/>
			<!-- start  MODAL DIALOG-->
			<div class="portlet light" panel-title="模态对话框" panel-icon="fa fa-external-link" data-url="${ctx}/pages/ui-demo/base-elements/modal-dialog">
				<div class="actions">
					<a href="#" class="btn btn-default"><i class="fa fa-pencil"></i> 编辑 </a>
					<a href="#" class="btn btn-circle btn-default"><i class="fa fa-plus"></i> 新增 </a>
					<a href="#" class="btn btn-circle btn-default btn-icon-only fullscreen"></a>
				</div>
			</div>
				 
			<!-- start TOOLTIPS-->
			<div class="portlet box green" panel-title="弹出提示" panel-tools="expand,fullscreen,remove" 
				 panel-icon="fa fa-cogs" data-url="${ctx}/pages/ui-demo/base-elements/tooltips"/>

			<!-- start: PULSATE PANEL -->
			<div class="portlet box yellow" panel-title="突出闪动提示" panel-tools="expand,fullscreen,reload" 
				 panel-icon="fa fa-cogs" data-url="${ctx}/pages/ui-demo/base-elements/pulsate"/>
			<!-- end: PULSATE PANEL -->
		</div>
		
		<div class="col-md-6">
			<!-- start: PROGRESS BARS PANEL -->
			<div class="portlet box red" panel-title="进度条" panel-tools="expand,fullscreen,reload" 
				 panel-icon="fa fa-tasks" data-url="${ctx}/pages/ui-demo/base-elements/progress"/>

			<!-- start: LABELS AND BADGES PANEL -->
			<div class="portlet box grey" panel-title="标签和徽章" panel-tools="expand,fullscreen,reload" 
				 panel-icon="fa fa-tags" data-url="${ctx}/pages/ui-demo/base-elements/label-badges"/>

			<!-- start: PAGINATION PANEL -->
			<div class="portlet box blue-hoki" panel-title="分页组件" panel-tools="expand,fullscreen,reload" 
				 panel-icon="fa fa-sort-numeric-asc" data-url="${ctx}/pages/ui-demo/base-elements/pagination"/>
							<!-- end: PAGINATION PANEL -->
		</div>
</div>