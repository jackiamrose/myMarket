/**
 * Created by user-pc on 2017/8/19.
 */
require('./index.css');
var template=require('./index.string');
var _tip=require('util/tip.js');
var _user=require('service/user-service.js');

var nav={
    data:{
        loginFlag:true,
        dataInfo:{

        }
    },
    init:function(){
        this.loadHtml();

    },
    addEvent:function(){
        var dataInfo=this.data.dataInfo;
        //验证登录状态
        _user.checkLogin(function(res){
            $('.shopcar').click(function(){
                window.location.href='./cart.html?username='+dataInfo.username;
            });
            $('.shopcate').click(function(){
                window.location.href='./order-list.html?username='+dataInfo.username;
            });
            $('.tuichu').click(function(){
                _user.logout(function(res){
                    window.location.reload();
                },function(err){

                })

            })
        },function(err){

        });
    },
    loadHtml:function(){
        var that=this;
        _user.checkLogin(function(res){
            that.data.dataInfo=res;
            that.data.loginFlag=false;
            var navHtml=_tip.getRenderHtml(template,that.data);
            $('.nav.right').prepend(navHtml);
            $('.username').html(res.username);
            that.addEvent();
        },function(err){
            var navHtml=_tip.getRenderHtml(template,that.data);
            $('.nav.right').prepend(navHtml);
        })
    }
};

$(function(){
    nav.init();
});