/**
 * 基于Ztree的基本封装
 */
define(['app/common','jquery/ztree'],function(APP){
	$.fn.tree = function(settings,zNodes){
		var _this = $(this);
		var _nodeData = zNodes;
		if(settings){
			if((settings.stmID||settings.async) && zNodes === undefined){//增加stmID选项获取sqlMapper的sqlID获取数组数据
				var url = "app/common/selectArrayByStmID";
				var paramData = {};
				if(settings.stmID) paramData.stmID=settings.stmID;
				if(settings.param) paramData.param=settings.param;
				//同步方式防止数据量大是无法加载
				APP.ajax(url,paramData,'POST',false,function(ret){
					_nodeData = ret;
				});
			}
		}
		var tree_settings = $.extend(true,{
			view: {
				dblClickExpand: true,
				nameIsHTML: true
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				onNodeCreated : function(event, treeId, treeNode) {
					console.log(treeNode);
			        if (treeNode.icons) {
			            $('#'+ treeNode.tId +'_a').addClass("icons")
			            						  .find('> span.button').append('<i class="'+ treeNode.icons +'"></i>');
			        }
			        if (settings.onNodeCreated) {
			        	settings.onNodeCreated.toFunc().call(this, event, treeId, treeNode)
			        }
			    },
	            onCollapse: function(event, treeId, treeNode) {
	                if (treeNode.iconsClose) {
	                    $('#'+ treeNode.tId +'_ico').find('> i').attr('class', treeNode.iconsClose)
	                }
	                if (settings.onCollapse) {
	                	settings.onCollapse.toFunc().call(this, event, treeId, treeNode);
	                }
	            },
	            onExpand : function(event, treeId, treeNode) {
	                if (treeNode.icons && treeNode.iconsClose) {
	                    $('#'+ treeNode.tId +'_ico').find('> i').attr('class',treeNode.icons)
	                }
	                if (settings.onExpand) {
	                	settings.onExpand.toFunc().call(this, event, treeId, treeNode);
	                }
	            }
			}
		},settings);
		return $.fn.zTree.init(_this, tree_settings, _nodeData);
	}
	
	
	
	/**
	 * 基于ztree的treeSelect
	 * 定义了默认的onClick方法
	 * @param  {Object} settings ztree参数
	 * @param  {String} treeId ztree控件ID
	 */
	$.fn.treeSelect = function(settings,treeId){
		var _this = $(this);
		var _parent = _this.parent();
		var _sel_name = _this.attr("name");
		//保存ID的隐藏控件
		var _id_filed = _this.prevAll("input[data-for='"+_sel_name+"']");
		if(_id_filed.length != 1){
			alert("请在treeSelect元素之前添加id值控件");
			return _this;
		}
		var _key_id = "id";
		var _key_name = "name";
		if(settings && settings.data ){
			if(settings.data.key && settings.data.key.name) _key_name = settings.data.key.name;
			if(settings.data.simpleData && settings.data.simpleData.idKey) _key_id = settings.data.simpleData.idKey;
		}
		var treesel_settings = $.extend(true,{
			data : {
				key : {name : 'name'},
				simpleData: {
					enable: true,
					idKey: "id",
					pIdKey: "pId"
				}
			},
			callback: {//点击时将数据传入显示控件
				onClick: function(e, tree_id, treeNode){
					var zTree = $.fn.zTree.getZTreeObj(tree_id),
					nodes = zTree.getSelectedNodes(),
					_name = "",
					 _id = ""
					nodes.sort(function compare(a,b){return a[_key_id]-b[_key_id];});
					for (var i=0, l=nodes.length; i<l; i++) {
						_name += nodes[i][_key_name] + ",";
						_id += nodes[i][_key_id] + ",";
					}
					if (_name.length > 0 ) _name = _name.substring(0, _name.length-1);
					if (_id.length > 0 ) _id = _id.substring(0, _id.length-1);
					_this.val(_name);
					//validate字段去除
					_this.closest('.form-group').removeClass('has-error');
					_this.parent().siblings("span#"+_this.attr("id")+"-error").remove();
					_this.parent().siblings("i.validate-icon").removeClass("fa-check fa-warning").removeAttr("data-original-title");
					_id_filed.val(_id);
				}
			}
		},settings);
		//自定义id、pid、name属性名称
		if(!APP.isEmpty(_this.attr('tree-id'))){
			treesel_settings.data.simpleData.idKey = _this.attr('tree-id');
			_key_id = _this.attr('tree-id');
		}
		if(!APP.isEmpty(_this.attr('tree-name'))){
			treesel_settings.data.key.name = _this.attr('tree-name');
			_key_name = _this.attr('tree-name');
		}
		if(!APP.isEmpty(_this.attr('tree-pid'))){
			treesel_settings.data.simpleData.pIdKey = _this.attr('tree-pid');
		}
		
		
		//为当前控件增加必要的显示控件和树形下拉菜单
		var inputGroup = $("<div class='input-group'></div>");//为当前控件增加图标
		var selBtn = $("<span class='input-group-addon' style='cursor: pointer;'><i class='fa fa-list'></i></span>");//图标-点击显示下拉菜单
		_this.appendTo(inputGroup);//将当前控件放入input-group
		inputGroup.append(selBtn);//增加图标
		_parent.append(inputGroup);//将input-group放入当前控件原父节点
		var menuContent = $("<div id='"+treeId+"_MenuContent' style='display:none;height: 150px;overflow-y: auto; background-color: #F5F5F5;'></div>");//下拉菜单显示层
		var treeSel = $("<ul id='"+treeId+"' class='ztree' style='margin-top:0; width:100%;'></ul>");//ztree控件
		menuContent.append(treeSel);//将树形放入下拉菜单显示层
		_parent.append(menuContent);//将下拉菜单显示层放入当前节点原父节点
		
		
		/**
		 * 树形下拉列表隐藏-for-treeSelect
		 * @param  {String} content 下拉列表显示DIV的ID
		 */
		function _treeSelect_hideMenu(content) {
			$("#"+content).fadeOut("fast");
			$("body").unbind("mousedown", _treeSelect_onBodyDown);
		}
		/**
		 * 树形下拉列表触发隐藏点击事件-for-treeSelect
		 * @param  {Object} event 事件对象-传入了menuContentID(下拉列表显示DIV的ID)数据
		 */
		function _treeSelect_onBodyDown(event) {
			if (!(event.target.id == event.data.menuContentID || $(event.target).parents("#"+event.data.menuContentID).length>0)) {
				_treeSelect_hideMenu(event.data.menuContentID);
			}
		}
		//显示树形下拉菜单
		function _treeSelect_showMenu(){
			if(menuContent.css("display") == "none"){
				var offset = _this.offset();
				menuContent.css({width: + offset.width + "px",left:offset.left + "px", top:offset.top + _this.outerHeight() + "px"}).slideDown("fast");
				$("body").bind("mousedown",{menuContentID:treeId+"_MenuContent"}, _treeSelect_onBodyDown);
			}
		}
		//点击显示树形下拉菜单
		selBtn.click(function() {
			_treeSelect_showMenu();
		});
		//回车显示
		_this.keypress(function(e){
			if(e.keyCode == 13) _treeSelect_showMenu();
		});
		var _treeObj = treeSel.tree(treesel_settings); 
		_this.treeObj = _treeObj;
		if(_id_filed.attr('value')){
			var _selectedNode = _treeObj.getNodeByParam(_key_id,_id_filed.attr('value'),null);
			_treeObj.selectNode(_selectedNode);
			if(_selectedNode) _this.attr('value',_selectedNode[_key_name]);
		}
		return _this;
	};
});