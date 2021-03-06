define(function (require, exports, module) {

    var common = require("/base/http/js/module/echarts/echarts.common.js");
    var userPic = $("input[name=chart-type-chart]").val() //name=chart-type-chart的值给userPic
    // var username = $("#go-login-btn").html();
    // console.log(username+",,,")
    //下载功能
    $("#download-pic").click(function () {
        $.ajax({
            type: "POST",
            url: "/checkdownload",
            data: {
                userPic: userPic   //json形式
            },
            success: function (data, textStatus) {
                console.log(data)
                if (data.code == 200) {
                    var $canvas = $("#content canvas")      //找到Echarts自己画的canvas
                    var canvas = $canvas[0];                 //jquery对象转换为dom对象
                    // console.log(canvas)
                    var img = new Image();      //定义新的img存放canvas数据
                    img.src = canvas.toDataURL("image/png");    //把canvas画布里的图案转变成base64编码格式的png，然后返回 Data URL数据。
                    // console.log(img);
                    var a = document.createElement('a')    //添加a标签
                    var event = new MouseEvent('click')  //a标签的鼠标点击事件
                    a.download = '图片'   //a标签的download时的文件名
                    a.href = img.src    //a标签的下载链接为存放的canvas数据
                    a.dispatchEvent(event); //当鼠标点击时，通知a开始执行

                }
                if (data.code == 300) {
                    alert("没有权限")
                }
                if (data.code == 400) {
                    alert("未登录")
                }
            }
        });
    });

    //保存功能
    $("#save-pic").click(function () {

        var mychart = common.myECharts.getChart("content")   //getchart的API，用getchart来找图片的id content
        var pic_option = mychart.getOption()
        console.log(typeof pic_option)
        //从localStorage取id
        // var IdName=userPic
        localStorage.setItem("IdName", userPic);
        // console.log(IdName)
        //判断echarts是否用了formatter
  if (pic_option.tooltip[0].formatter =="undefined"){
      console.log(pic_option.tooltip[0].formatter)
      pic_option.tooltip[0].formatter = pic_option.tooltip[0].formatter.toString()//可以直接替换原先的
  }
  // console.log(pic_option.tooltip[0].formatter)
       var pic_option= JSON.stringify(pic_option) //把数据转换string数据格式
        // var mychart = common.myECharts.getChart(document.getElementById('content.image'))  //getchart的API，用getchart来找图片的id content
        //验证数据能不能画图，重新画个容器，把option数据导进去，看能不能出图
        $.ajax({
            type: "POST",
            url: "/checkdownload",
            data: {
                userPic: userPic   //json形式
            },
            success: function (data, textStatus) {
                if (data.code == 200) {
                    $.ajax({
                        type: "post",
                        async: "false",//把同步请求改成了异步请求，异步会立即执行，取不到optin
                        url: " /savejson",
                        data: {
                            // userName: username,
                            userPic: userPic,
                            picOption: pic_option,
                        },
                        success: function (data, textStatus) {
                            alert("保存成功")
                        }
                    })

                }
                if (data.code == 300) {
                    alert("没有权限")
                }
                if (data.code == 400) {
                    alert("未登录")
                }
            }
        })
    })
})
