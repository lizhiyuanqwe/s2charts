/**
 * echart单一面积图样式调整
 *
 * Created by Linhao on 2015/9/14.
 */
define(function(require, exports, module) {
	
	var templateHtml = require("/http/js/module/style/echarts/echarts.area.single-4.html.tpl");
	
    /**
     *
     */
    var EChartAreaSingleStyle = (function(){
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
		 * 初始化绑定事件
		 * @param currentHanlder
		 * @param callback
		 */
		var initEventBind = function(currentHanlder,callback){
			if(currentHanlder && currentHanlder != null){
				eventBind(currentHanlder,callback);
			}else{
				//默认选择（chart.echarts）
				seajs.use("chart.echarts",function(hanlder){
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
					$("#chart-chart-height-range").change(function(){
						var height = $(this).val();
						//设置值
						$("#chart-chart-height-text").val(height);

						_container["height"] = height;
						objConfig["height"] = height;
						chartObj.init(objConfig);
					});

					//修改背景颜色
					$("#chart-backgroundColor-select").change(function(){
						var color = $(this).val();
						objConfig["option"] = _style = $.extend(true,_style,{
							"backgroundColor":color
						});
						chartObj.init(objConfig);
					});

					//面积颜色
					$("#chart-area-color-select").change(function(){
						var color = $(this).val();
						//注意：修改面积颜色，文字颜色也被改
						$("#chart-font-color-select").val(color);
						objConfig["option"] = _style = $.extend(true,_style,{
							color:[color]
						});
						chartObj.init(objConfig);
					});

					//背景色透明度
					$("#chart-area-opacity-range").change(function(){
						var opacity = $(this).val();
						$("#chart-area-opacity-text").val(opacity);
						objConfig["option"] = _style = $.extend(true,_style,{
							series:[
								{
									"areaStyle": {
										"normal": {
											"opacity": opacity
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//面积宽度
					$("#chart-area-width-range").change(function(){
						var width = $(this).val();
						$("#chart-area-width-text").val(width);
						objConfig["option"] = _style = $.extend(true,_style,{
							series:[
								{
									"itemStyle": {
										"normal": {
											"lineStyle": {
												width:width
											}
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//是否显示图列
					$("#chart-show-legend-check").change(function(){
						var isShow = $(this).is(":checked");
						//控制是否可以修改图例文字颜色
						$("#chart-legend-color-select").attr("disabled",!isShow);

						objConfig["option"] = _style = $.extend(true,_style,{
							legend:{
								show:isShow
							}
						});
						chartObj.init(objConfig);
					});

					//图列颜色
					$("#chart-legend-color-select").change(function(){
						var color = $(this).val();
						objConfig["option"] = _style = $.extend(true,_style,{
							legend:{
								textStyle:{
									color:color
								}
							}
						});
						chartObj.init(objConfig);
					});

					//是否显示标签
					$("#chart-show-label-check").change(function(){
						var isShow = $(this).is(":checked");

						//控制是否可以修改
						$("#chart-font-color-select").attr("disabled",!isShow);
						$("#chart-font-size-range").attr("disabled",!isShow);
						$("input[name='chart-font-position-radio']").attr("disabled",!isShow);

						objConfig["option"] = _style = $.extend(true,_style,{
							series:[
								{
									"itemStyle": {
										"normal": {
											"label": {
												"show":isShow
											}
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//选择字体颜色
					$("#chart-font-color-select").change(function(){
						var color = $(this).val();
						objConfig["option"] = _style = $.extend(true,_style,{
							series:[
								{
									"itemStyle": {
										"normal": {
											"label": {
												"textStyle": {
													"color":color
												}
											}
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//选择字体大小
					$("#chart-font-size-range").change(function(){
						var size = $(this).val();

						//设置值
						$("#chart-font-size-text").val(size);
						objConfig["option"] = _style = $.extend(true,_style,{
							series:[
								{
									"itemStyle": {
										"normal": {
											"label": {
												"textStyle": {
													"fontSize": size
												}
											}
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//选择字体位置
					$("input[name='chart-font-position-radio']").click(function(){
						var position = $(this).val();

						objConfig["option"] = _style = $.extend(true,_style,{
							series:[
								{
									"itemStyle": {
										"normal": {
											"label": {
												"position": position
											}
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//x轴位置
					$("input[name='chart-x-position-radio']").click(function(){
						var position = $(this).val();

						objConfig["option"] = _style = $.extend(true,_style,{
							xAxis: [
								{
									position: position
								}
							]
						});
						chartObj.init(objConfig);
					});

					//x轴颜色
					$("#chart-x-color-select").change(function(){
						var color = $(this).val();
						objConfig["option"] = _style = $.extend(true,_style,{
							xAxis : [
								{
									"axisLine": {
										"lineStyle": {
											"color": color
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//x轴字体颜色
					$("#chart-x-font-color-select").change(function(){
						var color = $(this).val();
						objConfig["option"] = _style = $.extend(true,_style,{
							xAxis : [
								{
									"axisLabel": {
										"textStyle": {
											"color": color
										},
										"show": false
									},
									"nameTextStyle": {
										"color": color
									},
									"isShowXAxisText" : true
								}
							]
						});
						chartObj.init(objConfig);
					});

					//x轴字体大小
					$("#chart-x-font-size-range").change(function(){
						var size = $(this).val();

						//设置值
						$("#chart-x-font-size-text").val(size);
						objConfig["option"] = _style = $.extend(true,_style,{
							xAxis : [
								{
									"axisLabel": {
										"textStyle": {
											"fontSize": size
										},
										"show": false
									},
									"nameTextStyle": {
										"fontSize": size
									},
									"isShowXAxisText" : true
								}
							]
						});
						chartObj.init(objConfig);
					});

					//x轴字体旋转角度
					$("#chart-x-text-rotate-range").change(function(){
						var angle = $(this).val();

						//设置值
						$("#chart-x-text-rotate-text").val(angle);
						objConfig["option"] = _style = $.extend(true,_style,{
							xAxis : [
								{
									"axisLabel": {
										"show": false,
										"rotate": angle		//保存当前的x轴文字旋转角度
									},
									"isShowXAxisText":true
								}
							]
						});
						chartObj.init(objConfig);
					});

					//调整x轴字段高度
					$("#chart-textxy-color-container>.form-controlx").change(function(){
						var xmove = $(this).val();
						if(xmove != ""){
							objConfig["option"] = _style = $.extend(true,_style,{
								xAxis: [
									{
										positionOffset: {
											x:xmove
										}
									}
								]
							});
							chartObj.init(objConfig);
						}
					});

					$("#chart-textxy-color-container>.form-controly").change(function() {
						var ymove = $(this).val();
						if(ymove != ""){
							objConfig["option"] = _style = $.extend(true,_style,{
								xAxis: [
									{
										positionOffset: {
											y:ymove
										}
									}
								]
							});
							chartObj.init(objConfig);
						}
					});

					//y轴位置
					$("input[name='chart-y-position-radio']").click(function(){
						var position = $(this).val();

						objConfig["option"] = _style = $.extend(true,_style,{
							yAxis: [
								{
									position: position
								}
							]
						});
						chartObj.init(objConfig);
					});

					//y轴颜色
					$("#chart-y-color-select").change(function(){
						var color = $(this).val();
						objConfig["option"] = _style = $.extend(true,_style,{
							yAxis : [
								{
									"axisLine": {
										"lineStyle": {
											"color": color
										}
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//y轴字体颜色
					$("#chart-y-font-color-select").change(function(){
						var color = $(this).val();
						objConfig["option"] = _style = $.extend(true,_style,{
							yAxis : [
								{
									"axisLabel": {
										"textStyle": {
											"color": color
										}
									},
									"nameTextStyle": {
										"color": color
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//y轴字体大小
					$("#chart-y-font-size-range").change(function(){
						var size = $(this).val();

						//设置值
						$("#chart-y-font-size-text").val(size);
						objConfig["option"] = _style = $.extend(true,_style,{
							yAxis : [
								{
									"axisLabel": {
										"textStyle": {
											"fontSize": size
										}
									},
									"nameTextStyle": {
										"fontSize": size
									}
								}
							]
						});
						chartObj.init(objConfig);
					});

					//y轴字体旋转角度
					$("#chart-y-text-rotate-range").change(function(){
						var size = $(this).val();

						//设置值
						$("#chart-y-text-rotate-text").val(size);
						objConfig["option"] = _style = $.extend(true,_style,{
							yAxis : [
								{
									"axisLabel": {
										"rotate": size
									}
								}
							]
						});
						chartObj.init(objConfig);
					});
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

			//保存编辑背景颜色
			if(_style.backgroundColor) {
				var piePanelStyle = $.extend(true,{},{
					backgroundColor: null //背景颜色
				},{
					backgroundColor:_style.backgroundColor || []
				});

				var piePanelStyleBackgroundColor = piePanelStyle.backgroundColor;
				if(piePanelStyleBackgroundColor != null) {
					$("#chart-backgroundColor-select").attr("value",piePanelStyleBackgroundColor).val(piePanelStyleBackgroundColor);
					var $piePanelStyleBackgroundColorParent =  $("#chart-backgroundColor-select").parent("div");
					$piePanelStyleBackgroundColorParent.html($piePanelStyleBackgroundColorParent.html());
					//保证控件刷新
				}
			}

			var series = _style.series;
			if(series && series[0]){
				var seriesStyle= $.extend(true,{},{series:[
					{
						"itemStyle": {
							"normal": {
								"label": {
									"show":true,
									"position": null,
									"textStyle": {
										"color":null,
										"fontSize": -1
									}
								},
								"lineStyle": {
									width:-1
								}
							}
						},
						"areaStyle": {
							"normal": {
								"opacity": -1
							}
						}
					}
				]},{
					series:series
				});

				//面积宽度
				var w = seriesStyle.series[0].itemStyle.normal.lineStyle.width;
				if(w > -1){
					$("#chart-area-width-range").attr("value",w).val(w);
					$("#chart-area-width-text").attr("value",w).val(w);
				}

				//背景色透明度
				var opa = seriesStyle.series[0].areaStyle.normal.opacity;
				if(opa > -1){
					$("#chart-area-opacity-range").attr("value",opa).val(opa);
					$("#chart-area-opacity-text").attr("value",opa).val(opa);
				}

				//是否显示标签
				if(seriesStyle.series[0].itemStyle.normal.label.show === false){
					$("#chart-show-label-check").attr("checked",false);

					//控制是否可以修改
					$("#chart-font-color-select").attr("disabled",true);
					$("#chart-font-size-range").attr("disabled",true);
					$("input[name='chart-font-position-radio']").attr("disabled",true);
				}
				var textStylePosition = seriesStyle.series[0].itemStyle.normal.label.position;
				if(textStylePosition != null){
					var radioId = "chart-font-position-radio-";
					switch(textStylePosition){
						case "top":
							radioId = radioId + "1";
							break;
						case "bottom":
							radioId = radioId + "2";
							break;
						case "left":
							radioId = radioId + "3";
							break;
						case "right":
							radioId = radioId + "4";
							break;
					}
					$("input[name='chart-font-position-radio']").removeAttr("checked");
					$("input#"+radioId).attr("checked",true);
					var $span = $("input#"+radioId).parent(".input-group-addon");
					$span.html($span.html());
				}
				var textStyleColor = seriesStyle.series[0].itemStyle.normal.label.textStyle.color;
				if(textStyleColor != null){
					$("#chart-font-color-select").attr("value",textStyleColor).val(textStyleColor);
					var $textStyleColorParent =  $("#chart-font-color-select").parent("div");
					//保证控件刷新
					$textStyleColorParent.html($textStyleColorParent.html());
				}
				var textStyleFontSize = seriesStyle.series[0].itemStyle.normal.label.textStyle.fontSize;
				if(textStyleFontSize > -1){
					$("#chart-font-size-range").attr("value",textStyleFontSize).val(textStyleFontSize);
					$("#chart-font-size-text").attr("value",textStyleFontSize).val(textStyleFontSize);
				}
			}//end if(series && series[0])

			//面积颜色
			var color = _style.color;
			if(color && color[0]){
				$("#chart-area-color-select").attr("value",color[0]);
				var $parent =  $("#chart-area-color-select").parent("div");
				//保证控件刷新
				$parent.html($parent.html());
			}

			//是否显示图列
			var legendShow = (_style.legend && _style.legend.show === false) ? false :true;
			if(!legendShow){
				//控制是否可以修改图例文字颜色
				$("#chart-show-legend-check").attr("checked",false);
				$("#chart-legend-color-select").attr("disabled",true);
			}

			//图列颜色
			var legendColor = $.extend(true,{},{
				legend:{
					textStyle:{
						color:null
					}
				}
			},{
				legend : _style.legend || {}
			});
			if(legendColor.legend.textStyle.color != null){
				$("#chart-legend-color-select").attr("value",legendColor.legend.textStyle.color);
				var $parent =  $("#chart-legend-color-select").parent("div");
				//保证控件刷新
				$parent.html($parent.html());
			}

			//x轴
			var xAxisStyle = $.extend(true,{},{
				xAxis: [
					{
						"position": null,
						"axisLine": {
							"lineStyle": {
								"color": null
							}
						},
						"axisLabel": {
							"textStyle": {
								"color": null,
								"fontSize": -1
							},
							"rotate": -1
						},
						positionOffset: {
						x:0,
						y:0
					},
						"isShowXAxisText" : false
					}
				]
			},{
				xAxis:_style.xAxis || []
			});
			var xAxisStylePosition = xAxisStyle.xAxis[0].position;
			if(xAxisStylePosition != null){
				var radioId = "chart-x-position-radio-";
				switch(xAxisStylePosition){
					case "bottom":
						radioId = radioId +"1";
						break;
					case "top":
						radioId = radioId +"2";
						break;
				}
				$("input[name='chart-x-position-radio']").removeAttr("checked");
				$("input#"+radioId).attr("checked",true);
				var $span = $("input#"+radioId).parent(".input-group-addon");
				$span.html($span.html());
			}//end if(xAxisStylePosition != null)
			var xAxisStyleLineColor = xAxisStyle.xAxis[0].axisLine.lineStyle.color;
			if(xAxisStyleLineColor != null){
				$("#chart-x-color-select").attr("value",xAxisStyleLineColor);
				var $xAxisStyleLineColorParent =  $("#chart-x-color-select").parent("div");
				//保证控件刷新
				$xAxisStyleLineColorParent.html($xAxisStyleLineColorParent.html());
			}//end if(xAxisStyleLineColor != null)
			var xAxisStyleTextColor = xAxisStyle.xAxis[0].axisLabel.textStyle.color;
			if(xAxisStyleTextColor != null){
				$("#chart-x-font-color-select").attr("value",xAxisStyleTextColor);
				var $xAxisStyleTextColorParent =  $("#chart-x-font-color-select").parent("div");
				//保证控件刷新
				$xAxisStyleTextColorParent.html($xAxisStyleTextColorParent.html());
			}//end if(xAxisStyleTextColor != null)
			var xAxisStyleTextSize = xAxisStyle.xAxis[0].axisLabel.textStyle.fontSize;
			if(xAxisStyleTextSize > -1){
				$("#chart-x-font-size-range").attr("value",xAxisStyleTextSize).val(xAxisStyleTextSize);
				$("#chart-x-font-size-text").attr("value",xAxisStyleTextSize).val(xAxisStyleTextSize);
			}//end if(xAxisStyleTextSize != null)
			var xAxisStyleTextRotate = xAxisStyle.xAxis[0].axisLabel.rotate;
			if(xAxisStyleTextRotate > -1){
				$("#chart-x-text-rotate-range").attr("value",xAxisStyleTextRotate).val(xAxisStyleTextRotate);
				$("#chart-x-text-rotate-text").attr("value",xAxisStyleTextRotate).val(xAxisStyleTextRotate);
			}//end if(xAxisStyleTextRotate != null)
			var xAistTylePositionOffset = xAxisStyle.xAxis[0].positionOffset;
			if(xAistTylePositionOffset.x != ""){
				$("#chart-textxy-color-container>.form-controlx").attr("value",xAistTylePositionOffset.x).val(xAistTylePositionOffset.x);
			}
			if(xAistTylePositionOffset.y != ""){
				$("#chart-textxy-color-container>.form-controly").attr("value",xAistTylePositionOffset.y).val(xAistTylePositionOffset.y);
			}
			//y轴
			var yAxisStyle = $.extend(true,{},{
				yAxis: [
					{
						"position": null,
						"axisLine": {
							"lineStyle": {
								"color": null
							}
						},
						"axisLabel": {
							"textStyle": {
								"color": null,
								"fontSize": -1
							},
							"rotate": -1
						}
					}
				]
			},{
				yAxis:_style.yAxis || []
			});
			var yAxisStylePosition = yAxisStyle.yAxis[0].position;
			if(yAxisStylePosition != null){
				var radioId = "chart-y-position-radio-";
				switch(yAxisStylePosition){
					case "left":
						radioId = radioId +"1";
						break;
					case "right":
						radioId = radioId +"2";
						break;
				}
				$("input[name='chart-y-position-radio']").removeAttr("checked");
				$("input#"+radioId).attr("checked",true);
				var $span = $("input#"+radioId).parent(".input-group-addon");
				$span.html($span.html());
			}//end if(yAxisStylePosition != null)
			var yAxisStyleLineColor = yAxisStyle.yAxis[0].axisLine.lineStyle.color;
			if(yAxisStyleLineColor != null){
				$("#chart-y-color-select").attr("value",yAxisStyleLineColor);
				var $yAxisStyleLineColorParent =  $("#chart-y-color-select").parent("div");
				//保证控件刷新
				$yAxisStyleLineColorParent.html($yAxisStyleLineColorParent.html());
			}//end if(yAxisStyleLineColor != null)
			var yAxisStyleTextColor = yAxisStyle.yAxis[0].axisLabel.textStyle.color;
			if(yAxisStyleTextColor != null){
				$("#chart-y-font-color-select").attr("value",yAxisStyleTextColor);
				var $yAxisStyleTextColorParent =  $("#chart-y-font-color-select").parent("div");
				//保证控件刷新
				$yAxisStyleTextColorParent.html($yAxisStyleTextColorParent.html());
			}//end if(yAxisStyleTextColor != null)
			var yAxisStyleTextSize = yAxisStyle.yAxis[0].axisLabel.textStyle.fontSize;
			if(yAxisStyleTextSize > -1){
				$("#chart-y-font-size-range").attr("value",yAxisStyleTextSize).val(yAxisStyleTextSize);
				$("#chart-y-font-size-text").attr("value",yAxisStyleTextSize).val(yAxisStyleTextSize);
			}//end if(yAxisStyleTextSize != null)
			var yAxisStyleTextRotate = yAxisStyle.yAxis[0].axisLabel.rotate;
			if(yAxisStyleTextRotate > -1){
				$("#chart-y-text-rotate-range").attr("value",yAxisStyleTextRotate).val(yAxisStyleTextRotate);
				$("#chart-y-text-rotate-text").attr("value",yAxisStyleTextRotate).val(yAxisStyleTextRotate);
			}//end if(yAxisStyleTextRotate != null)
		};
    	
        return {
        	init:init,
        	getStyle:getStyle,
        	getContainer:getContainer,
        	setHeight:setHeight
        };
    })();


    return EChartAreaSingleStyle;
});