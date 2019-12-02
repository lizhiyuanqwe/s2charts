/**
 * echart单一柱状图
 *
 * Created by Linhao on 2015/8/13.
 */
define(function (require, exports, module) {

    var common = require("./echarts.common");

    /**
     *
     * @constructor
     */
    var EChartBarVerticalSingle = function () {

        this.option = {
            tooltip: {
                show: true,
                trigger: 'item',
                "axisPointer": {
                    "type": "shadow"   // tooltip 被 axisPointer 触发的时候，params 是多个系列的数据数组
                },
            },
            "grid": {
                "borderWidth": 0,
                "containLabel": true,
                "top": 100
            },
            legend: {
                data: [''],
                "textStyle": {
                    "fontSize": 12,
                    "fontFamily": "微软雅黑",
                    "color": "#272727",
                    "fontWeight": "bold"
                },
                "selectedMode": true,
                "show": false,
                "right": '0',
                "top": '20%'
            },
            xAxis: [
                {
                    "axisTick": {
                        show: false
                    },
                    type: 'category',
                    data: [],  //数据
                    "axisLabel": {
                        show: true,
                        "rotate": 0,
                        "interval": "auto",
                        "textStyle": {
                            "fontSize": 0,
                            "fontFamily": "微软雅黑",
                            "color": "#272727",
                            "fontWeight": "bold"
                        }
                    },
                    "splitLine": {
                        "show": false
                    },
                    "axisLine": {
                        "lineStyle": {
                            "color": "#272727"
                        }
                    },
                    positionOffset: {
                        x: 0,
                        y: 0
                    },
                    "isShowXAxisText": false
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    "axisLabel": {
                        "textStyle": {
                            "fontSize": 12,
                            "fontFamily": "微软雅黑",
                            "color": "#272727",
                            "fontWeight": "bold"
                        },
                        "formatter": "{value}"
                    },
                    "nameTextStyle": {
                        "fontSize": 12,
                        "fontFamily": "微软雅黑",
                        "color": "#272727",
                        "fontWeight": "bold"
                    },
                    "splitLine": {
                        "show": true
                    },
                    "axisLine": {
                        "lineStyle": {
                            "color": "#272727"
                        }
                    },
                    name: ""     //数据
                }
            ],
            series: [
                {
                    "name": "",
                    "type": "bar",
                    "data": []   //数据
                }
            ]
        };
    };

    /**
     *
     * @type {{}}
     */
    EChartBarVerticalSingle.prototype = {
        init: function (config) {
            console.log("config======",config)
            var that = this;
            config = $.extend({}, config);
            common.Util.setContainerWidAndHei($("#" + config.container), config.width, config.height);

            // 基于准备好的dom，初始化echarts图表
            var myChart = common.myECharts.getChart(config.container);
            if (myChart) {
                this.getOptionFromConfig(config, function () {
                    if (config.option) {
                        console.log(that.ogetOptionFromConfigption)
                        that.option = $.extend(true, that.ogetOptionFromConfigption, config.option || {});
                    }
                    myChart.resize();
                    myChart.setOption(that.option);
                });
            }
            ;

        },
        getOptionFromConfig: function (config, callback) {
            console.log("option============",config)
            var that = this;
            if (typeof config.data == "object" && config.data != null) {
                this.getDataFromData(config.data, function (re) {

                    goTo(re);
                    callback && callback();
                });
            } else {
                console.log(typeof config.data)
                this.getDataFromConfig(config.url, function (re) {
                    goTo(re);
                    callback && callback();
                });
            }

            //
            function goTo(re) {
                if (re && re != null) {
                    console.log("that=======",that)
                    console.log("that.option=======",that.option)
                    that.option.legend.data = re.legendData;
                    console.log(that.option.xAxis)
                    $.extend(that.option.xAxis[0], {
                        type : 'category',
                        data: re.xAxisData
                    });
                    $.extend(that.option.yAxis[0], {
                        name: re.unit
                    });

                    that.option.series = [
                        {
                            "name": re.seriesName,
                            "type": "bar",
                            "data": re.seriesData,
                            "itemStyle": {
                                "normal": {
                                    //"barBorderWidth": 0,
                                    "barBorderColor": "#F5F5F5",
                                    "barBorderRadius": [0, 0, 0, 0],
                                    "color": function (param) {
                                        //单独高亮一根柱子
                                        if (typeof config.selectedBarValue == "number") {
                                            if (param.data && param.data == config.selectedBarValue) {
                                                return "#37648B";
                                            } else {
                                                return "#CDC9C9";	//灰色
                                            }
                                        } else {
                                            return "#37648B";
                                        }
                                    },

                                },
                                "emphasis": {
                                    color: '#F2DB32'
                                }
                            },
                            "label": {
                                normal: {
                                    show: true
                                }
                            }
                        }
                    ];
                    that.option.title = {
                        show: true,
                        text: "国民经济R&D人员全时当量",
                        left: "right",
                        "top": "5%"
                    }
                    that.option.tooltip = {
                        formatter: function (params) {   //formatter提示框浮层内容格式器，支持字符串模板和回调函数两种形式,params 是 formatter 需要的数据集
                            // console.log(params)
                            var res = params.seriesName + '<br/>';
                            var place = params.name + ' : ' + params.data;
                            return res + place;
                        }
                    };

                }
            }
        },
        getDataFromConfig: function (url, callback) {
            var that = this;
            common.Ajax.getJsonData(url, function (data) {
                that.getDataFromData(data, callback);
            });
        },
        getDataFromData: function (data, callback) {
            if (data && data != null) {
                var xAxisData = [];
                var legendData = [];

                var seriesName = "";
                var seriesData = [];
                var titleName = data.title;

                var unit = "";

                var regex = /\([^\)]+\)/g;
                for (var i = 0; i < data.length; i++) {
                    if (!isNaN(data[i].value)) {
                        seriesData.push(data[i].value);
                        xAxisData.push(data[i].name);
                    }

                    //第一行为表头
                    if (i == 0) {
                        //数据指标名称
                        seriesName = data[i].value || "";

                        var v = regex.exec(seriesName);
                        if (v && v[0]) {
                            unit = v[0];
                            seriesName = seriesName.split(v)[0] || "";
                        }

                        //数据指标名称
                        legendData.push(seriesName);
                    }//end if (i == 0)
                }

                var re = {
                    xAxisData: xAxisData,
                    legendData: legendData,
                    seriesName: seriesName,
                    seriesData: seriesData,
                    titleName: titleName,
                    unit: unit
                };
                callback && callback(re);
            } else {
                callback && callback(null);
            }
        },
        getMapData: function (name, callback) {

        }
    };


    return EChartBarVerticalSingle;
});