/**
 * Created by user-pc on 2017/8/21.
 */
require('../../page/common/header-nav/index.js');
require('../../page/common/header-input/index.js');

require('./index.css');

var _tip=require('util/tip.js');
var _product=require('service/product-service.js');
var template=require('./list.string');

var listPage={
    data:{
        productList:{
           keyword:_tip.getUrlParam('keyword')|| '',
           categoryId:_tip.getUrlParam('categoryOId')|| '',
           orderBy:_tip.getUrlParam('orderBy') ||'default',
           pageNum:_tip.getUrlParam('pageNum'),
           pageSize:_tip.getUrlParam('pageSize')|| 20
        }
    },
    init:function(){
        this.loadList();
        this.addEvent();
    },
    addEvent:function(){
        var _that=this;
        var that=this.data.productList;
        $('.sort span').click(function(){
            var th=$(this);
            //默认排序
            if(th.data('type')==='default') {
                if(th.hasClass('active')){
                    return;
                }else{
                    th.addClass('active').siblings().removeClass('active desc asc');
                    that.orderBy='default';
                }
            }else if(th.data('type')==='price'){
                // 价格排序
                if(th.hasClass('active')){
                   th.removeClass('active desc').addClass('asc');
                   that.orderBy='price_asc';
                }else{
                    th.removeClass('asc').addClass('active desc').siblings().removeClass('active');
                    that.orderBy='price_desc';
                }
            }
            _that.loadList();
        });

    },
    //加载产品列表信息
    loadList:function(){
        var that=this;
        var productList=this.data.productList;
        // 删除参数中不必要的字段
        productList.categoryId
            ? (delete productList.keyword) : (delete productList.categoryId);
        _product.getProductList(productList,function(res){
           var productHtml= _tip.getRenderHtml(template,{list:res.list});
           $('.product-list').html(productHtml);
           //加载分页信息
           that.loadPagenation()

         },function(err){
            _tip.errorTip(err);
         })
    },
    loadPagenation:function(){

    }

};


$(function(){
    listPage.init();
});
