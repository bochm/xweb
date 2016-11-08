<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp" %>
<div class="loading-page">
<span id="table-bsys-menu-list-toolbar"></span>
<table id="table-bsys-menu-list" class="table datatable table-bordered nowrap"  data-url="${ctx}/bsys/menu"></table>	
</div>
<script type="text/javascript">
require(['app/common','app/treetable'],function(APP,DT){
	var columns = [
		{ "data": "id","visible" : false},
		{ "data": "parentId","visible" : false},
		{ "data": "name","title":"菜单名称"},
		{ "data": "icon","title":"图标"},
		{ "data": "target","title":"链接"},
		{ "data": "status","title":"状态"},
		{ "data": "sort","title":"排序号"}
	];
	var columnDefs = [	{"targets": 2,
		"render": function ( data, type, row ) {
			if(row.type == '1'){ //0:模块 1:功能
				return "<i class='fa fa-pencil-square-o'></i> "+data;
			}else{
				if(row.target == '#') return "<i class='fa fa-cog'></i> "+data;
				else return "<i class='fa fa-link'></i> "+data;
			}
		}},
	    {"targets": 3,"render": function ( data, type, row ) {
	    	return "<i class='"+data+"'></i>";
	    }},
		{"targets": 5,"render": function ( data, type, row ) {
			return data == "1" ? "启用" : "停用";
		}}]
	$('table.datatable').treetable({
		"tid":"id","tpid":"parentId",
		"expandable": true,"expandBtn" : true,
		"columns": columns,"columnDefs": columnDefs,
		"buttons" : ['addRecord','saveRecord','deleteRecord'],
		"addEditModal" : {"url" : "${ctx}/pages/bsys/menu/menu-edit","id":"bsys-menu-edit"},
		"deleteRecord" : function(dt,node,e){
			APP.confirm('','是否删除选择的菜单及包含的所有子菜单?',function(){
				APP.postJson("${ctx}/bsys/menu/delete",dt.selectedColumn("id"),null,function(ret,status){
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