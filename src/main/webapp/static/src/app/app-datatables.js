/**
 * @fileOverview jquery.dataTables扩展
 * @author bx
 * @ignore
 */
define(["app/common","datatables","datatables/buttons/flash","datatables/buttons/print","datatables/select",
        "datatables/responsive","datatables/fixedHeader",
        "css!lib/jquery/datatables/dataTables.bootstrap.css"],function(APP,DataTable) {
	/**
     * 默认参数设置
     */
	var default_opts = {
			"dom": "<f><'dataTables_btn_toolbar'><'table-scrollable'tr<'table-foot-bar' ilp>>",
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
						"pdf":"<i class='fa fa-file-pdf-o'></i> 导出PDF",
						"copy":"<i class='fa fa-copy'></i> <a>复制</a>",
						"copyTitle":"复制到剪贴板",
						"copyInfo":{_: '以复制 %d 行到剪贴板',1: '复制 1 行到剪贴板'},
						"excel":"<i class='fa fa-file-excel-o'></i> <a>导出EXCEL</a>",
						"print":"<i class='fa fa-print'></i> <a>打印</a>"
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
				className: 'btn btn-sm'
			},
			collection: {
				tag: 'ul',
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
	
	$.fn.dataTable.Buttons.swfPath = APP.jsPath+'/lib/jquery/datatables/swf/flashExport.swf';
	
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
			"select": {style: 'os',info:false},
			//"buttons": ['copyFlash','excelFlash','print'],
			"buttons":[ opts.btns],
			"fnCreatedRow": function (nRow, aData, iDataIndex) {
	         }
		},opts);
		return _getDataTable(_table,default_opt,function(otable){
			//初始化表格工具栏 ，增加ID约束
			var tableid = _table.attr('id');
			
			var toolbar = $("div#"+tableid+"_wrapper>div.dataTables_btn_toolbar");
			
			var pageToolbar = $("#"+(default_opt.toolbar ? default_opt.toolbar : (tableid+"-toolbar")));
			if(opts.exportBtns){
				var _export_btn = $("<div class='btn-group btn-group-circle'>");
				pageToolbar.prepend(_export_btn);
			}
			toolbar.append(pageToolbar);
			
			
			$('a.buttons-copy.buttons-flash').attr("title","复制");
			$('a.buttons-excel.buttons-flash').attr("title","导出为Excel");
			$('a.buttons-pdf.buttons-flash').attr("title","导出为Pdf");
			$('a.buttons-print').attr("title","打印");
			
			
			
/*			$(window).resize(function(){
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
		
		default_opt.dataUrl = $table.attr('data-url');
		default_opt.serverSide = ($table.attr('data-server-side') != undefined && $table.attr('data-server-side') == "true");
		
		var ajax_params = {};
		if(default_opt.params) ajax_params = default_opt.params;//页面定义Ajax请求参数
		
		if(default_opt.dataUrl != undefined){
			var columnArray = new Array();
			$table.find('th[data-column]').each(function(){
				columnArray.push({'data' : $(this).attr('data-column')});
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
	return DataTable;
});