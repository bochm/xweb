<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp" %>
<div class="modal fade" id="bsys-menu-edit" tabindex="-1" role="dialog" data-backdrop="static">
<div class="modal-dialog">
<div class="modal-content">
	<div class="modal-header">
	   <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	   <h4 class="modal-title">菜单维护</h4>
	</div>
	<div class="modal-body">
	   	<form  role="form" class="form-horizontal" id="bsys-menu-edit-form" action="${ctx}/bsys/menu/${param.act}.json">
	   	<input type="hidden" name="id">
	   	<div class="form-body">
	   		<div class="row">
			<div class="col-md-6">
				<div class="form-group">
					<label class="control-label col-md-4">菜单名称</label>
					<div class="col-md-8"><input type="text" name="name" class="form-control required"></div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group">
					<label class="control-label col-md-4">菜单图标</label>
					<div class="col-md-8">
					<div class="input-icon left"> <i class="fa validate-icon"></i>
					<select id="sys_menu_forms_icons" name="icon" form-role='select' placeholder='{"id":"icon-suitcase"}' 
					data-json='${resourcePath}/jsons/icons' class="form-control required selectOpt"/>
					</div>
					</div>
				</div>
			</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-2">菜单链接</label>
						<div class="col-md-10"><input type="text" name="target" class="form-control"></div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-2">上级菜单</label>
						<div class="col-md-10">
						<input type="hidden"  name="parentIds" data-ids-for="parentMenuName"/>
						<input type="text" name="parentMenuName" form-role="treeSelect" tree-pid="parent_id"
						readonly="readonly"  class="form-control"  data-treeid="bsys_menu_forms_parentTree"
						data-stmid="cn.bx.bsys.menu.mapper.MenuMapper.selectAllMenuTree"/>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label class="control-label col-md-4">排序号</label>
						<div class="col-md-8"><input type="text" name="sort" class="form-control required digits"></div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label class="control-label col-md-4">是否启用</label>
						<div class="col-md-8"><input type="checkbox" name="status" data-on-value="1" checked class="bs-switch form-control" data-off-text="不是"></div>
					</div>
				</div>
			</div>
	   	</div>	   	
	   </form>
	</div>
	<div class="modal-footer">
	   <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	   <button type="button" class="btn btn-primary">提交</button>
	</div>
</div>
</div>
</div>
<script>
require(['app/common','app/form'],function(APP,FORM){
	function sys_menuedit_formatResult(data){
		if (!data.id && !data.icons) { return data.text; }
		var icons = data.icons ? data.icons : data.id;
		return $("<span align='left'><i class='"+icons+"'></i>&nbsp;"+data.text+"</span>");
	}
	
	var act = '${param.act}';
	$('.modal-footer .btn-primary').click(function(){
		$('#bsys-menu-edit-form').submit();
	});
	
/* 	var menuTable = $("#sys_menu").dataTable().api(); 
	var _formInitOpt = {};
	_formInitOpt.validate = {};
	_formInitOpt.success = function(response, status){
		var result = bx.getAjaxRet(response,{title:"菜单维护",msg:"保存成功"});
		console.log(result);
		if(result.OK){
			if(act == 'add')
				menuTable.row.add(result.data).draw();
			else
				menuTable.row(menuTable.rows('.selected')[0]).data(result.data);
			$('#sys_menu_modal_edit').modal('hide');
		}
	 };
	 
	 if(act == 'mod'){
		 $('#sys_menu_modal_edit .modal-title').html('修改菜单');
		 
		 _formInitOpt.formData = menuTable.rows('.selected').data()[0];
	 } */
	 
	 $('#bsys-menu-edit-form').initForm({
		 formAction : act,clearForm : true,
		 validate : {},
		 fieldOpts : {
			 "icon" : {"templateResult" : sys_menuedit_formatResult, "templateSelection":sys_menuedit_formatResult},
			 "parentMenuName" : {"view" : {"selectedMulti": false}}
		 }
	 },function(ret){
		 $.fn.zTree.getZTreeObj('bsys_menu_forms_parentTree').reAsyncChildNodes(null, "refresh");
	 });
	
});
</script>