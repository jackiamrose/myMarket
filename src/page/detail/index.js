/**
 * Created by user-pc on 2017/8/22.
 */
require('../../page/common/header-nav/index.js');
require('../../page/common/header-input/index.js');

require('./index.css');
var template=require('./detail.string');
var _tip=require('util/tip.js');
var _product=require('service/product-service.js');

var page={
    data:{

    },
    init:function(){
        if(!_tip.getUrlParam('productId')){
            _tip.goHome();
        }
        this.loadDetail();
    },
    loadDetail:function(){
        var that=this;
        _product.getProductDetail(_tip.getUrlParam('productId'),function(res){
            that.data=res;
            /*切割图片为几个，存入的是图片字符串*/
            that.data.subImages=res.subImages.split(',');
            console.log(that.data);
            var detailHtml=_tip.getRenderHtml(template,that.data);
            $('.container').html(detailHtml);
            that.addEvent();
        },function(err){
            $('.container:eq(0)').html(err);
        })
    },
    addEvent:function(){
        var that=this;
        //输入产品数量判断
        $('.button').click(function(){
            var stock=that.data.stock;
            var inputData=$('#input');
            if( inputData.val() =='' || inputData.val() === 0){
                inputData.val('1');
            }

            if(inputData.val() > stock){
                $('.product-msg').show();
                $('.button').attr('disabled','disabled')
            }else{
                _cart.addToCart({
                    producId:that.data.productId,
                    count:inputData.val()
                },function(res){
                    alert('加入购物车成功！');
                },function(err){
                    
                })
            }
        })


    }
};


$(function(){
    page.init();
});