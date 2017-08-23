/**
 * Created by user-pc on 2017/8/21.
 */
require('../common/header-nav/index.js');
require('../common/header-input/index.js');
require('../common/footer/index.css');

var user_aside=require('../common/user-aside/index.js');

var _tip=require('util/tip.js');
var _user=require('service/user-service.js');

require('./index.css');

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
            password:$('#oldpass').val(),
            passwordNew:$('#pass').val(),
            passwordConfirm:$('#cpass').val()
        };
        var validateResult=this.formValidate(data);
        //如果状态通过则提交
        if(validateResult.status){
            /*这里后台做了jquery的ajax二次封装*/
            _user.updatePassword({
                passwordOld:data.password,
                passwordNew:data.passwordNew
            },that.Suc,that.Err);
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
        //判断旧密码
        if(!_tip.validate(data.password,'required')){
            result.msg="旧密码不能为空";
            return result;
        }

        //判断新密码
        if(!_tip.validate(data.passwordNew,'required')){
            result.msg="新密码不能为空";
            return result;
        }else if(data.passwordNew.length<6){
            result.msg="新密码不得小于6位数";
            return result;
        }else if(/\d{6,}/.test(data.passwordNew)){
            result.msg="密码过于简单，请重新设置";
            return result;
        }

        if(data.passwordNew !== data.passwordConfirm){
            result.msg="两次输入的密码不一致";
            return result;
        }

        result.status=true;
        return result;
    },
    /*返回的验证joson数据{status:'1',msg:'用户不存在'}*/
    Suc:function(res){
        window.location.href='./result.html?type=updatePass';
    },
    Err:function(err){
        $('.info-msg').html(err)
    }
};

$(function(){
    page.init();
});


$(function(){
    user_aside.init({
        name:'user-update-pass'
    });
    page.init()
});