<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="table-scrollable">
<table id="datatables-simple-table" class="table datatable responsive table-bordered" cellspacing="0" data-url="${ctx}/demo/table/simple/queryResource.json">
		<thead><tr>
			<th class="center" data-column="name" >预警地市</th>
			<th class="center" data-column="type" >预警时间</th>
			<th class="center" data-column="parent_id" data-orderable="false" >预警原因</th>
			<th class="center" data-column="permission" width="30%">预警品牌数</th>
			<th class="center" data-column="url" width="30%">状态</th>
		</tr></thead>
		<tbody>
		</tbody>
</table>	
</div>	
<script type="text/javascript">
require(['app/common','app/datatables'],function(APP){
	$('table.datatable').each(function(){
			var $table = $(this);
			if($table.attr('data-url')){
				var columnArray = new Array();
				$table.find('th[data-column]').each(function(){
					columnArray.push({'data' : $(this).attr('data-column')});
				});
				$table.BasicDataTable({
					"url" : $table.attr('data-url'),
					"param" : {'COMPANYID':200},
					"paging": true,
					"columns": columnArray
				});
			}
	});
})
</script>