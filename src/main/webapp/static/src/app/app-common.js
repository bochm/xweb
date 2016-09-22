define('app/common',['bootstrap','moment'],function() {
	
	var brandColors = {
			'blue': '#89C4F4',
	        'red': '#F3565D',
	        'green': '#1bbc9b',
	        'purple': '#9b59b6',
	        'grey': '#95a5a6',
	        'yellow': '#F8CB00'
	};
	//模态窗口中 select2失去焦点问题
	$.fn.modal.Constructor.prototype.enforceFocus = function() {};
	//设置moment本地化
	var moment = require('moment');
	moment.locale("zh-cn");
	
	//客户端设备处理,device.js,去除blackberry、fxos、meego 检测
	var device = {};
	var _userAgent = window.navigator.userAgent.toLowerCase();
	function _findDevice(needle) {
		return _userAgent.indexOf(needle) !== -1;
	};
	device.ios = function () {return device.iphone() || device.ipod() || device.ipad();};
	device.iphone = function () {return !device.windows() && _findDevice('iphone');};
	device.ipod = function () {return _findDevice('ipod');};
	device.ipad = function () {return _findDevice('ipad');};
	device.android = function () {return !device.windows() && _findDevice('android');};
	device.androidPhone = function () {return device.android() && _findDevice('mobile');};
	device.androidTablet = function () {return device.android() && !_findDevice('mobile');};
	device.windows = function () {return _findDevice('windows');};
	device.windowsPhone = function () {return device.windows() && _findDevice('phone');};
	device.windowsTablet = function () {return device.windows() && (_findDevice('touch') && !device.windowsPhone());};

    //部分常量(DATA、MSG等)必须和AppConstants类中定义的一致(取消调用/app/common/constrants获取常量的方式)

	if(! ('APP' in window) ){
		window['APP'] = {
			"isIE8" : false,
			"isIE9" : false,
			"isIE10": false,
			"isRTL" : false,
			"DATA" : "data",//ajax返回json数据对象{"data":[{},{}]}
			"MSG" : "message",
			"STATUS" : "status",
			"OK" : "seccuss",
			"FAIL" : "fail",
			"ERROR" : "error",
			"WORN" : "warning",
			"EXCEPTION" : "exception",
			"ctx" : _ctx,
			"debug" : _is_debug,
			"device" : device,
			"isMobile" :  (device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone()),
			"isTablet" : (device.ipad() || device.androidTablet() || device.windowsTablet()),
			getParameterByName : function(name) {
		        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		            results = regex.exec(location.search);
		        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		    },
	        
	        getURLParameter: function(paramName) {
	            var searchString = window.location.search.substring(1),
	                i, val, params = searchString.split("&");
	            for (i = 0; i < params.length; i++) {
	                val = params[i].split("=");
	                if (val[0] == paramName) {
	                    return unescape(val[1]);
	                }
	            }
	            return null;
	        },
	        
	        getViewPort: function() {
	            var e = window,
	                a = 'inner';
	            if (!('innerWidth' in window)) {
	                a = 'client';
	                e = document.documentElement || document.body;
	            }

	            return {
	                width: e[a + 'Width'],
	                height: e[a + 'Height']
	            };
	        },
	        
	        getUniqueID: function(prefix) {
	            return 'webapp_' + Math.floor(Math.random() * (new Date()).getTime());
	        },
	        isEmpty : function(v){
	        	return v === undefined || v === null || v ==='';
	        },
	        jsPath:_app_js_base_url,
	        
	        imgPath:_app_img_base_url,
	        
	        queryContainer : _queryContainer,
	        /**
			 *moment日期格式化,也可以直接在程序中使用var moment = require('moment');
			 * @param  {String} patterm 转换日期格式 YYYYMMDD HH:mm:SS,更多格式http://momentjs.cn/docs/#/parsing/string-format/
			 * @param  {Date/String} d 需要转换的日期或字符串
			 * @param  {String} d_patterm 需要转换的字符串格式
			 */
	        formatDate : function(patterm,d,d_patterm){
	        	if(this.isEmpty(d))
	        		return moment().format(patterm);
	        	else if(this.isEmpty(d_patterm))
	        		return moment(d).format(patterm);
	        	else
	        		return moment(d,d_patterm).format(patterm);
	        },
	        /**
			 * json数据提交,服务器端接收JSON格式的对象
			 * @param  {String} url 提交url
			 * @param  {Boolean} isSync 是否同步
			 * @param  {Function} callback 成功回调函数
			 * @param  {Function} errorback 失败回调函数
			 */
			postJson : function(url,data,isSync,callback,errorback){
				var async = true;
				if(isSync != undefined || isSync != null) async = isSync;
				$.ajax({ 
				        type:"POST", 
				        //url:_ctx+url, 
				        url: (url.indexOf("?") >0) ? (url.split("?")[0]+".json?" + url.split("?")[1]) : url+".json", 
				        contentType : 'application/json;charset=utf-8',             
				        data: JSON.stringify(data),
				        async:async,
				        success:function(ret,status){
				        	if(typeof callback === 'function'){
				        		callback(ret,status);
				        	}else{
				        		return ret;
				        	}
				        },
				        error:function(xhr){
				        	if(typeof errorback === 'function'){
				        		errorback(xhr.status,xhr.statusText);
				        	}else{
				        		_sysError('系统错误,错误代码['+xhr.status+'] 错误名称['+xhr.statusText+']');
				        		APP.unblockUI();
				        		return xhr;
				        	}
				        }
				});
				  
			},
			getJsonData : function(url,data){
				var _data;
				this.postJson(url,data,false,function(ret){
					_data = ret;
				});
				return _data;
			},
			loadPage : function(target,url,data,callback,errorback){
				if(url){
					APP.blockUI({target:target,message:'页面加载中',});
					$.ajax({
			            type: "GET",
			            cache: false,
			            url: url,
			            data: data,
			            dataType: "html",
			            success: function(res) {
			            	APP.unblockUI(target);
			            	$(target).html(res);
			            	if(typeof callback === 'function'){
			            		callback(res);
			            	}else{
			            		APP.initComponents(target);
			            	}
			            },
			            error: function(xhr, ajaxOptions, thrownError) {
			            	if(typeof errorback === 'function'){
				        		errorback(xhr.status,xhr.statusText);
			            	}else{
			            		APP.unblockUI(target);
				            	_sysError("页面加载错误:状态["+xhr.status+"]错误["+xhr.statusText+"]");
			            	}
			            	
			            }
			        });
				}
			},
			getResponsiveBreakpoint: function(size) {
	            // bootstrap 响应尺寸
	            var sizes = {
	                'xs' : 480, 
	                'sm' : 768,
	                'md' : 900, 
	                'lg' : 1200 
	            };
	            return sizes[size] ? sizes[size] : 0; 
	        },
	        //获取常用颜色
	        getColor: function(name) {
	            if (brandColors[name]) {
	                return brandColors[name];
	            } else {
	                return '';
	            }
	        },
	        //滚动条定位
	        scrollTo: function(el, offeset) {
	            var pos = (el && el.size() > 0) ? el.offset().top : 0;
	            if(el) {
	                if ($('body').hasClass('page-header-fixed')) {
	                    pos = pos - $('.page-header').height();
	                }
	                pos = pos + (offeset ? offeset : -1 * el.height());
	            }
	            $('html,body').animate({
	                scrollTop: pos
	            }, 'slow');
	        },
	        initScroll: function(el,ct) {
	        	require(['jquery/scrollbar'],function(){
	        		_queryContainer(ct).find(el).each(function() {
		                if ($(this).attr("data-scrolled")) return;
		                $(this).slimScroll({
		                    allowPageScroll: true,
		                    size: '7px',
		                    color: ($(this).attr("data-scroll-color") ? $(this).attr("data-scroll-color") : '#bbb'),
		                    wrapperClass: ($(this).attr("data-scroll-wrapper") ? $(this).attr("data-scroll-wrapper") : 'slimScrollDiv'),
		                    railColor: ($(this).attr("data-scroll-railcolor") ? $(this).attr("data-scroll-railcolor") : '#eaeaea'),
		                    position: APP.isRTL ? 'left' : 'right',
		                    height: ($(this).attr("data-scroll-height") ? $(this).attr("data-scroll-height") : $(this).css('height')),
		                    alwaysVisible: ($(this).attr("data-scroll-alwaysvisible") == "1" ? true : false),
		                    railVisible: ($(this).attr("data-scroll-railvisible") == "1" ? true : false),
		                    disableFadeOut: true
		                });
		                $(this).attr("data-scrolled", "1");
		            });
	        	});
	            
	        },

	        destroyScroll: function(el) {
	        	require(['jquery/scrollbar'],function(){
	        		$(el).each(function() {
		                if ($(this).attr("data-scrolled") === "1") {
		                    $(this).removeAttr("data-scrolled");
		                    $(this).removeAttr("style");
		                    $(this).slimScroll({
		                        wrapperClass: ($(this).attr("data-scroll-wrapper") ? $(this).attr("data-scroll-wrapper") : 'slimScrollDiv'),
		                        destroy: true
		                    });
		                }
		            });
	        	});
	        },
	        //tab控件
	        initTab : function(ct,reload,defaultIdx){
	        	var _tab_toggle = _queryContainer(ct).find('a[data-toggle="tab"]');
	        	_tab_toggle.attr('data-show','0');
	        	_tab_toggle.parent('li').removeClass("active");
	        	
	        	_tab_toggle.on('show.bs.tab', function (e) {
	    	    	var _target = $(e.target);
	    	    	if(APP.isEmpty(_target.attr('data-url'))){
	    	    		return;
	    	    	}
	    	    	if(_target.attr('data-show') === '1') return;//只加载一次
	    	    	APP.loadPage($(_target.attr('href')),_target.attr('data-url'));
	    	    	if(reload) _target.attr('data-show','0');
	    	    	else _target.attr('data-show','1');
	    	    });
	        	var _default_idx = (defaultIdx !== undefined) ? defaultIdx : 0;
	        	
	        	if(!APP.isEmpty(_tab_toggle.eq(_default_idx).attr('data-url'))){
	        		_tab_toggle.eq(_default_idx).tab('show');
	        	}
	        },
	        //tooltip控件
	        initTooltip : function(ct){
	        	_queryContainer(ct).find('.tooltips').tooltip();
	        },
	        //popover控件
	        initPopover : function(ct){
	        	_queryContainer(ct).find('.popovers').popover();
	        },
	        //闪动提示
	        initPulsate : function(ct){
	        	require(['jquery/pulsate'],function(){
	        		_queryContainer(ct).find('div.pulsate').each(function(){
	        			var _this = $(this);
	        			_this.pulsate({
	                        color: _this.attr('pulsate-color') ?  _this.attr('pulsate-color') : '#C43C35',
	                        reach: 20,
	                        speed: 1000,
	                        pause: 0,
	                        glow: true,
	                        repeat: true,
	                        onHover: _this.attr('pulsate-hover')
	                    });
	        		});
	        	});
	        },
	        
	        //初始化控件
	        initComponents: function(target){
	        	this.initTab(target,false);
	        	this.initPopover(target);
	        	this.initTooltip(target);
	        	this.initPulsate(target);
	        	APP.initPortletPanel(target);
	        	APP.initDropdowns(target);
	        	APP.initScroll('.scroller',target);
	        }
		};
	}
	/**
	 * 查找dom
	 * @param  {Object} ct 需要查找的dom
	 */
	function _queryContainer(ct){
		if(APP.isEmpty(ct)) return $('body');
		if($(ct).length > 0) return $(ct);
		return $('body');
	}
	 /**
	 * 提示错误信息
	 * @param  {String} msg 错误信息
	 */
	function _sysError(msg){
		APP.notice("系统错误",msg,"error");
	}
	
	APP.loadPortlet = function(_portlet){
		var body = _portlet.children('div.portlet-body');
		if (_portlet.attr('data-url')) {
			APP.loadPage(body,_portlet.attr('data-url'));
        }
	}
	APP.setPortletTitle = function(_portlet,title){
		_portlet.find('span.caption-subject').html(title);
	}
	APP.removePortlet = function(_portlet){
		var body = _portlet.children('div.portlet-body');
		if ($('body').hasClass('page-portlet-fullscreen')) {
            $('body').removeClass('page-portlet-fullscreen');
        }
		_portlet.remove();
	}
    //Portlet工具栏
	function _handlePortlet(_portlet){
		var head = _portlet.children('div.portlet-title');
		var body = _portlet.children('div.portlet-body');
		//收起展开
		head.on('click','a.expand',function(e){
			e.preventDefault();
			if ($(this).hasClass("cls")) {
                $(this).removeClass("cls");
                body.slideDown(200);
            } else {
                $(this).addClass("cls");
                body.slideUp(200);
            }
		});
		//最大化
		head.on('click','a.fullscreen',function(e){
			e.preventDefault();
            if (_portlet.hasClass('portlet-fullscreen')) {
                $(this).removeClass('on');
                _portlet.removeClass('portlet-fullscreen');
                $('body').removeClass('page-portlet-fullscreen');
                _portlet.children('.portlet-body').css('height', 'auto');
                $(this).siblings('a.expand,close').removeClass('hide');
            } else {
                var height = APP.getViewPort().height -
                _portlet.children('.portlet-title').outerHeight() -
                    parseInt(_portlet.children('.portlet-body').css('padding-top')) -
                    parseInt(_portlet.children('.portlet-body').css('padding-bottom'));

                $(this).addClass('on');
                _portlet.addClass('portlet-fullscreen');
                $('body').addClass('page-portlet-fullscreen');
                _portlet.children('.portlet-body').css('height', height);
                $(this).siblings('a.expand,close').addClass('hide');
            }
		});
		//刷新
		head.on('click','a.reload',function(e){
			e.preventDefault();
			APP.loadPortlet(_portlet);
		});
		//删除
		head.on('click','a.remove',function(e){
			e.preventDefault();
			APP.removePortlet(_portlet);
		});
	}
	APP.initPortletPanel = function(ct){
		_queryContainer(ct).find(' div.portlet').each(function(){
			var _portlet = $(this);
			var _data_url = _portlet.attr('data-url');
			if(!APP.isEmpty(_data_url)){
				var _head = $("<div class='portlet-title'>");
				
				_head.append("<div class='caption'><i class='"+(_portlet.attr('panel-icon') ? _portlet.attr('panel-icon') : "fa fa-external-link")+"'></i>" + "<span class='caption-subject bold uppercase'>" + (_portlet.attr('panel-title') ? _portlet.attr('panel-title') : "") + "</span></div>");
				var _tools = _portlet.attr('panel-tools');
				
				if(_tools){
					var _headtools = $("<div class='tools'>");
					var toolList = _tools.split(",");
					for(var i=0;i<toolList.length;i++){
						_headtools.append("<a class='"+toolList[i]+"' href='#'></a>");
					}
					_head.append(_headtools);
				}else if(_portlet.children('div.actions').length > 0){
					_head.append(_portlet.children('div.actions'));
				}
				_portlet.append(_head);
				var _body = $("<div class='portlet-body'>");
				if(_portlet.attr('data-scroll-height')){
					var _scroller = $("<div class='scroller' data-scroll-height="+_portlet.attr('data-scroll-height')+" data-always-visible='1' data-rail-visible='0'>");
					APP.loadPage(_scroller,_data_url);
					APP.initScroll(_scroller.get());
					_body.append(_scroller);
				}else{
					APP.loadPage(_body,_data_url);
				}
				_portlet.append(_body);
			}
			_handlePortlet(_portlet);
			
		});
	}
    
    APP.initDropdowns = function (ct) {
        _queryContainer(ct).find('.dropdown-menu.hold-on-click').on('click',function(e){
        	
        	var _this = $(this);
        	if(_this.hasClass('dropdown-checkboxes')){
        		var _checkbox = $(e.target).prev('[type=checkbox]');
        		if(_checkbox && _checkbox.length == 1){
        			_checkbox.get().checked = !_checkbox.get().checked;
        		}
        	}
        	e.stopPropagation();
        	
        });
    }
    
    /**
	 * jquery 遮罩插件
	 * @param  {Object} options target:目标
	 */
	APP.blockUI = function(options) {
    	require(['jquery/blockui'],function(){
    		options = $.extend(true, {}, options);
            var html = "<img src='"+APP.imgPath+"/"+(options.gif ? options.gif :"loading")+".gif' /> "+(options.message ? options.message : "加载中"); 

            if (options.target) {
                var el = $(options.target);
                if (el.height() <= ($(window).height())) {
                    options.cenrerY = true;
                }
                el.block({
                    message: html,
                    baseZ: options.zIndex ? options.zIndex : 1000,
                    centerY: options.cenrerY !== undefined ? options.cenrerY : false,
                    css: {
                        top: '10%',
                        border: '0',
                        padding: '0',
                        backgroundColor: 'none'
                    },
                    overlayCSS: {
                        backgroundColor: options.overlayColor ? options.overlayColor : '#555',
                        opacity: options.boxed ? 0.05 : 0.1,
                        cursor: 'wait'
                    }
                });
            } else {
                $.blockUI({
                    message: html,
                    baseZ: options.zIndex ? options.zIndex : 1000,
                    css: {
                        border: '0',
                        padding: '0',
                        backgroundColor: 'none'
                    },
                    overlayCSS: {
                        backgroundColor: options.overlayColor ? options.overlayColor : '#555',
                        opacity: options.boxed ? 0.05 : 0.1,
                        cursor: 'wait'
                    }
                });
            }
    	})
        
    }
    APP.unblockUI = function(target) {
    	require(['jquery/blockui'],function(){
	        if (target) {
	            $(target).unblock({
	                onUnblock: function() {
	                    $(target).css('position', '');
	                    $(target).css('zoom', '');
	                }
	            });
	        } else {
	            $.unblockUI();
	        }
    	})
    }
    
    /**
	 * 显示通知 jquery.gritter调用
	 * @param  {String} title 通知抬头
	 * @param  {String} text  通知主体
	 * @param  {String} type  通知类型 error|warning|info|light default:info 
	 * @param  {String} ele  显示位置 调用alertS
	 */
	APP.notice = function(title,text,type,ele){
		if(!APP.isEmpty(ele)){
			APP.alertS(title,text,type,ele);
		}else{
			require(['jquery/gritter'],function(){
				$.gritter.add({
					title: title,
					text: text,
					sticky: (type === 'error'),
					time: '3000',
					class_name: 'gritter-'+((type && type != undefined) ? type : 'info')
				});
			})
		}
		
	};

	/**
	 * 显示通知 自定义显示位置，默认使用在body中
	 * @param  {String} title 提示标题
	 * @param  {String} message 提示内容
	 * @param  {String} type  通知类型 error|warning|info|success default:info 
	 * @param  {String} ele  显示位置
	 */
	APP.alertS = function(title,message,type,ele){
		var default_options = {
			ele: ele ? ele : "body",
			type: type ? type : "info",
			offset: {from: "top",amount: 20},
			align: "center",
			width: 250,
			delay: 4000,
			allow_dismiss: true,
			stackup_spacing: 10
		};
		var $alert, css, offsetAmount;
	    $alert = $("<div>");
	    $alert.attr("class", "app-noticeS alert alert-block");
	    if (default_options.type) {
	    	$alert.addClass("alert-" + (default_options.type == 'error' ? 'danger' : default_options.type));
	    }
	    if (default_options.allow_dismiss) {
	    	$alert.addClass("alert-dismissible");
	    	$alert.append("<button type='button' class='close' data-dismiss='alert'></button>");
	    }
	    if(!APP.isEmpty(title))$alert.append("<h4 class='alert-heading>"+title+"</h4>");
	    $alert.append("<p>"+message+"</p>");
	    if (default_options.top_offset) {
	    	default_options.offset = {
	        from: "top",
	        amount: default_options.top_offset
	      };
	    }
	    offsetAmount = default_options.offset.amount;
	    $(".app-noticeS").each(function() {
	    	return offsetAmount = Math.max(offsetAmount, parseInt($(this).css(default_options.offset.from)) + $(this).outerHeight() + default_options.stackup_spacing);
	    });
	    css = {
	    	"position": (default_options.ele === "body" ? "fixed" : "absolute"),
	    	"margin": 0,
	    	"z-index": "9999",
	    	"display": "none"
	    };
	    css[default_options.offset.from] = offsetAmount + "px";
	    $alert.css(css);
	    if (default_options.width !== "auto") {
	    	$alert.css("width", default_options.width + "px");
	    }
	    $(default_options.ele).append($alert);
	    switch (default_options.align) {
	      case "center":
	    	  $alert.css({"left": "50%", "margin-left": "-" + ($alert.outerWidth() / 2) + "px" });
	    	  break;
	      case "left":
	    	  $alert.css("left", "20px");
	    	  break;
	      default:
	    	  $alert.css("right", "20px");
	    }
	    $alert.show();
	    $alert.fadeIn();
	    if (default_options.delay > 0) {
	    	$alert.delay(default_options.delay).fadeOut(function() {
	    		return $(this).alert("close");
	    	});
	    }
	    return $alert;
	};
	
	/**
	 * 显示模态窗口
	 * @param  {String} src modal请求url
	 * @param  {String} mid modal显示div的id,参数不为空则src页面必须为<div class='modal fade'>下的页面
	 * @param  {opts} mid为空时指定标题,传递参数
	 */
	APP.showModal = function(src,mid,opts){
		require(['bootstrap'],function(){
			$.ajax({
	            type: "GET",
	            cache: false,
	            url: src,
	            data:opts.param,
	            dataType: "html",
	            success: function(html) {
	            	if(mid){
		            	$('#'+mid).remove();
		            	$('body').append(html);
						$('#'+mid).modal('show');
	            	}else{
	            		var _modal = $("<div class='modal fade' tabindex='-1' data-focus-on='input:first' role='dialog' data-backdrop='static'></div>");
	            		var _modal_width = opts.width ? "style='width:"+opts.width+"px;'" : "";
	            		var _modal_dialog = $("<div class='modal-dialog' "+_modal_width+"></div>");
	            		var _modal_context = $("<div class='modal-content'></div>");
	            		_modal_context.append("<div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-hidden='true'></button>"+
	            				"<h4 class='modal-title'>"+opts.title+"</h4></div>");
	            		var _modal_body = $("<div class='modal-body'></div>");
	            		_modal_body.html(html);
	            		_modal_context.append(_modal_body);
	            		_modal_dialog.append(_modal_context);
	            		_modal.append(_modal_dialog);
	            		_modal.modal('show');
	            		_modal.on('hide.bs.modal', function () {
	            			_modal.remove();
	            		 });
	            	}
	            },
	            error: function(xhr, ajaxOptions, thrownError) {
	            	_sysError("页面加载错误:状态["+xhr.status+"]错误["+xhr.statusText+"]");
	            }
	        });
		})
	};
	
	/**
	 * 加载模态窗口，src页面为非modal页面是使用，暂时不支持显示页脚按钮
	 * @param  {String} src modal请求url
	 * @param  {opts} 标题和参数
	 */
	APP.loadModal = function(src,opts){
		APP.showModal(src,null,opts);
	};
	/**
	 * sweet-alert插件封装，简单的alert
	 * @param  {String} title 标题
	 * @param  {String} text 内容
	 * @param  {String} type error', 'warning', 'info', 'success
	 */
	APP.alert = function(title,text,type){
		require(['sweetalert'],function(){
			swal(title, APP.isEmpty(text) ? '' : text, APP.isEmpty(type) ? 'success' : type);
		});
	};
	/**
	 * 工具按钮提示 bootstrap.popover调用
	 * @param  {Object} pobj  需要弹出提示的对象 
	 * @param  {String} content  提示内容
	 * @param  {String} type  显示类型 error|warning|info|success default:info 
	 * @param  {String} icon  title图标
	 * @param  {String} title  title内容
	 * @param  {String} placement  显示的位置 top|bottom|left|right|auto  默认left
	 */
	APP.popover = function(pobj,content,type,icon,title,placement){
		require(['bootstrap'],function(){
			var _type = ((type && type != undefined) ? type : 'info');
			var _icon = ((icon && icon != undefined) ? icon : 'fa-info-circle');
			var _title = ((title && title != undefined) ? title : '提示消息');
			var _placement = ((placement && placement != undefined) ? placement : 'auto left');
			pobj.addClass('tooltip-'+_type);
			pobj.popover({
				html: true,
				trigger: 'manual',
				title: "<i class='fa "+_icon+"'/> "+_title,
				container: $(this).attr('id'),
				content: content,
				placement: _placement
			}).on("mouseleave", function () {
		        var _this = this;
		        setTimeout(function () {
		            if (!$(".popover:hover").length) {
		                $(_this).popover("hide")
		            }
		        }, 100);
		    });
			pobj.popover("show");
			pobj.siblings(".popover").on("mouseleave", function () {
				pobj.popover('hide');
	        });
		})
	};
	
	/**
	 * 轮播 jquery owlCarousel,items里面如有事件绑定需要在参数中的回调事件中绑定
	 * @param  {Object} target  需要显示轮播插件的对象
	 * @param  {Object} opts  设置参数
	 */
	APP.carousel = function(target,opts){
		require(['jquery/carousel'],function(){
			var default_opt = $.extend(true,{
				loop:true,
				margin:5
			},opts);
			var _target = $(target);
			_target.owlCarousel(default_opt);
			_target.on('mouseover',function(e){
				_target.trigger('stop.owl.autoplay');
			});
			_target.on('mouseleave',function(e){
				_target.trigger('play.owl.autoplay');
			});
		});
	};
	return APP;
});

