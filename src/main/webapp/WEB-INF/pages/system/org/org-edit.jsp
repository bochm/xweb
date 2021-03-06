<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="modal fade" id="system-org-edit" tabindex="-1" role="dialog" data-backdrop="static">
<div class="modal-dialog">
<div class="modal-content">
	<div class="modal-header">
	   <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	   <h4 class="modal-title">组织机构维护</h4>
	</div>
	<div class="modal-body">
	   	<form  role="form" class="form-horizontal" id="system-org-edit-form">
	   	<input type="hidden" name="id">
	   	<div class="form-body">
	   		<div class="row">
			<div class="col-md-6">
				<div class="form-group">
					<label class="control-label col-md-4">机构名称</label>
					<div class="col-md-8">
					<div class="input-icon left"> <i class="fa validate-icon"></i>
					<input type="text" name="name" class="form-control required">
					</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group">
					<label class="control-label col-md-4">类型</label>
					<div class="col-md-8">
					<div class="input-icon left"> <i class="fa validate-icon"></i>
					<select name="type" form-role='select' data-dict-type='sys_org_type' class="form-control required selectOpt"/>
					</div>
					</div>
				</div>
			</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-2">机构地址</label>
						<div class="col-md-10"><input type="text" name="addr" class="form-control"></div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-2">上级机构</label>
						<div class="col-md-10">
						<input type="hidden"  name="parentTree" data-tree-for="parentOrgName"/>
						<input type='hidden' name='parentId' data-id-for="parentOrgName"/>
						<input type="text" name="parentOrgName" form-role="treeSelect" tree-key-pid="parent_id" id="system_org_parentTree"
						readonly="readonly"  class="form-control" data-stmid="cn.bx.system.mapper.OrgMapper.queryOrgTree"/>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label class="control-label col-md-4">负责人</label>
						<div class="col-md-8">
						<input type="hidden" name="master.name">
						<select name="master.id" form-role='select' data-stmid='cn.bx.system.mapper.OrgMapper.queryOrgMaster' class="form-control"/>
						</div>
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
	   	</div>	   	
	   </form>
	</div>
	<div class="modal-footer">
	   <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	   <button type="button" class="btn btn-primary" data-submit="#system-org-edit-form">提交</button>
	</div>
</div>
</div>
</div>
<script>
require(['app/common','app/form','app/treetable'],function(APP,FORM,DT){
	var act = APP.getParameterByName("act");
	$("#system-org-edit-form [name='master.id']").on("change",function(){
		$("#system-org-edit-form [name='master.name']").val($(this).children(":selected").text());
	})
	
	var table = DT.getTable('#table-system-org-list');
	var _formInitOpt = {
			 formAction : act,validate : {},clearForm : true,url:"system/org/"+act,
			 fieldOpts : {
				 "parentOrgName" : {"view" : {"selectedMulti": false}}
			 },
			 onSuccess : function(ret){
				 $.fn.zTree.getZTreeObj('system_org_parentTree').reAsyncChildNodes(null, "refresh");
				 table.addRow(ret);
			 }
	};
	 
	if(act == 'save'){
		_formInitOpt.formData = table.selectedRows()[0];
		_formInitOpt.clearForm = false;
		_formInitOpt.fieldOpts.parentOrgName.param = {"parentOrg" : _formInitOpt.formData.id};
		_formInitOpt.onSuccess = function(ret){
			 $.fn.zTree.getZTreeObj('system_org_parentTree').reAsyncChildNodes(null, "refresh");
			 table.updateSelectedRow(ret);
		 }
	}
	$('#system-org-edit-form').initForm(_formInitOpt);
	
});
</script>