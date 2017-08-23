/**
 * Created by user-pc on 2017/8/18.
 */

require('../../page/common/header-nav/index.js');
require('../../page/common/header-input/index.js');
var _tip=require('util/tip.js');
var template=require('./image.string');
var banner1=require('image/banner/banner1.jpg');
var banner2=require('image/banner/banner2.jpg');
var banner3=require('image/banner/banner3.jpg');
var banner4=require('image/banner/banner4.jpg');
var banner5=require('image/banner/banner5.jpg');

require('./index.css');

var page={
    data:{
        imgList:[
            {
                href:'./list.html?categoryId=100021',
                url:banner1,
                title:'岁末好货'
            },
            {
                href:'./list.html?categoryId=100030',
                url:banner2,
                title:'酒要跨年'
            },
            {
                href:'./list.html?categoryId=100016',
                url:banner3,
                title:'女装新年焕然一新'
            },
            {
                href:'./list.html?categoryId=100001',
                url:banner4,
                title:'开年第一团'
            },
            {
                href:'./list.html?categoryId=100025',
                url:banner5,
                title:'金鸡报旺'
            }

        ]
    },
    init:function(){
        this.renderImg();
        this.slide()
    },
    renderImg:function(){
        var dataImgUrl=this.data.imgList;
        var imgHtml=_tip.getRenderHtml(template,{imgList:dataImgUrl});
        $('.swiper-wrapper').html(imgHtml);
    },
    slide:function(){
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 1,
            paginationClickable: true,
            spaceBetween: 30,
            loop: true,
            autoplay : 3000,
            speed:300
        });
    }
};

$(function(){
    page.init()
});
