/**
 * Created by user-pc on 2017/8/20.
 */
/**
 * Created by user-pc on 2017/8/19.
 */
require('../common/header-nav-simple/index.css');
require('./index.css');
var _tip=require('util/tip.js');
var _user=require('service/user-service.js');
var template=require('./user-pass.string');

var page ={
    data:{
        usernameFlag:true,
        answerFlag:false,
        passwordFlag:false,
        username:'',
        question:'',
        answer:'',
        password:'',
        token:''
    },
    init:function(){
        //开始渲染的是输入用户框
        this.loadHtml();
        this.addUsername();
    },
    addUsername:function(){
        var that=this;
        $('#submitUser').click(function(){
            that.data.username = $('#user').val();
            if(!that.data.username){
                $('.info-msg').html("<i class='fa fa-warning'><i/>用户名不能为空")
            }else{
                _user.checkUsername(that.data.username,function resolve(res){
                    that.data.usernameFlag = false;
                    that.data.answerFlag = true;
                    //渲染提示问题框
                    that.loadHtml();
                    that.addAnswer();
                },function reject(err){
                    //用户名不存在的判断
                    $('.info-msg').html(err);
                })
            }
        });
        /*清空提示框*/
        $(".user-input #user").focus(function(){
            $('.info-msg').html('');
        })
    },
    addAnswer:function(){
        var that=this;
        _user.getQuestion(that.data.username,function resolve(res){
            //返回提示问题
             that.data.question = res;
             $('.question').html(that.data.question);
            //绑定提交的问题
             $('#submitQuestion').click(function(){
                that.data.answer = $('#answer').val();
                if(!_tip.validate(that.data.answer,'required')){
                    $('.info-msg').html("<i class='fa fa-warning'><i/>回答不能为空");
                }else{
                    _user.checkAnswer(that.data,function resolve(res){
                        that.data.answerFlag = false;
                        that.data.passwordFlag=true;
                        that.data.token=res;/*这里是提交重置密码密码传入后台的json对象的参数*/
                        that.loadHtml();
                        that.addPassword();
                    },function reject(err){
                        $('.info-msg').html(err);
                    })
                }
             });
        },function reject(err){
            $('.info-msg').html(err);
        });
        //清空提示框
        $(".user-input #answer").focus(function(){
            $('.info-msg').html('');
        })
    },
    addPassword:function(){
        var that=this;
        $('#submitPass').click(function(){
            that.data.password= $('#password').val();
            console.log(that.data);
            if(that.data.password==''  || that.data.password.length < 6){
                $('.info-msg').html('密码不得小于6位数');
            }else{
                _user.resetPass(that.data,function resolve(res){
                    window.location.href = './result.html?type=resetPass';
                }, function reject(err){
                    $('.info-msg').html(err);
                })
            }
        });
        //清空提示框
        $(".user-input #password").focus(function(){
            $('.info-msg').html('');
        })
    },
    loadHtml:function(){
        var that=this.data;
        var resultHtml= _tip.getRenderHtml(template,that);
        $('.clearfix').siblings().remove().end().before(resultHtml);

    }
};

$(function(){
    page.init();
});
