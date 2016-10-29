<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp" %>
<div class="loading-page">
<span id="table-bsys-dict-list-toolbar"></span>
<table id="table-bsys-dict-list" class="table datatable table-bordered nowrap"  data-url="${ctx}/system/dict" 
	data-paging="true" data-info="true" data-ordering="true">
		<thead><tr>
			<th data-visible='false' data-column="id">id</th>
			<th  data-column=name >名称</th>
			<th  data-column="value" >字典值</th>
			<th  data-column="type">类型</th>
			<th data-column="typeDesc" >类型名称</th>
			<th  data-column="remarks" >备注</th>
		</tr></thead>
		<tbody>
		</tbody>
</table>	

<!-- 新增修改 http://www.cnblogs.com/wuhuacong/p/4784957.html-->
<div class="modal fade" id="bsys-dict-list-edit" tabindex="-1" role="dialog" data-backdrop="static">
<div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">字典维护</h4>
         </div>
         <div class="modal-body">
            <form class="form-horizontal" action="${ctx}/system/dict/add.json" role="form" id="bsys-dict-edit-form" >
            	<input type="hidden" name="id">
            	<div class="form-body">
            		<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-3">名称</label>
								<div class="col-md-9">
								<div class="input-icon right"> <i class="fa validate-icon"></i><input type="text" name="name" 
								class="form-control required"></div>
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-3">字典值</label>
								<div class="col-md-9">
								<div class="input-icon right"> <i class="fa validate-icon"></i><input type="text" name="value" 
								class="form-control required"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-3">类型</label>
								<div class="col-md-9">
								<select name="type" form-role='select' data-stmid='cn.bx.system.mapper.DictMapper.queryDictTypes' 
								class="form-control required selectOpt" data-allow-add="true"/>
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-3">排序</label>
								<div class="col-md-9"><input type="text" name="sort" class="form-control input-xsmall digits"></div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-9">
							<div class="form-group">
								<label class="control-label col-md-2">备注</label>
								<div class="col-md-10"><input type="text" name="remarks" class="form-control input-xlarge"></div>
							</div>
						</div>
					</div>
            	</div>
            </form>
         </div>
         <div class="modal-footer">
            <button type="button" class="btn  btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary">提交</button>
         </div>
      </div>
</div>
</div>
</div>
<script type="text/javascript">
require(['app/common','app/datatables','app/form'],function(APP,DT,FORM){

	$('.modal-footer .btn-primary').on('click',function(){
		alert($("[name='type']").val());
		$('#bsys-dict-edit-form').submit();
	});
	
	$('table.datatable').initTable({
		"scrollY": "400px",
		"buttons":["addRecord","saveRecord","deleteRecord"],
		"deleteRecord" : {"url" : '${ctx}/system/dict/delete',"id" : 'id'},
		"addEditForm" : {"el" : "#bsys-dict-edit-form"}
	});
})
</script>