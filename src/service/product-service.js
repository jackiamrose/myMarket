/**
 * Created by user-pc on 2017/8/22.
 */
var _tip=require('util/tip.js');

var product={
    //获取产品信息
    getProductList:function(obj,resolve,reject){
        _tip.requestAjax({
            url:_tip.getServerParam('/product/list.do'),
            method:'POST',
            data:obj,
            success:resolve,
            error:reject
        })
    },
    getProductDetail:function(productId,resolve,reject){
        _tip.requestAjax({
            url:_tip.getServerParam('/product/detail.do'),
            method:'POST',
            data:{
                productId:productId
            },
            success:resolve,
            error:reject
        })
    }
};

module.exports=product;