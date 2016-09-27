require.config({
	//不使用baseUrl，默认为main.js所在路径
    //baseUrl: ctx+'/static/resources/js',//r.js编译不通过
	/*echarts调试使用
	  packages: [ 
	           {
	               name: 'echarts',
	               location: 'lib/echarts',
	               main: 'echarts'
	           },
	           {
	               name: 'zrender',
	               location: 'lib/echarts/zrender', // zrender与echarts在同一级目录
	               main: 'zrender'
	           }
	],*/
	paths:{
		'app/index':'app/app-index',
		'app/common':'app/app-common',
		'app/form':'app/app-form',
		'app/datatables':'app/app-datatables',
		'bootstrap':'lib/bootstrap/bootstrap',
		'bootstrap/daterangepicker':'lib/bootstrap/daterangepicker/daterangepicker',
		'bootstrap/datepicker':'lib/bootstrap/datepicker/bootstrap-datepicker',
		'sweetalert':'lib/bootstrap/sweetalert/sweet-alert',
		'moment':'lib/utils/moment',
		'jquery/migrate':'lib/jquery/jquery-migrate-min',//jquery版本迁移插件
		'jquery/scrolltotop':'lib/jquery/scrolltotop',//返回顶部
		'jquery/scrollbar':'lib/jquery/scrollbar/jquery.slimscroll',
		'jquery/blockui':'lib/jquery/blockui/jquery.blockUI',
		'jquery/gritter':'lib/jquery/gritter/jquery.gritter', //弹出提示
		'jquery/pulsate':'lib/jquery/pulsate/jquery.pulsate', //突出闪动
		'jquery/carousel':'lib/jquery/carousel/owl.carousel',//滚动轮播
		'jquery/form':'lib/jquery/form/jquery.form',//ajax form
		'jquery/validate':'lib/jquery/validate/jquery.validate',//验证
		'jquery/select2':'lib/jquery/select2/select2.full',//下拉列表
		'datatables':'lib/jquery/datatables/jquery.dataTables',
		'datatables/buttons':'lib/jquery/datatables/dataTables.buttons',
		'datatables/buttons/flash':'lib/jquery/datatables/buttons.flash',
		'datatables/buttons/print':'lib/jquery/datatables/buttons.print',
		'datatables/select':'lib/jquery/datatables/dataTables.select',
		'datatables/responsive':'lib/jquery/datatables/dataTables.responsive',
		'datatables/fixedHeader':'lib/jquery/datatables/dataTables.fixedHeader',

		'echarts':'lib/echarts/echarts'
	},
	map: {
        '*': {'css': 'css-builder'}//css加载css-builder。js
    },
	shim:{
		'jquery/gritter':['css!lib/jquery/gritter/jquery.gritter.css'],
		'jquery/carousel':['css!lib/jquery/carousel/owl.carousel.css'],
		'jquery/select2':['css!lib/jquery/select2/select2.css'],
		'bootstrap/daterangepicker':['bootstrap','moment','css!lib/bootstrap/daterangepicker/daterangepicker.css'],
		'bootstrap/datepicker':['bootstrap','css!lib/bootstrap/datepicker/bootstrap-datepicker3.css'],
		'sweetalert':['css!lib/bootstrap/sweetalert/sweet-alert.css']
    }
});

//$("body").append("<div  id=\"pageLoadTop\" style=\"width:100%;height:100%;left:0;top:0;position:absolute;z-index:20000;background:#000000 url('"+_app_img_base_url+"/logo.png') no-repeat center;\"></div>");

define(['app/index','jquery/scrolltotop',
        'css!app/main.css',
        'css!app/main-layout.css',
        'css!app/main-component.css',
        'css!app/main-themes-default.css'],function(APP){
	/*setTimeout(function(){
		$('#pageLoadTop').fadeOut(1000,function(){
			$(this).remove();
		});
	},500);*/
	return APP;
});
