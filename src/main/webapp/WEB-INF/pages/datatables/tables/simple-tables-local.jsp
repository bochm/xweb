<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="alert alert-block alert-success">通过表格data-server-side属性定义是否进行服务器端分页及排序 ,由于模糊参数消耗性能，暂时没有表格search控件</div>
<div class="table-scrollable">
<span id="datatables-simple-table-local_btn_toolbar">
<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#demo_datatable_modal_edit" data-remote="${ctx}/pages/content/demo/datatableEdit?name=1122">按钮</button>
</span>
<table id="datatables-simple-table-local" class="table datatable table-bordered nowrap" data-url="${ctx}/demo/table/simple/queryResource.json" data-paging="true" data-info="true" data-ordering="true">
		<thead><tr>
			<th class="center" data-column="name" width="30%">预警地市</th>
			<th class="center" data-column="type" width="20%">预警时间</th>
			<th class="center" data-column="parent_id" width="20%" data-orderable="false" >预警原因</th>
			<th class="center" data-column="permission" width="20%">预警品牌数</th>
			<th class="right" data-column="url" width="10%">状态</th>
		</tr></thead>
		<tbody>
		</tbody>
</table>	
</div>	

<script type="text/javascript">
require(['app/datatables'],function(DataTable){
	$('#datatables-simple-table-local').initTable({
		"buttons": ['copyFlash','excelFlash','print']
	});
})
</script>