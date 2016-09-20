<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="alert alert-block alert-success">
	内容提示直接使用在标签中增加data-original-title属性为需要提示的内容，比如:<a data-original-title="Default tooltip" class="tooltips" href="#">测试</a>
	<br内容提示位置增加data-placement="top/left/right/bottom"，比如:<br>
	<p>
	<button data-original-title="顶部Tooltip" data-placement="top" class="btn tooltips"> 顶部</button> 
	<button data-original-title="左边Tooltip" data-placement="left" class="btn tooltips"> 左边</button> 
	<button data-original-title="右边Tooltip" data-placement="right" class="btn tooltips"> 右边</button> 
	<button data-original-title="底部Tooltip" data-placement="bottom" class="btn tooltips"> 底部</button></p><hr>
	<pre class="prettyprint">调用方法:APP.initTooltip('.contaner');</pre>
</div>
<div class="alert alert-block alert-success">
	bootstrap中的Popover插件,增加data-content、trigger、delay等属性,如：
	<a data-original-title="测试 标题" data-content="测试内容!" class="popovers" href="javascript:;">点击</a>或者
	<a data-original-title="测试aaa" data-content="阿森大厦大苏打撒!" data-trigger="hover" class="popovers" href="javascript:;">鼠标停留</a>
	<p>
	<button data-original-title="顶部Popover" data-content="测试内容!" data-placement="top" class="btn popovers"> 顶部</button> 
	<button data-original-title="左边Popover" data-content="测试内容!" data-placement="left" class="btn popovers"> 左边</button> 
	<button data-original-title="右边Popover" data-content="测试内容!" data-placement="right" class="btn popovers"> 右边</button> 
	<button data-original-title="底部Popover" data-content="测试内容!" data-placement="bottom" class="btn popovers"> 底部</button></p><hr>
	<pre class="prettyprint">调用方法:APP.initPopover('.contaner');</pre>
</div>
<div class="alert alert-block alert-success">
	bootstrap中的Popover插件补充,增加自定义属性,直接调用,如：
	<button id="ui_demo_elements_popover_btn"  class="btn"> 顶部</button> <hr>
	<pre class="prettyprint">调用方法:APP.popover($(this),"asdasd");</pre>
	
</div>
<script type="text/javascript">
require(['app/common'],function(APP){
	$('#ui_demo_elements_popover_btn').on('click',function(){
		APP.popover($(this),"asdasd");
	});
	$("pre").addClass("prettyprint");
    prettyPrint();
})
</script>