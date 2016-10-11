
define('app/form',["app/common","moment","jquery/validate","jquery/form"],function(APP) {
	var FORM = {
			initDatePicker : function(ct){
	        	APP.queryContainer(ct).find('[form-role="date"]').each(function(){
	        		$(this).datePicker();
	        	});
	        }
	};
	/**
	 * 将form格式化为json
	 * @param  {Object} form form对象
	 * @return {Object} json对象
	 */
	FORM.formToJson = function(form){
		var serializeObj={};  
        var array=form.serializeArray();
        $(array).each(function(){  
            if(serializeObj[this.name]){  
                if($.isArray(serializeObj[this.name])){  
                    serializeObj[this.name].push(this.value);  
                }else{  
                    serializeObj[this.name]=[serializeObj[this.name],this.value];  
                }  
            }else{  
                serializeObj[this.name]=this.value;   
            }  
        });  
        return serializeObj;  
	};
	//--------------------------------------datePicker------------------------------
	/**
	 * 日期 bootstrap datePicker
	 * @param  {Object} opts  设置参数
	 * @param  {Function} callback  日期变化时调用的函数
	 */
	$.fn.datePicker = function(opts,callback){
		var _target = $(this);
		require(['bootstrap/datepicker'],function(){
			var default_opt = $.extend(true,{
				language:'zh-CN',autoclose: true,todayHighlight:true,format:'yyyy-mm-dd'
			},opts);
			var _event_type = "changeDate";
			if(default_opt.viewType == "year"){
				default_opt.startView = 2;
				default_opt.minViewMode = 2;
				_event_type="changeYear";
			}else if(default_opt.viewType == "month"){
				default_opt.startView = 1;
				default_opt.minViewMode = 1;
				_event_type="changeMonth";
			}
			_target.datepicker(default_opt);
			var _default_date = default_opt.defaultDate ? default_opt.defaultDate : APP.formatDate('YYYY-MM-DD');
			_target.datepicker('update',APP.formatDate(default_opt.format.toUpperCase(),_default_date));
			_target.data('date-value',APP.formatDate('YYYY-MM-DD',_default_date));
			_target.datepicker().on(_event_type,function(e){
				if(_target.data('date-value') != APP.formatDate('YYYY-MM-DD',e.date)){
					_target.data('date-value',APP.formatDate('YYYY-MM-DD',e.date));
					if(typeof callback === 'function') callback(APP.formatDate('YYYY-MM-DD',e.date));
				}
			})
    	});
	};
	
	/**
	 * 日期区间 bootstrap dateRangePicker
	 * @param  {Object} opts  设置参数
	 * @param  {Function} callback  设置后调用的函数
	 */
	$.fn.dateRangePicker = function(opts,callback){
		var _target = $(this);
		require(['bootstrap/daterangepicker'],function(){
			var default_opt = $.extend(true,{
				opens: (APP.isRTL ? 'left' : 'right'),
				startDate: moment().subtract('days', 29).format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD'),
                minDate: '2012-01-01',
                maxDate: moment().format('YYYY-MM-DD'),
                dateLimit: {days: 365},
                showDropdowns: true,
                showWeekNumbers: true,
                timePicker: false,
                timePickerIncrement: 1,
                timePicker12Hour: true,
                /*ranges: {
                    '今天': [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                    '昨天': [moment().subtract('days', 1).format('YYYY-MM-DD'), moment().subtract('days', 1).format('YYYY-MM-DD')],
                    '近7天': [moment().subtract('days', 6).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                    '近30天': [moment().subtract('days', 29).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                    '本月': [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],
                    '上月': [moment().subtract('month', 1).startOf('month').format('YYYY-MM-DD'), moment().subtract('month', 1).endOf('month').format('YYYY-MM-DD')]
                },*/
                buttonClasses: ['btn'],
                applyClass: 'green',
                cancelClass: 'default',
                format: 'YYYY-MM-DD',
                separator: ' 到 ',
                locale: {
                    "applyLabel": '确定',
                    "cancelLabel": '取消',
                    "fromLabel": '从',
                    "toLabel": '到',
                    "customRangeLabel": '日期区间选择',
                    "daysOfWeek": ["日","一","二","三","四","五","六"],
			        "monthNames": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
                    "firstDay": 1
                }                
			},opts);
			_target.daterangepicker(default_opt,function(start, end, label){
				if(typeof callback === 'function'){
					callback(start, end, label);
	        	}else{
	        		_target.children('span').html(start.format('YYYY年MM月DD日') + ' - ' + end.format('YYYY年MM月DD日'));
	        		//$(target+' span')
	        	}
			});
			_target.children('span').html(moment().subtract('days', 29).format('YYYY年MM月DD日') + ' - ' + moment().format('YYYY年MM月DD日'));
			//$(target+' span').html(moment().subtract('days', 29).format('YYYY年MM月DD日') + ' - ' + moment().format('YYYY年MM月DD日'));
			
		})
	};
	
	
	
	//--------------------------form  validate------------------------------
	//jquery.validate默认设置
	var validate_default_settings = {
		errorElement: 'span',
		errorClass: 'help-block help-block-error',
		focusInvalid: true,
		onkeyup: false,
		errorPlacement: function (error, element) {
			/*if(element.siblings("span.input-group-addon").size() > 0){//treeselect控件验证时隐藏错误span
				error.addClass('hide');
			}*/
			if (element.parent(".input-group").size() > 0) {//带图标的输入框
                error.insertAfter(element.parent(".input-group"));
            } else if (element.attr("data-error-container")) { //指定container存放错误
                error.appendTo(element.attr("data-error-container"));
            } else if (element.parents('.radio-list').size() > 0) { //radio 
                error.appendTo(element.parents('.radio-list').attr("data-error-container"));
            } else if (element.parents('.radio-inline').size() > 0) { 
                error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
            } else if (element.parents('.checkbox-list').size() > 0) {
                error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
            } else if (element.parents('.checkbox-inline').size() > 0) { 
                error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
            } else if(element.siblings("i.validate-icon").size() > 0){//图标方式提示错误
            	var icon = element.siblings("i.validate-icon");
                icon.removeClass('fa-check').addClass("fa-warning");  
                icon.attr("data-original-title", error.text()).tooltip();
            }else {
                error.insertAfter(element);
            }
		},
		invalidHandler: function (event, validator) {
		},
		highlight: function (element) {
			$(element).closest('.form-group').removeClass("has-success").addClass('has-error');
		},
		success: function (label,element) {
			if($(element).siblings("i.validate-icon").size() > 0){//图标方式提示错误
				var icon = $(element).siblings("i.validate-icon");
	            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
	            icon.removeClass("fa-warning").addClass("fa-check");
	            icon.removeAttr("data-original-title");
            }else {
            	label.closest('.form-group').removeClass('has-error');
            }
		}
	};
	
	
	
	//jquery.validate增加select2验证方法
	$.validator.addMethod("selectOpt", function(value, element) {   
		return this.optional(element) || (value != "-1");
	}, "请选择");
	
	$.validator.addMethod("checkExists", function(value, element,p) {   
		if(APP.isEmpty(value)) return true;
		if(APP.isEmpty(p)){
			alert('请设置字段校验参数');
			return false;
		}
		if(APP.isEmpty(p.url) && APP.isEmpty(p.stmID)){
			alert('请设置字段校验参数中的url或者stmID');
			return false;
		}
		var paramData;
		if(!APP.isEmpty(p.url)) {
			paramData = p.data;
			paramData.value = value;
			return APP.postJson(p.url,paramData,false);
		}else {
			paramData = {param : p.data};
			paramData.stmID = p.stmID;
			paramData.param.value = value;
			return APP.isEmpty(APP.postJson(APP.ctx+'/app/common/selectMapByStmID',paramData,false));
		}
		
	}, "已存在");
	
	/**
	 * 初始化form
	 * @param  {Object} opts 初始化参数
	 * @param  {Function} callback 成功回调函数
	 * @param  {Function} errorback 失败回调函数
	 */
	$.fn.initForm = function (opts,callback,errorback) {
		var _this = $(this);
		_this.clearForm(true);
		if(APP.isEmpty(opts)) opts = {};
		if(APP.isEmpty(opts.fieldOpts)) opts.fieldOpts = {};//fieldOpts表单元素的初始化参数
		var validate_settings = $.extend(true,validate_default_settings,opts.validate);
		_this.validate(validate_settings);
		var isInitValue = (opts.formData != undefined);
		var formField;
		_this.find(opts.fieldSelector ? opts.fieldSelector : '*[name]').each(function(){
			formField = $(this);
			var _fieldName = formField.attr('name');
			if(isInitValue){
				if(opts.formData[this.name]){
					if(this.type == 'checkbox'){
						formField.attr('checked',opts.formData[this.name] == (formField.data('on-value') ? formField.data('on-value') : '1'));
					}else{
						formField.val(opts.formData[this.name]);
					}
				}
			}
			if(formField.attr('form-role') == 'select'){
				var _selectOpt = opts.fieldOpts[_fieldName] || {};
				try{
					if(formField.attr('placeholder') && !isInitValue) _selectOpt.placeholder = JSON.parse(formField.attr('placeholder'));
				}catch(e){alert("placeholder属性值必须为json字符串");}
				if(formField.data('json')) _selectOpt.jsonData = formField.data('json');
				if(formField.data('stmid')) _selectOpt.stmID = formField.data('stmid');
				formField.select(_selectOpt);
			}
			if(formField.attr('form-role') == 'treeSelect'){
				var _treeSelectOpt = opts.fieldOpts[_fieldName] || {};
				if(formField.data('stmid')) _treeSelectOpt.stmID = formField.data('stmid');
				if(!formField.data('treeid')){
					alert("请指定表单元素的data-treeid属性");
					return;
				}
				require(['app/tree'],function(){
					formField.treeSelect(_treeSelectOpt,formField.data('treeid'));
				});
			}
		});
		var _in_modal = (_this.parents('.modal-dialog').size() > 0) ? '.modal-dialog' : '';
		//提交是初始化bean的提交类型  add save delete  对应BaseBean 的form_action属性
		if(opts.formAction){
			if(_this.children(":hidden[name='form_action']").size()>0){
				_this.children(":hidden[name='form_action']").val(opts.formAction);
			}else{
				_this.append("<input type='hidden' name='form_action' value='"+opts.formAction+"'>");
			}
		}
		
		var form_opt = $.extend(true,{
			ajax:true,
			beforeSubmit : function(formData, jqForm, options){
				APP.blockUI({target:_in_modal ? '.modal-dialog' : 'body',message:'提交中',gif : 'form-submit'});
				return true;
			},
			dataType : 'json',
			error:function(error){
				if(APP.debug)console.log(error);
				APP.unblockUI(_in_modal ? '.modal-dialog' : 'body');
				APP.notice('',"系统错误 错误代码:"+error.status+" 错误名称:"+error.statusText,'error',_in_modal);
				if(typeof errorback === 'function')errorback(error);
			},
			success:function(response, status){
				if(APP.debug)console.log(response);
				APP.unblockUI(_in_modal ? '.modal-dialog' : 'body');
				if(response.OK){
					APP.notice('',response[APP.MSG],'success',_in_modal);
					if(typeof callback === 'function')callback(response[APP.DATA]);
				}else{
					APP.notice('',response[APP.MSG],'warning',_in_modal);
					if(typeof errorback === 'function')errorback(response,status);
				}
			}
		},opts);
		if(form_opt.ajax) _this.ajaxForm(form_opt);
	}
	
	
	/**
	 * form表单提交
	 * @param  {String} url form提交url
	 * @param  {Function} callback 回调函数
	 */
	$.fn.postForm = function(url,callback){
		var _form = $(this);
		if(_form.is('form')){
			$.ajax({ 
		        type:"POST", 
		        url:url, 
		        dataType:"json",      
		        contentType:"application/json",               
		        data:JSON.stringify(FORM.formToJson(_form)), 
		        success:function(ret,status){
		        	callback(result,status);
		        },
		        error:function(xhr){
		        	APP.notice('系统错误','错误代码['+xhr.status+'] 错误名称['+xhr.statusText+']','error');
		        }
			});
		}else
			alert("对象不是表单");
		  
	};
	
	
	//------------------------下拉列表----------------------
	//初始化下拉列表语言
	var select2_language =  {
		errorLoading: function () {return '无法载入结果。';},
		inputTooLong: function (args) {
			var overChars = args.input.length - args.maximum;
		    var message = '请删除' + overChars + '个字符';
		    return message;
		},
		inputTooShort: function (args) {
			var remainingChars = args.minimum - args.input.length;
		    var message = '请再输入至少' + remainingChars + '个字符';
		    return message;
		},
		loadingMore: function () {return '载入更多结果…';},
		maximumSelected: function (args) {
			var message = '最多只能选择' + args.maximum + '个项目';
		      return message;
		},
		noResults: function () {return '未找到结果';},
		searching: function () {return '搜索中…'; }
	};
	//select2下拉列表默认设置
	var select2_default_opts = {
		language: select2_language,
		placeholder: {id:"-1",text:"请选择..."},
		maximumSelectionLength: 50, //多选最多选择个数
		allowClear:false,//自动显示清除按钮
		width:"100%" 
	};
	
	/**
	 * select2下拉列表
	 * @param  {Object} opts select2参数,自定义参数如下
	 * jsonData[服务器或静态json文件(static/src/jsons/下)的url] 
	 * stmID[sqlMap语句ID] 
	 * url[服务器url实时获取数据(搜索框实时发送请求)]
	 * 
	 * @return {Object} select控件
	 */
	$.fn.select = function ( opts ) {
		var _select = $(this);
		if(opts){
			if((opts.jsonData||opts.stmID) && opts.data === undefined){//增加jsonData选项获取静态.json文件或者直接通过sqlMapper的sqlID获取数组数据
				var url = APP.ctx+"app/common/selectArrayByStmID";
				var type = "POST";
				if(opts.jsonData && opts.jsonData != ""){
					url = opts.jsonData;
					type = "GET";
				}
				var paramData = {};
				if(opts.stmID) paramData.stmID=opts.stmID;
				if(opts.param) paramData.param=opts.param;
				//同步方式防止数据量大是无法加载
				APP.ajax(url,paramData,type,false,function(ret){
					opts.data = ret;
				});
			}else if(opts.url && opts.ajax === undefined){//默认ajax方法
				opts.ajax = {
					delay: 250,
					url : opts.url,
					data: function (params) {
					    var queryParameters = {
					      q: params.term
					    }
					    return queryParameters;
					}
				};
			}
		}
		require(['jquery/select2'],function(){
			var default_opt = $.extend(true,select2_default_opts,opts);
			_select.select2(default_opt);
			if(_select.attr("value"))_select.val(_select.attr("value")).trigger("change");
			_select.on("select2:select", function (e) { 
				if(_select.val() != '-1' && _select.val() != ''){
					_select.closest('.form-group').removeClass('has-error');
					_select.siblings("span#"+_select.attr("id")+"-error").remove();
					_select.siblings("i.validate-icon").removeClass("fa-check fa-warning").removeAttr("data-original-title");
				}
			});
		});
		
		return _select;
	};
	
	return FORM;
});

