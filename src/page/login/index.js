/**
 * Created by user-pc on 2017/8/19.
 */
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
          username:$('#user').val(),
          password:$('#pass').val()
      };
      var validateResult=this.formValidate(data);
        //如果状态通过则提交
        if(validateResult.status){
            /*这里后台做了jquery的ajax二次封装*/
            _user.login(data,that.Suc,that.Err);
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
        if(!_tip.validate(data.username,'required')){
            result.msg="用户名不能为空";
            return result;
        }

        if(!_tip.validate(data.password,'required')){
            result.msg="密码不能为空";
            return result;
        }

        result.status=true;
        return result;
    },
    /*返回的验证joson数据{status:'1',msg:'用户不存在'}*/
    Suc:function(res){
        window.location.href=_tip.getUrlParam('redirect')|| "./index.html"
    },
    Err:function(err){
        $('.info-msg').html(err)
    }
};

$(function(){
   page.init();
});
