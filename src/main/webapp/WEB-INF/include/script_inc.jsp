<script type="text/javascript">
var _is_debug = ("${app:getConfig('isDebug')}" === "true");

var require = {
	    waitSeconds: 15,
	    urlArgs : _is_debug ? "t="+new Date().getTime() : "v="+"${app:getConfig('jsVersion')}"
};
var _ctx = "${ctx}/";
var _app_js_base_url = "${resourcePath}";//datatable引用的swf路径
var _app_img_base_url = "${resourcePath}/images";//图片路径
</script>
<!-- IE6-8 HTML5   css media  JSON 支持    -->
<!--[if lt IE 9]>
<script src="${resourcePath}/lib/ie-need/html5shiv.js"></script>
<script src="${resourcePath}/lib/ie-need/respond.min.js"></script>
<script src="${resourcePath}/lib/ie-need/json2.js"></script>
<![endif]-->
<!-- jquery版本区别加载    -->
<!--[if !IE]> -->
<script type="text/javascript">
window.jQuery || document.write("<script type='text/javascript' src='${resourcePath}/lib/jquery/jquery-2.2.0.min.js'>"+"<"+"/script>");
</script>
<!-- <![endif]-->
<!--[if IE]>
<script type="text/javascript">
 window.jQuery || document.write("<script type='text/javascript' src='${resourcePath}/lib/jquery/jquery-1.12.0.min.js'>"+"<"+"/script>");
</script>
<![endif]-->
<script type="text/javascript" data-main="${resourcePath}/main" src="${resourcePath}/require.js"></script>