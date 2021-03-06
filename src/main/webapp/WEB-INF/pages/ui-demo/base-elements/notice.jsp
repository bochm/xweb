<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<h4>点击按钮弹出通知.</h4>
					<ul class="list-unstyled">
						<div class="alert alert-block alert-success">在一定量的时间后淡出，可以为每个通知设定.默认3秒钟。
							<a class="btn btn-teal" id="notice-add-regular" href="#">定时通知</a><hr>
							<pre class="prettyprint">APP.notice('测试','测试信息&lt;br&gt;sssss');</pre>
						</div>
						<div class="alert alert-block alert-success">不会自动退出，需要手工点击关闭,错误类型的通知
							<a class="btn btn-teal" id="notice-add-sticky" href="#">错误通知</a><hr>
							<pre class="prettyprint">APP.notice('错误测试','测试信息&lt;br&gt;ssssssss','error');</pre>
						</div>
					</ul>
<script type="text/javascript">
require(['app/common'],function(APP){
	$('#notice-add-regular').on('click',function(){
		APP.notice('测试','测试信息<br>sssss');
	});
	$('#notice-add-sticky').on('click',function(){
		APP.notice('错误测试','测试信息<br>ssssssss','error');
	});
	$("pre").addClass("prettyprint");
    prettyPrint();
})
</script>