/**
 * Created by user-pc on 2017/8/19.
 */
var _tip=require('util/tip.js');
var user={
    /*注册账号*/
    register:function(obj,resolve,reject){
        _tip.requestAjax({
            url     : _tip.getServerParam('/user/register.do'),
            data    : {
                username:obj.user,
                password:obj.pass,
                passwordConfirm:obj.opass,
                phone:obj.telephone,
                email:obj.email,
                question:obj.question,
                answer:obj.answer
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    /*验证用户登录*/
    login:function(userinfo,resolve,reject){
      _tip.requestAjax({
          url:_tip.getServerParam('/user/login.do'),
          method:"POST",
          data:userinfo,
          success:resolve,
          error:reject
      })
    },
    /*验证登陆的用户名*/
    checkUsername:function(username,resolve,reject){
        _tip.requestAjax({
            url:_tip.getServerParam('/user/check_valid.do'),
            data:{
                type:'username',
                username:username
            },
            method:'POST',
            success:resolve,
            error:reject

        })
    },
    // 检查登录状态
    checkLogin : function(resolve, reject){
        _tip.requestAjax({
            url     : _tip.getServerParam('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //获取密码提示问题
    getQuestion:function(username,resolve,reject){
        _tip.requestAjax({
            url:_tip.getServerParam('/user/forget_get_question.do'),
            data: {
                username:username
            }
            ,
            method:'POST',
            success:resolve,
            error:reject

        })
    },
    //检查提示问题的回答
    checkAnswer:function(obj,resolve,reject){
        _tip.requestAjax({
            url:_tip.getServerParam('/user/forget_check_answer.do'),
            data: {
                username:obj.username,
                question:obj.question,
                answer:obj.answer
            },
            method:'POST',
            success:resolve,
            error:reject

        })
    },
    //提交密码
    resetPass:function(obj,resolve,reject){
        _tip.requestAjax({
            url:_tip.getServerParam('/user/forget_reset_password.do'),
            data: {
                username:obj.username,
                passwordNew:obj.password,
                forgetToken:obj.token
            }
            ,
            method:'POST',
            success:resolve,
            error:reject
        })
    },
    //获取用户信息
    getInformation:function(resolve,reject){
        _tip.requestAjax({
            url:_tip.getServerParam('/user/get_information.do'),
            method:'POST',
            success:resolve,
            error:reject
        })
    },
    //更该用户信息
    setInformation:function(obj,resolve,reject){
        _tip.requestAjax({
            url:_tip.getServerParam('/user/update_information.do'),
            method:'POST',
            data:obj,
            success:resolve,
            error:reject
        })
    },
    //登录状态下修改密码
    updatePassword:function(obj,resolve,reject){
        _tip.requestAjax({
            url:_tip.getServerParam('/user/reset_password.do'),
            method:'POST',
            data:obj,
            success:resolve,
            error:reject
        })
    },
    // 退出
    logout : function(resolve, reject){
        _tip.requestAjax({
            url     : _tip.getServerParam('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
};

module.exports=user;