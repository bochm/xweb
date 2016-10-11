/**
 * @fileOverview jquery.dataTables扩展
 * @author bx
 * @ignore
 */
define(["app/common","datatables","datatables/buttons/flash","datatables/buttons/print","datatables/select",
        "datatables/responsive","datatables/fixedHeader",
        "css!lib/jquery/datatables/dataTables.bootstrap.css"],function(APP,DataTable) {
	//-------------------默认参数初始化及修改----------------------------------
	
	//工具按钮设置
	var btn_opts = {
			"pdf": {"icon":"<i class='fa fa-file-pdf-o'></i> ","text":"导出PDF"},
			"copy":{"icon":"<i class='fa fa-copy'></i> ","text":"复制"},
			"excel":{"icon":"<i class='fa fa-file-excel-o'></i> ","text":"导出EXCEL"},
			"print":{"icon":"<i class='fa fa-print'></i> ","text":"打印"}
	}
	/**
     * 默认参数设置
     */
	var default_opts = {
			"dom": "<f><'dataTables_btn_toolbar'B><'table-scrollable'tr<'table-foot-bar' il<'flash_btns'>p>>",
			"oLanguage": {
				"sLengthMenu": "_MENU_/页",
				"sSearch":"<div class='input-icon input-icon-sm'><i class='iconfont icon-search'></i>_INPUT_</div>",
				"sInfo": " _START_-_END_ 共_TOTAL_条记录",
				"sLoadingRecords":"",
				"sProcessing":"<img src='"+APP.imgPath+"/load-tables.gif' />",
				"sInfoEmpty" : "0/0 共 0条记录",
				//"sInfoFiltered":"过滤前_MAX_ 条记录",
				"sInfoFiltered":"",
				"sZeroRecords":"没有数据",
				"sEmptyTable":"没有数据",
				"buttons":{
						"pdf":btn_opts.pdf.icon,
						"copy":btn_opts.copy.icon,
						"copyTitle":"复制到剪贴板",
						"copyInfo":{_: '以复制 %d 行到剪贴板',1: '复制 1 行到剪贴板'},
						"excel":btn_opts.excel.icon+btn_opts.excel.text,
						"print":btn_opts.print.icon
				},
				"oPaginate":{
					"sNext":">",
					"sPrevious":"<",
					"sFirst":"",
					"sLast":""
				}
			},
			renderer: 'bootstrap'
	};
	$.extend( true, DataTable.defaults,  default_opts);
	$.fn.dataTableExt.oStdClasses.sWrapper = $.fn.dataTableExt.oStdClasses.sWrapper + " dataTables_extended_wrapper";
    $.fn.dataTableExt.oStdClasses.sFilterInput = "form-control input-sm";
    //$.fn.dataTableExt.oStdClasses.sLengthSelect = "form-control input-xsmall input-sm input-inline";
    
    //responsive bootstrap扩展
    var _display = DataTable.Responsive.display;
    var _original = _display.modal;
    _display.modal = function ( options ) {
    	return function ( row, update, render ) {
    		if ( ! $.fn.modal ) {
    			_original( row, update, render );
    		}
    		else {
    			if ( ! update ) {
    				var modal = $(
    					'<div class="modal fade" role="dialog">'+
    						'<div class="modal-dialog" role="document">'+
    							'<div class="modal-content">'+
    								'<div class="modal-header">'+
    									'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
    								'</div>'+
    								'<div class="modal-body"/>'+
    							'</div>'+
    						'</div>'+
    					'</div>'
    				);

    				if ( options && options.header ) {
    					modal.find('div.modal-header')
    						.append( '<h4 class="modal-title">'+options.header( row )+'</h4>' );
    				}

    				modal.find( 'div.modal-body' ).append( render() );
    				modal
    					.appendTo( 'body' )
    					.modal();
    			}
    		}
    	};
    };
	/**
	 * @override
     * 表格log方法
     */

    DataTable.ext.sErrMode = function(settings, tn, msg){
    	APP.notice("表格错误信息",msg,'error');
	};
	/* Bootstrap paging button renderer */
	DataTable.ext.renderer.pageButton.bootstrap = function ( settings, host, idx, buttons, page, pages ) {
		var api     = new DataTable.Api( settings );
		var classes = settings.oClasses;
		var lang    = settings.oLanguage.oPaginate;
		var btnDisplay, btnClass;

		var attach = function( container, buttons ) {
			var i, ien, node, button;
			var clickHandler = function ( e ) {
				e.preventDefault();
				if ( !$(e.currentTarget).hasClass('disabled') ) {
					api.page( e.data.action ).draw( false );
				}
			};

			for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
				button = buttons[i];

				if ( $.isArray( button ) ) {
					attach( container, button );
				}
				else {
					btnDisplay = '';
					btnClass = '';

					switch ( button ) {
						case 'ellipsis':
							btnDisplay = '&hellip;';
							btnClass = 'disabled';
							break;

						case 'first':
							btnDisplay = lang.sFirst;
							btnClass = button + (page > 0 ?
								'' : ' disabled');
							break;

						case 'previous':
							btnDisplay = lang.sPrevious;
							btnClass = button + (page > 0 ?
								'' : ' disabled');
							break;

						case 'next':
							btnDisplay = lang.sNext;
							btnClass = button + (page < pages-1 ?
								'' : ' disabled');
							break;

						case 'last':
							btnDisplay = lang.sLast;
							btnClass = button + (page < pages-1 ?
								'' : ' disabled');
							break;

						default:
							btnDisplay = button + 1;
							btnClass = page === button ?
								'active' : '';
							break;
					}

					if ( btnDisplay ) {
						node = $('<li>', {
								'class': classes.sPageButton+' '+btnClass,
								'aria-controls': settings.sTableId,
								'tabindex': settings.iTabIndex,
								'id': idx === 0 && typeof button === 'string' ?
									settings.sTableId +'_'+ button :
									null
							} )
							.append( $('<a>', {
									'href': '#'
								} )
								.html( btnDisplay )
							)
							.appendTo( container );

						settings.oApi._fnBindAction(
							node, {action: button}, clickHandler
						);
					}
				}
			}
		};

		attach(
			$(host).empty().html('<ul class="pagination pagination-sm"/>').children('ul'),
			buttons
		);
	};
	//--------------------------------按钮设置--------------------------------
	/**
	 * @override
     * 设置Buttons默认属性
     */
	$.extend( true, DataTable.Buttons.defaults, {
		dom: {
			container: {
				className: 'dt-buttons btn-group'
			},
			button: {
				tag: 'a',
				className: 'btn btn-sm'
			},
			buttonLiner: {
				tag: '',
				className: ''
			},
			collection: {
				tag: "ul role='menu'",
				className: 'dt-button-collection dropdown-menu',
				button: {
					tag: 'li',
					className: 'dt-button'
				},
				buttonLiner: {
					tag: 'a',
					className: ''
				}
			}
		}
	} );
	/**
	 * @override
     * 重写信息输出方法
     */
	DataTable.Api.register( 'buttons.info()', function ( title, message, time ) {
		var that = this;
		APP.notice(title,message,'info');
		return this;
	} );
	
	
	$.fn.dataTable.Buttons.swfPath = APP.jsPath+'/lib/jquery/datatables/swf/flashExport.swf';
	
	/**
     * 表格默认新增修改方法
     */
	function _addEditRecord(dt, node,e,type){
		var _options = dt.init();
		if(typeof _options.addRecord === 'function' && type == 'add'){
			_options.addRecord(dt,node,e);
		}else if(typeof _options.saveRecord === 'function' && type == 'save'){
			_options.saveRecord(dt,node,e);
		}else if(!APP.isEmpty(_options.addModal) || !APP.isEmpty(_options.addEditModal)){
			var _modal = _options.addModal || _options.addEditModal;
			if(_modal.url){
				APP.showModal(_modal.url,_modal.id,_modal);
			}else{
				$(_modal).modal('show');
			}
		}else if(!APP.isEmpty(_options.addForm) || !APP.isEmpty(_options.addEditForm)){
			var _form = _options.addForm || _options.addEditForm;
			require(['app/form'],function(FORM){
				$(_form.el).initForm({
					formAction : type,clearForm : true,type : 'post',validate : _form.validate
				},function(data){
					if(type == 'add') dt.addRow(data);
					else dt.updateSelectedRow(data);
				});
			});
			$(_form).closest('.modal.fade').modal('show');
		}else{
			alert("请初始化表格参数中的addForm|addEditForm|addModal|addEditModal|addRecord|saveRecord选项");
		}
	}
	/**
     * 表格默认删除方法
     */
	function _deleteRecord(dt,node,e){
		if(dt.selectedCount() < 1){
			APP.info('请选择需要删除的记录');
			return;
		}
		var _options = dt.init();
		if(typeof _options.deleteRecord === 'function'){
			_options.deleteRecord(dt,node,e);
		}else if(!APP.isEmpty(_options.deleteRecord) && !APP.isEmpty(_options.deleteRecord.url)){
			APP.confirm('','是否删除选择的记录?',function(){
				var _id_column = _options.deleteRecord.id ? _options.deleteRecord.id : 'id';
				APP.postJson(_options.deleteRecord.url,dt.selectedColumn(_id_column),null,function(){
					dt.deleteSelectedRow();
					APP.success('删除成功');
				});
			})
		}else{
			alert("请初始化表格参数中的deleteRecord选项");
		}
	}
	/**
     * 自定义按钮--新增
     */
	$.fn.dataTable.ext.buttons.addRecord = {
		text: "<i class='fa fa-copy'></i> 新增",
		className: 'btn btn-sm btn-primary btn-addRecord',
		action: function ( e, dt, node, config ) {
			_addEditRecord(dt, node,e,'add');
		}
	};
	/**
     * 自定义按钮--修改
     */
	$.fn.dataTable.ext.buttons.saveRecord = {
		text: "<i class='fa fa-copy'></i> 修改",
		className: 'btn btn-sm btn-primary btn-saveRecord',
		action: function ( e, dt, node, config ) {
			if(dt.selectedCount() != 1){
				APP.info('请选择一条需要修改的记录');
				return;
			}
			_addEditRecord( dt, node,e,'save');
		}
	};
	/**
     * 自定义按钮--删除
     */
	$.fn.dataTable.ext.buttons.deleteRecord = {
		text: "<i class='fa fa-copy'></i> 删除",
		className: 'btn btn-sm btn-warning btn-deleteRecord',
		action: function ( e, dt, node, config ) {
			_deleteRecord(dt,node,e);
		}
	};
	DataTable.getTable = function(selector){
		return new $.fn.dataTable.Api(selector);
	}
	
	
	//------------------------------------------初始化---------------------------------------
	/**
    * 基础表格处理
    * @param  {Object} opts 初始化参数
    * @return {DataTable}
    **/
	$.fn.initTable = function (opts,callback) {
		var _table = $(this);
		var default_opt = $.extend(true,{
			"processing" : true,
			"serverSide" : false,
			"paging": false,
			"info": false,
			"lengthMenu": [[5,10, 25, 50, -1], [5,10, 25, 50, "全部"]],
			"pageLength": 10,
			"autoWidth": false,
			"scrollCollapse": true,
			"select": {style: 'os',info:false},
			"buttons": [],
			//"buttons":[{extend: 'collection',text: '导出', buttons : ['selectAll','selectNone','print']},"addRecord","deleteRecord"],
			"fnCreatedRow": function (nRow, aData, iDataIndex) {
	         }
		},opts);
		return _getDataTable(_table,default_opt,function(otable){
			//初始化表格工具栏 ，增加ID约束
			var tableid = _table.attr('id');
			var toolbar = $("div#"+tableid+"_wrapper>div.dataTables_btn_toolbar");
			var pageToolbar = $("#"+(default_opt.toolbar ? default_opt.toolbar : (tableid+"-toolbar")));
			
			pageToolbar.find('.btn[data-role]').each(function(){
				var _btn = $(this);
				var _btn_type = _btn.data('role');
				_btn.click(function(e){
					if(_btn_type == 'addRecord') _addEditRecord(otable, _btn.get(),e,'add');
					else if(_btn_type == 'saveRecord') _addEditRecord(otable, _btn.get(),e,'save');
					else if(_btn_type == 'deleteRecord') _deleteRecord(otable, _btn.get(),e);
				});
			});
			
			/*if(opts.exportBtns){
				var _export_btn_group = $("<div class='btn-group'>");
				var _export_btn_main = $("<button type='button' class='btn btn-sm btn-info'>测试</button>");
				_export_btn_main.click(function(){
					console.log(otable.button(2));
					otable.button(1).trigger();
				});
				_export_btn_group.append(_export_btn_main);
				if(opts.exportBtns.length > 1){
					_export_btn_group.append("<button type='button' class='btn btn-sm btn-info dropdown-toggle' data-toggle='dropdown'><i class='fa fa-angle-down'></i></button>");
					var __export_btn_dropdown = $("<ul class='dropdown-menu' role='menu'>");
					for(var i=0;i<opts.exportBtns.length;i++){
						var _export_btn_menu = $("<li>");
						_export_btn_menu.append(otable.button(i).node());
						__export_btn_dropdown.append(_export_btn_menu);
					}
					_export_btn_group.append(__export_btn_dropdown);
				}
				
				pageToolbar.prepend(_export_btn_group);
			}*/
			toolbar.append(pageToolbar);
			//修改删除按钮禁用约束
			var _save_btn = toolbar.find('.btn-saveRecord');
			var _delete_btn = toolbar.find('.btn-deleteRecord');
			APP.disableBtn(_save_btn);
			APP.disableBtn(_delete_btn);
			otable.on( 'draw.dt', function () {
				if(otable.selectedCount() == 0){
					APP.disableBtn(_save_btn);
					APP.disableBtn(_delete_btn);
				}
			});
			otable.on( 'select', function ( e, dt, type, indexes ) {
				if(type === 'row'){
					APP.enableBtn(_delete_btn);
					if(otable.selectedCount() == 1) APP.enableBtn(_save_btn);
					else APP.disableBtn(_save_btn);
				}
			});
			otable.on( 'deselect', function ( e, dt, type, indexes ) {
				if(type === 'row'){
					if(otable.selectedCount() == 1) APP.enableBtn(_save_btn);
					else if(otable.selectedCount() > 1) {
						APP.disableBtn(_save_btn);
						APP.enableBtn(_delete_btn);
					}else{
						APP.disableBtn(_save_btn);
						APP.disableBtn(_delete_btn);
					}
				}
			});
			
			//按钮使用文字标识，暂时不使用title
			/*$('a.buttons-copy.buttons-flash').attr("title","复制");
			$('a.buttons-excel.buttons-flash').attr("title","导出为Excel");
			$('a.buttons-pdf.buttons-flash').attr("title","导出为Pdf");
			$('a.buttons-print').attr("title","打印");*/
			/*$(window).resize(function(){
				otable.draw(false);
			});*/
			if(callback && typeof callback == "function")callback(otable);
		});
	};
	/**
	* 表格初始化
	* @param  {Arrays} opts 初始化参数,兼容多表格的数组形式[{},{}]
	**/
	function _getDataTable($table,default_opt,callback){
		
		
		if(APP.isMobile)  default_opt.buttons = [];
		
		default_opt.dataUrl = $table.data('url');
		default_opt.serverSide = ($table.data('server-side') != undefined && $table.data('server-side') == "true");
		
		var ajax_params = {};
		if(default_opt.params) ajax_params = default_opt.params;//页面定义Ajax请求参数
		
		if(default_opt.dataUrl != undefined){
			var columnArray = (default_opt.columns ? default_opt.columns : new Array());
			$table.find('th[data-column]').each(function(){
				columnArray.push({'data' : $(this).data('column')});
			});
			default_opt['columns'] = columnArray;
			//启用data-server-side时表格,不启用搜索框,适合于数据量较大，需要物理分页	
			if(default_opt.serverSide){ 
				default_opt.ajax = {
					"url" : default_opt.dataUrl,
					"data": function ( d ) {
						if(d.order && d.order.length === 1){
							ajax_params.orderBy = columnArray[d.order[0].column].data + " " + d.order[0].dir;
						}
						ajax_params.pageNO = d.start/d.length+1;
						ajax_params.pageSize = d.length < 0 ? 0 : d.length;
						ajax_params.tableDraw = d.draw;
						return ajax_params;
					},
					"dataSrc":function (json) {
						json.recordsFiltered = json.recordsTotal;
						return json.data;
					}
				}
				default_opt["searching"] = false;
				callback($table.DataTable(default_opt));
			}
			//先从服务器加载数据，然后再绘制表格
			else{
				APP.blockUI({'target':$table.get(),'gif':'load-tables'});
				APP.postJson(default_opt.dataUrl,ajax_params,true,function(ret,status){
					default_opt.data = ret;
					APP.unblockUI($table.get());
					callback($table.DataTable(default_opt));
				});
			}
		}else{
			callback($table.DataTable(default_opt));
		}

	}
	
	
	
	//-----------------------------------自定义方法---------------------------------
	/**
     * 获取选择行数据
     */
	DataTable.Api.register( 'selectedRows()', function () {
		return this.rows('.selected').data();
	} );
	
	/**
     * 获取选择行的指定列数据 col列名
     */
	DataTable.Api.register( 'selectedColumn()', function (col) {
		var selectedRows = this.rows('.selected');
		var a = [];
		for(var i = 0;i<selectedRows.count();i++){
			a.push(selectedRows.data()[i][col]);
		}
		return a;
	} );
	
	/**
     * 增加一行数据
     */
	DataTable.Api.register( 'addRow()', function (row) {
		return this.row.add(row).draw();
	} );
	
	/**
     * 修改已选择行数据
     */
	DataTable.Api.register( 'updateSelectedRow()', function (row) {
		return this.row(this.rows('.selected')[0]).data(row);
	} );
	/**
     * 删除已选择行数据
     */
	DataTable.Api.register( 'deleteSelectedRow()', function () {
		return this.rows('.selected').remove().draw();
	} );
	
	/**
     * 已选总行数
     */
	DataTable.Api.register( 'selectedCount()', function () {
		return this.rows('.selected').count();
	} );
	return DataTable;
});