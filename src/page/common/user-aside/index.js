/**
 * Created by user-pc on 2017/8/19.
 */
require('./index.css');
var template=require('./user-aside.string');

var _tip=require('util/tip.js');


var user_aside={
    option:{
        name:'',
        navList:[
            { name:'user-center',value:'个人中心',href:'./user-center.html'},
            { name:'order-list',value:'我的订单',href:'./order-list.html'},
            { name:'user-update-pass',value:'修改密码',href:'./user-update-pass.html'},
            { name:'about',value:'关于myMarket',href:'./about.html'}
        ]
    },
    init:function(option){
        /*合并选项*/
        $.extend(this.option,option);
        this.renderHtmlNav(option);
    },
    /*渲染导航条菜单*/
    addEvent:function(){},
    renderHtmlNav:function(option){
  //计算active数据
        var that=this;
        for(var i=0,len=this.option.navList.length;i<len;i++){
           if(this.option.name == this.option.navList[i].name){
               this.option.navList[i].isActive=true;
           }
        }
        //渲染左菜单模板数据，主要记录活动标签
        var asideHtml=_tip.getRenderHtml(template,{
            navList:this.option.navList
        });
       //把list菜单html放入容器
        $('.aside-ul').append(asideHtml)
    }

};

module.exports=user_aside;
