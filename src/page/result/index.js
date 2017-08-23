/**
 * Created by user-pc on 2017/8/19.
 */
require('../common/header-nav-simple/index.css');
require('./index.css');
var _tip=require('util/tip.js');

$(function(){
    var type= _tip.getUrlParam('type') || 'default';
    $element=$('.' + type + '-success');
    //显示对应的提示元素
    $element.show();
});