<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="alert alert-block alert-success">
	<h5>闪动提示控件.定义class=pulsate div</h5>
	<div class="pulsate" pulsate-color="#007AFF" style="padding:5px;">重复闪动</div>
	<div class="space20"></div>
	<pre class="prettyprint">调用方法:APP.initPulsate('.container');<br>div定义:class="pulsate" pulsate-color="#007AFF" pulsate-hover</pre>
</div>
<script type="text/javascript">
require(['app/common'],function(APP){
	$("pre").addClass("prettyprint");
    prettyPrint();
})
</script>