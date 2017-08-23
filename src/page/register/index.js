/**
 * Created by user-pc on 2017/8/19.
 */
/*我注册的账号为
* 用户名：njl
* 密码：niejialun
* 手机号：15929123237
* 邮箱：438327667@qq.com
* 提示问题：我的
* 答案：你的
*
* */
require('../common/header-nav-simple/index.css');
require('./index.css');
var _tip=require('util/tip.js');
var _user=require('service/user-service.js');

var page ={
    init:function(){
        this.addEvent();
    },
    addEvent:function(){
        var that=this;
        $('.button').click(function(){
            //清空提示框
            that.submit();
        });
        $(".user-input input").focus(function(){
            $('.info-msg').html('');
        })
    },
    submit:function(){
        var that=this;
        var data={
            user:$('#user').val(),
            pass:$('#pass').val(),
            opass:$('#opass').val(),
            telephone:$('#telephone').val(),
            email:$('#email').val(),
            question:$('#question').val(),
            answer:$('#answer').val()
        };
        var validateResult=this.formValidate(data);
        //如果状态通过则提交
        if(validateResult.status){
            /*这里后台做了jquery的ajax二次封装*/
            _user.register(data,that.Suc,that.Err);
        }
        //验证不成功；
        else{
            $('.info-msg').html("<i class='fa fa-warning'><i/>"+validateResult.msg)
        }
    },
    //表单字段验证
    formValidate:function(data){
        var result={
            status:false,
            msg:''
        };
        if(!_tip.validate(data.user,'required')){
            result.msg="用户名不能为空";
            return result;
        }

        if(!_tip.validate(data.pass,'required')){
            result.msg="密码不能为空";
            return result;
        }else if(data.pass.length<6){
            result.msg="密码不得小于6位";
            return result;
        }else if(/\d{6,}/.test(data.pass)){
            result.msg="密码过于简单，请重新设置";
            return result;
        }

        if(data.opass !== data.pass){
            result.msg="两次密码不一致";
            return result;
        }

        if(!_tip.validate(data.telephone,'required')){
            result.msg="手机号不得为空";
            return result;
        }else if(!(data.telephone.length === 11)){
            result.msg="手机号必须为11位数";
            return result;
        }else if(!_tip.validate(data.telephone,'phone')){
            result.msg="手机号不正确";
            return result;
        }

        if(!_tip.validate(data.email,'required')){
            result.msg="邮箱不能为空";
            return result;
        }else if(!_tip.validate(data.email,'email')){
            result.msg="邮箱不正确";
        }


        if(!_tip.validate(data.question,'required')){
            result.msg="提示问题不能为空";
            return result;
        }

        if(!_tip.validate(data.answer,'required')){
            result.msg="回答不能为空";
            return result;
        }

        result.status=true;
        return result;
    },
    /*返回的验证joson数据{status:'1',msg:'用户不存在'}*/
    Suc:function(res){
        window.location.href=_tip.getUrlParam('redirect')|| "./result.html?type=register"
    },
    Err:function(err){
        $('.info-msg').html(err);
    }
};

$(function(){
    page.init();
});
