<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="loading-page">
<span id="table-system-user-list-toolbar">
<a class="btn btn-sm btn-primary btn-saveRecord" id="system-user-list-edit-btn">修改用户</a>
<a class="btn btn-sm btn-warning btn-deleteRecord" data-role="deleteRecord">删除用户</a>
</span>
<table id="table-system-user-list" class="table datatable table-bordered nowrap"  data-url="system/user" 
	data-paging="true" data-info="true" data-ordering="true">
		<thead><tr>
			<th data-visible='false' data-column="id">id</th>
			<th  data-column=loginName >登录账号</th>
			<th  data-column="name" >姓名</th>
			<th  data-column="no">工号</th>
			<th data-column="email" >email</th>
			<th  data-column="company.name" >公司</th>
			<th  data-column="remarks" >备注</th>
		</tr></thead>
		<tbody>
		</tbody>
</table>	

<!-- 新增修改 -->
<div class="modal fade" id="system-user-list-edit" tabindex="-1" role="dialog" data-backdrop="static">
<div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">用户维护</h4>
         </div>
         <div class="modal-body">
            <form class="form-horizontal" action="system/user/add.json" role="form" id="system-user-edit-form" >
            	<input type="hidden" name="id">
            	<div class="form-body">
            		<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-4">姓名</label>
								<div class="col-md-8">
								<div class="input-icon right"> <i class="fa validate-icon"></i><input type="text" name="name" class="form-control required"></div>
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-5">登录账号</label>
								<div class="col-md-7">
								<div class="input-icon right"> <i class="fa validate-icon"></i><input type="text" name="loginName" 
									class="form-control required" id="system-user-loginName"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-4">登录密码<span class="required">*</span></label>
								<div class="col-md-8"><input type="password" name="password" maxlength="50" minlength="3" id="sys-user-password" class="form-control required"></div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-5">确认密码</label>
								<div class="col-md-7"><input type="password" equalTo="#sys-user-password" maxlength="50" minlength="3" name="password_confirm" 
								class="form-control" data-msg="请输入相同的密码"></div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-4">公司</label>
								<div class="col-md-8">
									<input name="company.name" type="hidden">
									<div class="input-icon left"> <i class="fa validate-icon"></i>
									<select name="company.id" form-role='select' data-stmid='cn.bx.system.mapper.OrgMapper.queryOrgByType' 
									class="form-control required selectOpt" data-init="-1"/>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-5">部门</label>
								<div class="col-md-7">
									<div class="input-icon left"> <i class="fa validate-icon"></i>
									<select name="dept.id" form-role='select' data-stmid='cn.bx.system.mapper.OrgMapper.queryOrgByType' 
									data-parent-for="select[name='company.id']" class="form-control required selectOpt"/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-4">email</label>
								<div class="col-md-8">
									<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-envelope"></i></span>
										<input type="text" name="email" class="form-control email">
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-5">工号</label>
								<div class="col-md-7"><input type="text" name="no" class="form-control"></div>
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
								<label class="control-label col-md-5">手机</label>

								<div class="col-md-7"><input type="text" name="mobile" class="form-control digits"></div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-4">状态</label>
								<div class="col-md-8">
								<input type="checkbox" name="status"  checked class="bs-switch form-control" data-dict-type="on_off">
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-md-5">是否可登录</label>
								<div class="col-md-7">
								<input type="checkbox" name="loginFlag"  checked class="bs-switch form-control">
								</div>
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
            <button type="button" class="btn btn-primary" data-submit="#system-user-edit-form">提交</button>
         </div>
      </div>
</div>
</div>
</div>
<script type="text/javascript">
require(['module/system/user'],function(user){
	user.init({'pcompany':1});
})
</script>