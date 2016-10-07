<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp" %>
<div class="loading-page">
<span id="table-bsys-menu-list-toolbar"></span>
<table id="table-bsys-menu-list" class="table datatable table-bordered nowrap"  data-url="${ctx}/bsys/menu">
	<thead>
		<tr><th></th><th>菜单代码</th><th>图标</th><th>模块链接</th><th>状态</th><th>排序</th></tr>
	</thead>
	<tbody>
	</tbody>
</table>	
</div>
<script type="text/javascript">
require(['app/common','app/treetable'],function(APP,DT){
	var columns = [	{ "data": "name" ,"title":"菜单名称","orderable": false,"defaultContent": ""},
					{ "data": "icon" },
					{ "data": "target" },
					{ "data": "status" },
					{ "data": "sort" }];
	var columnDefs = [	{"targets": 1,"render": function ( data, type, row ) {return "<i class='"+data+"'></i>";}},
						{"targets": 3,"render": function ( data, type, row ) {return data == "1" ? "启用" : "停用";}}]
	$('table.datatable').treetable({
		"tid":"id","tpid":"parent_id",
		"expandable": true,"expandBtn" : true,
		"columns": columns,"columnDefs": columnDefs,
		"buttons" : ['addRecord'],
		"addModal" : {"url" : "${ctx}/pages/bsys/menu/menu-edit?act=add","id":"bsys-menu-edit"}
	});
})
</script>