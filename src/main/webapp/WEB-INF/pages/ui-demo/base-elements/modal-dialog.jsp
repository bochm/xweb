<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<h5>点击按钮弹出对话框.</h5>
					<div class="alert alert-block alert-success">窗口定义直接写在页面，使用bootstrap方式定义
						<a data-toggle="modal" class="btn btn-primary" role="button" href="#myModal1">简单模态窗口</a><hr>
						<pre class="prettyprint">按钮定义:data-toggle="modal" href="#myModal1"</pre>
					</div>
					<div class="alert alert-block alert-success">窗口定义直接写在页面，使用bootstrap方式定义
						<a class="btn btn-primary" id="ui_demo_elements_remotemodal_btn" role="button">AJAX方式显示页面</a><hr>
						<pre class="prettyprint">APP.showModal('${ctx}/pages/ui-demo/remote-modal?title=sssss&content=测订单','ui_demo_elements_remotemodal');</pre>
					</div>
					<!--start Modal -->
					<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-hidden="true">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
									<h4 class="modal-title">测试标题</h4>
								</div>
								<div class="modal-body"><p>测试内桶...</p></div>
								<div class="modal-footer">
									<button aria-hidden="true" data-dismiss="modal" class="btn btn-default">关闭</button>
									<button class="btn btn-default">保存</button>
								</div>
							</div>
						</div>
					</div>
<script type="text/javascript">
require(['app/common'],function(APP){
	$('#ui_demo_elements_remotemodal_btn').on('click',function(){
		APP.showModal('${ctx}/pages/ui-demo/base-elements/remote-modal?title=sssss&content=测订单','ui_demo_elements_remotemodal');
	});
	$("pre").addClass("prettyprint");
    prettyPrint();
})
</script>