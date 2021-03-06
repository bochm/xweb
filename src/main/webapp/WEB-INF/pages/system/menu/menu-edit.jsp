<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="modal fade" id="system-menu-edit" tabindex="-1" role="dialog" data-backdrop="static">
<div class="modal-dialog">
<div class="modal-content">
	<div class="modal-header">
	   <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	   <h4 class="modal-title">菜单维护</h4>
	</div>
	<div class="modal-body">
	   	<form  role="form" class="form-horizontal" id="system-menu-edit-form">
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
					data-json='static/resources/jsons/icons' class="form-control required selectOpt"/>
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
						<input type="hidden"  name="parentTree" data-tree-for="parentMenuName"/>
						<input type='hidden' name='parentId' data-id-for="parentMenuName"/>
						<input type="text" name="parentMenuName" form-role="treeSelect" tree-key-pid="parent_id"
						readonly="readonly"  class="form-control"  id="system_menu_forms_parentTree"
						data-stmid="cn.bx.system.mapper.MenuMapper.selectAllMenuTree"/>
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
						<label class="control-label col-md-4">状态</label>
						<div class="col-md-8">
						<input type="checkbox" name="status"  checked class="bs-switch form-control" data-dict-type="on_off">
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label class="control-label col-md-4">菜单类型</label>
						<div class="col-md-8"><input type="checkbox" name="type" checked
						class="bs-switch form-control" data-off-color="info" data-dict-type="menu_type"></div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label class="control-label col-md-4">权限标识</label>
						<div class="col-md-8"><input type="text" name="permission" class="form-control"></div>
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
require(['app/common','app/form','app/treetable'],function(APP,FORM,DT){
	function sys_menuedit_formatResult(data){
		if (!data.id && !data.icons) { return data.text; }
		var icons = data.icons ? data.icons : data.id;
		return $("<span align='left'><i class='"+icons+"'></i>&nbsp;"+data.text+"</span>");
	}
	$("input[name='type']").on("switch:change",function(e,state){
		if(state) $("input[name='permission']").removeClass('required');
		else $("input[name='permission']").addClass('required');
	})
	var act = APP.getParameterByName("act");
	$('.modal-footer .btn-primary').click(function(){
		$('#system-menu-edit-form').submit();
	});
	var table = DT.getTable('#table-system-menu-list');
	var _formInitOpt = {
			 formAction : act,validate : {},clearForm : true,url:"system/menu/"+act,
			 fieldOpts : {
				 "icon" : {"templateResult" : sys_menuedit_formatResult, "templateSelection":sys_menuedit_formatResult},
				 "parentMenuName" : {"view" : {"selectedMulti": false}}
			 },
			 onSuccess : function(ret){
				 $.fn.zTree.getZTreeObj('system_menu_forms_parentTree').reAsyncChildNodes(null, "refresh");
				 table.addRow(ret);
			 }
	};
	 
	if(act == 'save'){
		_formInitOpt.formData = table.selectedRows()[0];
		_formInitOpt.clearForm = false;
		_formInitOpt.fieldOpts.parentMenuName.param = {"parentMenu" : _formInitOpt.formData.id};
		_formInitOpt.onSuccess = function(ret){
			 $.fn.zTree.getZTreeObj('system_menu_forms_parentTree').reAsyncChildNodes(null, "refresh");
			 table.updateSelectedRow(ret);
		 }
	}
	$('#system-menu-edit-form').initForm(_formInitOpt);
	
});
</script>