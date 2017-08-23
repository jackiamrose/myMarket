/**
 * Created by user-pc on 2017/8/21.
 */
require('../common/header-nav/index.js');
require('../common/header-input/index.js');
require('../common/footer/index.css');
var user_aside=require('../common/user-aside/index.js');
var _tip=require('util/tip.js');
var _user=require('service/user-service.js');

var template=require('./user-center.string');

require('./index.css');



var page={
    init:function(){
      this.loadAsideHtml();
      this.loadUserCenterHtml()
    },
    loadAsideHtml:function(){
        /*初始化左侧的菜单卡*/
        user_aside.init({
            name:'user-center'
        });
    },
    loadUserCenterHtml:function(){
        var that=this;
        /*初始化右侧用户个人中心*/
        _user.getInformation(that.Suc,that.Err);
    },
    Suc:function(res){
        //var _data=this.data;
        /*_data.username=res.username;
        _data.telephone=res.phone;
        _data.email=res.email;
        _data.question=res.question;
        _data.answer=res.answer;*/
        //console.log(_data);
        console.log(res);
        var userCenter=_tip.getRenderHtml(template,res);
        $('.information').html(userCenter);
        //console.log(this)

        page.bindEvent();
    },
    Err:function(err){
        $('.information').html(err);
    },
    bindEvent:function(){
        var that=this;
        var data={
            phone:'',
            email:'',
            question:'',
            answer:''
        };
        $('.edit').on('click',function(){
            var html=$(this).html();
            var htmlToggle= (html==='编辑')?'保存':'编辑';
            if(html === '编辑'){
                $('.info-control input').show().prev().hide();
            }else if(html === '保存'){
                data.phone=$('#telephone').val();
                data.email=$('#email').val();
                data.question=$('#question').val();
                data.answer=$('#answer').val();
                $('.info-control input').hide().prev().show();
                var result=that.validateFormData(data);
                //验证通过则提交ajax
                if(result.status){
                    _user.setInformation(data,function(res){
                        console.log(res);
                        _user.getInformation(that.Suc,that.Err);
                    },function(err){
                        $('.information').html(err);
                    });
                }else{
                    //验证不通过错误提醒
                    alert(that.validateFormData(data).msg);
                    _user.getInformation(that.Suc,that.Err);
                }
            }
            //修改按钮
            $(this).html(htmlToggle);

        })
    },
    validateFormData:function(data){
        var result={
            status:false,
            msg:''
        };

        if(!_tip.validate(data.phone,'required')){
            result.msg="手机号不得为空";
            return result;
        }else if(!(data.phone.length === 11)){
            result.msg="手机号必须为11位数";
            return result;
        }else if(!_tip.validate(data.phone,'phone')){
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
    }
};

$(function(){
    page.init();
});





