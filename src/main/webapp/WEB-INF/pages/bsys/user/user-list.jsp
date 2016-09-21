<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp" %>
<div class="table-scrollable">
<span id="table-bsys-user-list-toolbar">
<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#bsys-user-list-edit">新增用户</button>
<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#bsys-user-list-edit">修改用户</button>
</span>
<table id="table-bsys-user-list" class="table datatable table-bordered nowrap"  data-url="${ctx}/bsys/user" 
	data-paging="true" data-info="true" data-ordering="true">
		<thead><tr>
			<th  data-column=loginName >登录账号</th>
			<th  data-column="name" >姓名</th>
			<th  data-column="no">工号</th>
			<th data-column="email" >email</th>
			<th  data-column="userType" >用户类型</th>
			<th  data-column="remarks" >备注</th>
		</tr></thead>
		<tbody>
		</tbody>
</table>	
</div>
<!-- 新增修改 -->
<div class="modal fade" id="bsys-user-list-edit" tabindex="-1" role="dialog" data-backdrop="static">
<div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">用户维护</h4>
         </div>
         <div class="modal-body">
            <form class="form-horizontal" action="${ctx}/bsys/user/add" role="form" id="bsys-user-edit-form">
            	<input type="hidden" name="id">
            	<div class="form-body">
            		<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-4">登录账号</label>
								<div class="col-md-8">
								<div class="input-icon right"> <i class="fa validate-icon"></i><input type="text" name="loginName" class="form-control required"></div>
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-3">姓名</label>
								<div class="col-md-9">
								<div class="input-icon right"> <i class="fa validate-icon"></i><input type="text" name="name" class="form-control required"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-4">登录密码<span class="required">*</span></label>
								<div class="col-md-8"><input type="password" name="password" maxlength="20" minlength="3" id="sys-user-password" class="form-control required"></div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-4">确认密码</label>
								<div class="col-md-8"><input type="password" equalTo="#sys-user-password" maxlength="20" minlength="3" name="password_confirm" class="form-control"></div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-4">工号</label>
								<div class="col-md-8"><input type="text" name="no" class="form-control"></div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-3">email</label>
								<div class="col-md-9">
									<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-envelope"></i></span>
										<input type="text" name="email" class="form-control email">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-4">电话</label>
								<div class="col-md-8"><input type="text" name="tel" class="form-control"></div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-3">手机</label>

								<div class="col-md-9"><input type="text" name="mobile" class="form-control digits"></div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="form-group">
								<label class="control-label col-md-2">备注</label>
								<div class="col-md-10"><input type="text" name="remarks" class="form-control"></div>
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
<script type="text/javascript">
require(['app/common','app/datatables','app/form'],function(APP,FORM){
	$('table.datatable').initTable({
		params : {'pcompany':1}
	},function(otable){
		console.log(otable);
	});
	
	$('#bsys-user-edit-form').initForm({
		success : function(response, status){
			alert(response);
		}
	});

	$('.modal-footer .btn-primary').on('click',function(){
		$('#bsys-user-edit-form').submit();
	});
})
</script>