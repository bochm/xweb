<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="loading-page">
<span id="table-system-org-list-toolbar"></span>
<table id="table-system-org-list" class="table datatable table-bordered nowrap"  data-url="system/org"></table>	
</div>
<script type="text/javascript">
require(['app/common','app/treetable'],function(APP,DT){
	alert(APP.ctx);
	var columns = [
		{ "data": "id","visible" : false},
		{ "data": "parentId","visible" : false},
		{ "data": "name","title":"组织名称"},
		{ "data": "type","title":"类型","dictType" :"sys_org_type"},
		{ "data": "addr","title":"地址"},
		{ "data": "master.name","title":"地址"},
		{ "data": "master.id","visible" : false},
		{ "data": "status","title":"状态","dictType" :"on_off"},
		{ "data": "sort","title":"排序"}
	];
	$('table.datatable').treetable({
		"tid":"id","tpid":"parentId","expandable": true,"expandBtn" : true,"columns": columns,
		"buttons" : ['addRecord','saveRecord','deleteRecord'],
		"addEditModal" : {"url" : "pages/system/org/org-edit","id":"system-org-edit"},
		"deleteRecord" : function(dt,node,e){
			APP.confirm('','是否删除选择的组织及包含的所有子组织?',function(){
				APP.postJson("system/org/delete",dt.selectedColumn("id"),null,function(ret,status){
					if(ret.OK){
						dt.deleteSelectedRow();
						APP.success(ret[APP.MSG]);
					}else{
						APP.error(ret[APP.MSG]);
					}
				});
			})
			
		}
	});
})
</script>