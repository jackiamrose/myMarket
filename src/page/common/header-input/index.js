/**
 * Created by user-pc on 2017/8/19.
 */
require('./index.css');
require('jquery');
var _tip=require('util/tip.js');

/*搜索栏*/
var header_input={
    init:function(){
      this.onload();
      this.addEvent();

    },
    onload:function(){
        var keyword =_tip.getUrlParam("keyword");
        if(keyword){
            $('.nav-t-input').val(keyword);
        }
    },
    addEvent:function(){
        var that=this;
        /*点击按钮提交搜索*/
        $('.nav-t span').click(function(){
            that.submitValue();
        });
        /*输入回车提交*/
        $('.nav-t-input').on("keyup",function(e){
            /*判断回车键提交*/
            if(e.keyCode === 13){
                that.submitValue();
            }
        })
    },
    /*提交搜索栏值*/
    submitValue:function(){
        var searchValue=$.trim($('.nav-t-input').val());
        /*如果有值就提交*/
        if(searchValue){
            window.location.href="./list.html?keyword="+searchValue;
        }
        /*否则跳转到当前页面*/
        else{
            _tip.goHome();
        }
    }
};


$(function(){
    header_input.init();
});

