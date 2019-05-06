/**
 * d3排序图样式调整
 *
 * Created by Linhao on 2015/9/14.
 */
define(function(require, exports, module) {
	
	var templateHtml = require("/http/js/module/style/d3/d3.bar.order.html.tpl");
	var inputHtml = "<input type=\"color\" class=\"form-control\" style=\"width:45px;\" value=\"#ffffff\" />";

	var inputHtml2 = "<span class=\"input-group-addon\" style=\"width:auto;\">x方向偏移</span>"
			+"<input type=\"number\" class=\"form-control x\" style=\"width:80px;margin-right:20px;\" value=\"0\" />";
	var inputHtml3 = "<span class=\"input-group-addon\" style=\"width:auto;\">y方向偏移</span>"
			+"<input type=\"number\" class=\"form-control y\" style=\"width:80px;\" value=\"0\" />";
	
	var spanHtml = "<div class=\"input-group\">"+inputHtml2+inputHtml3+"</div>";
	
	
    /**
     *
     */
    var D3BarOrderStyle = (function(){
        var _isInit = false;
    	var _style = {};
    	var _container = {};

		/**
		 * 初始化数据
		 * @param currentHanlder
		 * 			当前处理的对象（chart.echarts.js
		 * 			或者chart.echarts.edit.js的对象）
		 * @param chartParam
		 * 			当为图编辑时传入的初始化参数，新建时为null
		 * @param callback
		 * 			回调方法
		 */
		var init = function(currentHanlder,chartParam,callback){
        	if(_isInit){
        		callback && callback();
        		return 
        	}
        	_style = {};
        	_container = {};
        	
        	//添加内容
        	$("#param-pane").html("").append($(templateHtml));
			//初始化样式参数时必须放在【添加内容】后面
			if(chartParam != null){
				//设置参数并初始化数据
				setChartParam(chartParam);
			}

			_isInit = true;
			initEventBind(currentHanlder,callback);
        };
        
        /**
         * 重新绑定文字xy选择
         */
        var reBindTextXySelect = function(chartObj,objConfig){
        	if(!chartObj || !objConfig){
        		return ;
        	}
        	
        	$("#chart-textxy-color-container").html("");
        	
        	//添加文本偏移
	    	var currentTextXYs = $.extend([],chartObj.currentTextXY || []);
	    	var currentTextXYLength = currentTextXYs.length;
        	
	    	//若已经修改过
        	if(_style.textXY && _style.textXY.length > 0){
        		//表示没有新增数据
        		if(_style.textXY.length >= currentTextXYLength){
        			//修改数据长度
        			_style.textXY.length = currentTextXYLength;
        			for(var c=0,cLen=currentTextXYLength;c<cLen;c++){
        	    		//添加新的
        	    		var $span = $(spanHtml).attr("id","chart-bar-textxy-"+c);
        	    		$span.find(">input.x").val(_style.textXY[c].x);
        	    		$span.find(">input.y").val(_style.textXY[c].y);
        	    		
        	    		$span.appendTo($("#chart-textxy-color-container"));
            		}
        		}else{
        			//有新增的数据
        			for(var d=0,dLen=_style.textXY.length;d<dLen;d++){
        				//添加新的
        	    		var $span = $(spanHtml).attr("id","chart-bar-textxy-"+d);
        	    		$span.find(">input.x").val(_style.textXY[d].x);
        	    		$span.find(">input.y").val(_style.textXY[d].y);
        	    		
        	    		$span.appendTo($("#chart-textxy-color-container"));
            		}
        			
        			var index = _style.textXY.length;
        			for(var e=index,eLen=currentTextXYLength;e<eLen;e++){
        				//添加新的颜色
    					var cc = currentTextXYs[e%colorsLength];
    					//添加新的
        	    		var $span = $(spanHtml).attr("id","chart-bar-textxy-"+e);
        	    		$span.find(">input.x").val(cc.x);
        	    		$span.find(">input.y").val(cc.y);
        	    		
        	    		$span.appendTo($("#chart-textxy-color-container"));
        	    		
	    	    		//添加新的
	    	    		_style.textXY.push(cc);
        			}
        		}
        	}else{
    			for(var i = 0; i<currentTextXYLength;i++){
    	    		//添加新的
    	    		var $span = $(spanHtml).attr("id","chart-bar-textxy-"+i);
    	    		$span.find(">input.x").val(currentTextXYs[i].x);
    	    		$span.find(">input.y").val(currentTextXYs[i].y);
    	    		
    	    		$span.appendTo($("#chart-textxy-color-container"));
    			}
        	}//end if(_style.color && _style.color.length > 0) else
        	
        	//动态绑定饼颜色
        	$("#chart-textxy-color-container").off("change",">.input-group>input");
	    	$("#chart-textxy-color-container").on("change",">.input-group>input",function(){
	    		
	    		var textXYs = [];
	    		//找到所有的颜色
	    		var $inputGroups = $("#chart-textxy-color-container").find(">.input-group");
	    		$inputGroups.each(function(i,o){
	    			var $inputs = $(o).find(">input");
	    			var x = 0;
	    			var y = 0;
	    			$inputs.each(function(ii,oo){
	    				var isX = $(oo).hasClass("x");
	    				if(isX){
	    					x = parseFloat($(oo).val());
	    				}else{
	    					y = parseFloat($(oo).val());
	    				}
	    			});
    				textXYs.push({
    					x:x,
    					y:y
    				});
	    		});
	    		
	    		objConfig["config"] = _style = $.extend(true,_style,{
	    			textXY:textXYs
	    		});
	    		chartObj.init(objConfig);
	    	});
        };
        
        /**
         * 重新绑定颜色选择
         */
        var reBindColorSelect = function(chartObj,objConfig){
        	if(!chartObj || !objConfig){
        		return ;
        	}
        	
        	$("#chart-bar-color-container").html("");
        	
        	//添加饼的颜色
	    	var currentColors = $.extend([],chartObj.currentColors || []);
	    	var colorsLength = currentColors.length;
	    	
	    	//若已经修改过配色，直接显示配色的
        	if(_style.colors && _style.colors.length > 0){
        		//表示没有新增数据
        		if(_style.colors.length >= colorsLength){
        			//修改数据长度
        			_style.colors.length = colorsLength;
        			for(var c=0,cLen=colorsLength;c<cLen;c++){
        				//添加新的颜色
        	    		$(inputHtml).attr("id","chart-bar-color-select-"+c).val(_style.colors[c])
        	    			.appendTo($("#chart-bar-color-container"));
            		}
        		}else{
        			//有新增的数据
        			for(var d=0,dLen=_style.colors.length;d<dLen;d++){
        				//添加新的颜色
        	    		$(inputHtml).attr("id","chart-bar-color-select-"+d).val(_style.colors[d])
        	    			.appendTo($("#chart-bar-color-container"));
            		}
        			
        			var index = _style.colors.length;
        			for(var e=index,eLen=colorsLength;e<eLen;e++){
        				//添加新的颜色
    					var cc = currentColors[e%colorsLength];
    					//添加新的颜色
        	    		$(inputHtml).attr("id","chart-bar-color-select-"+e).val(cc)
        	    			.appendTo($("#chart-bar-color-container"));
	    	    		//添加新的
	    	    		_style.color.push(cc);
        			}
        		}
        	}else{
    			for(var i = 0; i<colorsLength;i++){
    	    		//添加新的颜色
    	    		$(inputHtml).attr("id","chart-bar-color-select-"+i).val(currentColors[i])
    	    			.appendTo($("#chart-bar-color-container"));
    			}
        	}//end if(_style.color && _style.color.length > 0) else
        	

	    	
	    	//动态绑定饼颜色
        	$("#chart-bar-color-container").off("change",">input");
	    	$("#chart-bar-color-container").on("change",">input",function(){
	    		
	    		var colorArr = [];
	    		//找到所有的颜色
	    		var $inputs = $("#chart-bar-color-container").find(">input");
	    		$inputs.each(function(i,o){
	    			var c = $(o).val();
	    			if(c && c != ""){
    	    			colorArr.push($(o).val());
	    			}
	    		});
	    		
	    		objConfig["config"] = _style = $.extend(true,_style,{
	    			colors:colorArr
	    		});
	    		chartObj.init(objConfig);
	    	});
	    	
        	reBindTextXySelect(chartObj,objConfig);
        };

		/**
		 * 初始化绑定事件
		 * @param currentHanlder
		 * @param callback
		 */
		var initEventBind = function(currentHanlder,callback){
			if(currentHanlder && currentHanlder != null){
				eventBind(currentHanlder,callback);
			}else{
				//默认选择（chart.d3）
				seajs.use("chart.d3",function(hanlder){
					eventBind(hanlder,callback);
				});
			}
		};

		/**
		 * 绑定事件
		 * @param hanlder
		 * @param callback
		 */
		var eventBind = function(hanlder,callback){
			if(hanlder){
				var chartObj = hanlder.getChartObj();
				var objConfig = hanlder.getChartConfig();
				if(chartObj && objConfig){
					//修改图的高度
					$("#chart-d3-height-range").change(function(){
						var height = $(this).val();
						//设置值
						$("#chart-d3-height-text").val(height);

						_container["height"] = height;
						objConfig["h"] = height;
						chartObj.init(objConfig);
					});

					//最大值（设置为0 ，则不显示）
					$("#chart-d3-max-text").change(function(){
						var value = $(this).val();

						objConfig["config"] = _style = $.extend(true,_style,{
							yMax:value
						});
						chartObj.init(objConfig);
					});

					//动画延时
					$("#chart-d3-timeout-range").change(function(){
						var value = $(this).val();

						$("#chart-d3-timeout-text").val(value);

						objConfig["config"] = _style = $.extend(true,_style,{
							timeOut:value
						});
						chartObj.init(objConfig);
					});

					//旋转角度
					$("#chart-d3-textRotate-range").change(function(){
						var value = $(this).val();

						$("#chart-d3-textRotate-text").val(value);

						objConfig["config"] = _style = $.extend(true,_style,{
							textRotate:value
						});
						chartObj.init(objConfig);
					});

					//排序文字
					$("#chart-d3-order-name-btn").click(function(){
						var value = $("#chart-d3-order-name-text").val();
						if(!value || value == ""){
							$("#chart-d3-order-name-text").focus();
							return false;
						}

						objConfig["config"] = _style = $.extend(true,_style,{
							orderName:value
						});
						chartObj.init(objConfig);
						return false;
					});

					//重新绑定颜色选择
					reBindColorSelect(chartObj,objConfig);
				}//end if(chartObj && objConfig)
			}//end if(hanlder)

			callback && callback();
        };
        
        /**
         * 取得style
         */
        var getStyle = function(){
        	return _style;
        };
        
        /**
         * 取得container
         */
    	var getContainer = function(){
    		return _container;
    	};
    	
    	var setHeight = function(height){
    		if(height && height > 0){
    			_container["height"] = height;
    		}
    	};

		/**
		 * 设置参数（编辑时使用）
		 *
		 * @param chartParam
		 * 			设置参数
		 */
		var setChartParam = function(chartParam){
			if(chartParam && typeof chartParam == "object"){
				if(chartParam.container){
					_container = $.extend(true,_container || {},chartParam.container);
				}

				if(chartParam.style){
					_style = $.extend(true,_style || {},chartParam.style);
				}
			}

			//初始化控件的值
			initControlStyle();
		};

		/**
		 * 初始化控件的值（编辑时使用）
		 */
		var initControlStyle = function(){

			var currentStyle = $.extend(true,{
				"timeOut": -1,
				"orderName": null,
				"textRotate": -1,
				"yMax": -1
			},_style);

			var timeOut = currentStyle.timeOut;
			if(timeOut > -1){
				$("#chart-d3-timeout-range").attr("value",timeOut).val(timeOut);
				$("#chart-d3-timeout-text").attr("value",timeOut).val(timeOut);
			}
			var yMax = currentStyle.yMax;
			if(yMax > -1){
				$("#chart-d3-max-text").attr("value",yMax).val(yMax);
			}
			var orderName = currentStyle.orderName;
			if(orderName != null){
				$("#chart-d3-order-name-text").attr("value",orderName).val(orderName);
			}
			var textRotate = currentStyle.textRotate;
			if(textRotate > -1){
				$("#chart-d3-textRotate-range").attr("value",textRotate).val(textRotate);
				$("#chart-d3-textRotate-text").attr("value",textRotate).val(textRotate);
			}
		};
    	
        return {
        	init:init,
        	getStyle:getStyle,
        	getContainer:getContainer,
        	setHeight:setHeight,
        	reBindColorSelect:reBindColorSelect
        };
    })();


    return D3BarOrderStyle;
});