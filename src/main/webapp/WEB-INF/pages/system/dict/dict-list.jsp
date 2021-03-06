<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="loading-page">
<span id="table-system-dict-list-toolbar"></span>
<table id="table-system-dict-list" class="table datatable table-bordered nowrap"  data-url="system/dict" 
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

<!-- 新增修改-->
<div class="modal fade" id="system-dict-list-edit" tabindex="-1" role="dialog" data-backdrop="static">
<div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">字典维护</h4>
         </div>
         <div class="modal-body">
            <form class="form-horizontal" action="system/dict" role="form" id="system-dict-edit-form" >
            	<input type="hidden" name="id">
            	<div class="form-body">
            		<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-3">名称</label>
								<div class="col-md-9">
								<div class="input-icon right"> <i class="fa validate-icon"></i><input type="text" name="name" 
								class="form-control required checkExists"></div>
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
								<input type="hidden" name="typeDesc">
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-3">排序</label>
								<div class="col-md-9"><input type="text" name="sort" data-init="10" class="form-control input-xsmall digits"></div>
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
            <button type="button" class="btn btn-primary" data-submit="#system-dict-edit-form">提交</button>
         </div>
      </div>
</div>
</div>
</div>
<script type="text/javascript">
require(['app/common','app/datatables','app/form'],function(APP,DT,FORM){	
	$('table.datatable').initTable({
		"scrollY": "400px",
		"buttons":["excel","addRecord","saveRecord","deleteRecord"],
		"deleteRecord" : {"url" : 'system/dict/delete',"id" : 'id'},
		"addEditForm" : {
			"el" : "#system-dict-edit-form",
			"rules":{
				//joinField可以为数组或单值 为jquery选择器
				"name":{"checkExists":{stmid:'cn.bx.system.mapper.DictMapper.checkTypes',joinField:["select[name='type']"]},"messages":{"checkExists" : "已存在该名称"}},
				"value":{"checkExists":{stmid:'cn.bx.system.mapper.DictMapper.checkTypes',joinField:"select[name='type']"},"messages":{"checkExists" : "已存在该值"}}
			}
		}
	},function(dt){
		$("#system-dict-edit-form [name='type']").on('change',function(){
			$("#system-dict-edit-form [name='typeDesc']").val($("#system-dict-edit-form [name='type'] :selected").text());
		})
		
	});
})
</script>