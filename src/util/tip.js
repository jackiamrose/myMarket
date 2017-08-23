/**
 * Created by user-pc on 2017/8/18.
 */

var conf={
    serverHost:''
};

var hogan=require("hogan.js");

var tip ={
    requestAjax:function(obj){
        var that=this;
        $.ajax({
            url:obj.url || '',
            data:obj.data||'',
            type:obj.method||'get',
            dataType:'json',
            success:function(data){
                /*请求成功*/
                if(data.status ===0){
                    typeof obj.success ==='function' &&  obj.success(data.data,data.msg)
                }
                /*没有登录状态,强制登陆*/
                else if(data.status ===10){
                    that.doLogin();
                }
                /*请求数据错误*/
                else if(data.status ===1){
                    typeof obj.error ==='function' &&  obj.error(data.msg)
                }
            },
            error:function(err){
                typeof obj.error ==='function' && obj.error(err.status)
            }

        })
    },
    /*获取服务器地址*/
    getServerParam(path){
        return conf.serverHost + path
    },
    /*获取url参数name*/
    /*www.baidu.com?keyword=1111;*/
    getUrlParam:function(name){
        var regExp=new RegExp('(^|&)'+name+"=([^&]*)(&|$)");
        var searchOne=window.location.search.substring(1).match(regExp);
        return searchOne ?decodeURIComponent(searchOne[2]):null
    },
    getRenderHtml:function(template,data){
       var templateHtml=hogan.compile(template);
       var result=templateHtml.render(data);
        return result;
    },
    successTip:function(message){
        alert(message || "恭喜成功！")
    },
    errorTip:function(error){
        alert(error || "好像失败了！")
    },
    /*验证数据是否成功*/
    validate:function(value,type){
        var value=$.trim(value);
        if(type == "required"){
            return !!value;
        }
        if(type == "phone"){
            return  /13[123569]{1}\d{8}|15[1235689]\d{8}|188\d{8}/.test(value)
        }
        if(type == "email"){
            return  /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value)
        }
    },
    doLogin:function(){
        window.location.href='./login/html?redirect='+encodeURIComponent(window.location.href)
    },
    goHome:function(){
        window.location.href='./index.html'
    }
};


module.exports=tip;