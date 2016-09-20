<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="${resourcePath}/lib/google-code-prettify/prettify.css" />
<script type="text/javascript" src="${resourcePath}/lib/google-code-prettify/prettify.js"></script>

<div class="row">
		<div class="col-md-6">
			<!-- start: Simple Table -->
			<div class="portlet box blue-steel" panel-title="简单表格-服务器端" 
				panel-icon="fa fa-briefcase" data-url="${ctx}/pages/datatables/tables/simple-tables-server">
				<div class="actions">
					<div class="btn-group">
					<a class="btn btn-sm btn-default dropdown-toggle" href="#" data-toggle="dropdown" data-hover="dropdown">样式<i class="fa fa-angle-down"></i></a>
					<div class="dropdown-menu dropdown-checkboxes hold-on-click pull-right">
						<div class="x-check check-primary">
							<input type="checkbox" id="chk_datatables_basetable_paging" name="chk_datatables_basetable"><label for="chk_datatables_basetable_paging">分页</label>
							<input type="checkbox" id="chk_datatables_basetable_info" name="chk_datatables_basetable"><label for="chk_datatables_basetable_info">表格信息</label>
							<input type="checkbox" id="chk_datatables_basetable_autowidth" name="chk_datatables_basetable"><label for="chk_datatables_basetable_autowidth">自动宽度</label>
							<input type="checkbox" id="chk_datatables_basetable_ordering" name="chk_datatables_basetable"><label for="chk_datatables_basetable_ordering">排序</label>
						</div>
						
					</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<div class="portlet box blue-steel" panel-title="简单表格-客户端" panel-tools="expand,fullscreen,reload" 
				 panel-icon="fa fa-briefcase" data-url="${ctx}/pages/datatables/tables/simple-tables-local"/>
		</div>
</div>
<script type="text/javascript">
require(['app/common'],function(APP){
	$(':checkbox[name=chk_datatables_basetable]').click(function(){
		APP.loadPortlet($(this).parents('.portlet:first'));
	})
})
</script>