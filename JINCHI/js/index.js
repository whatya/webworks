
var INDEX_URL       = "http://120.78.206.170/api/homepage/all"

var INDEX_BANNERS   = "http://120.78.206.170/api/banner/list"

var ABOUT_INTRO     = "http://120.78.206.170/api/about/list?parent=0"
var ABOUT_MAN       = "http://120.78.206.170/api/about/list?parent=1"
var ABOUT_HONOR     = "http://120.78.206.170/api/about/list"
var ABOUT_ADVAN     = "http://120.78.206.170/api/about/list?parent=3"

var CULTURE_HISTORY = "http://120.78.206.170/api/culture/list"
var CULTURE_MISSION = "http://120.78.206.170/api/culture/list?parent=1"
var CULTURE_LIFE    = "http://120.78.206.170/api/culture/list?parent=2"

var COMPANY_NEWS    = "http://120.78.206.170/api/news/list"
var INDUSTRY_NEWS   = "http://120.78.206.170/api/news/list?parent=1"

var PRODUCTS_LIST   = "http://120.78.206.170/api/product/list"
var PRODUCT_DETAIL  = "http://120.78.206.170/api/product/getById?id="

// **************************************页面加载运行 start*************************************



//全局数据处理
APPInit();


// **************************************页面加载运行 end  *************************************




//所有页面footer处理（本地化存储获取）
function localFooterInit() {
    $("#footer_address").text(localStorage.footer_address);
    $("#footer_phone").text(localStorage.footer_phone);
    $("#footer_mail").text(localStorage.footer_mail);

}

//logo添加点击返回首页
function toHome() {

    //logo点击返回首页
    $("#header_logo").click(function(){

        window.location.href = "index.html"

    });
}

//处理轮播
function coversMove() {

    $.ajax(  
    {  
        type:'get',  
        url : INDEX_BANNERS,  
        dataType : 'text json',  
        jsonp:"jsoncallback",  
        success  : function(response) {  

            var coversHtml = "";

            for(var i = 0; i < 4; i ++) {

                var file = response.rows[i];

                var item = "<img src='" + file.imgUrl + "'>";

                coversHtml = coversHtml + item;

            }

            $("#banner_images").html(coversHtml);



            $('#banner_images').slick({
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
            });

            setTimeout(function(){

                $(".banner img").css("height","auto");

            }, 1000);


        },  
        error : function() {

            console.log('获取首页数据失败');

        }  
    });

}

// 处理产品详情
function productDetial(id) {

    var urlTemp = PRODUCT_DETAIL + id;

    $.ajax(  
    {  
        type:'get',  
        url : urlTemp,  
        dataType : 'text json',  
        jsonp:"jsoncallback",  
        success  : function(response) {  

            console.log(response);

            $("#product_title").text(response.title);

            $("#product_date").text(response.createTimeStr);

            $("#product_content").html(response.content);

        },  
        error : function() {

            console.log('获取产品详情失败');

        }  
    });

}

//全局入口
function APPInit() {

    //处理轮播
    coversMove();

    //导航栏添加点击事件
    makeNavClickable();

    //二级子菜单添加点击事件
    makeMenuClickable();

    //处理页脚本地数据
    localFooterInit();

    //logo添加点击返回首页
    toHome();


    if (document.title == "首页") {

        //关于津驰更多点击按钮
        $("#index_more_btn").click(function(){
            window.location.href = "about_Intro.html"
        });

        //获取新闻以外的数据
            $.ajax(  
            {  
                type:'get',  
                url : INDEX_URL,  
                dataType : 'text json',  
                jsonp:"jsoncallback",  
                success  : function(response) {  

                    console.log(response.data);

                    //处理footer数据
                    $("#footer_address").text(response.data.address);
                    $("#footer_phone").text(response.data.phone);
                    $("#footer_mail").text(response.data.mail);

                    //存储footer数据到本地
                    localStorage.footer_address = response.data.address
                    localStorage.footer_phone   = response.data.phone
                    localStorage.footer_mail    = response.data.mail

                    //处理关于津驰图片和文本
                    $("#about_img").attr('src',response.data.imgUrl);
                    $("#about_content").text(response.data.introduction);

                    //处理最下方三张图片
                    $("#sns_1").attr('src',response.data.mediaUrls[0]);
                    $("#sns_2").attr('src',response.data.mediaUrls[1]);
                    $("#sns_3").attr('src',response.data.mediaUrls[2]);

                },  
                error : function() {  
                    console.log('获取首页数据失败')  
                }  
            }  
        );

        //处理第一条新闻
        $.ajax(  
            {  
                type:'get',  
                url : COMPANY_NEWS,  
                dataType : 'text json',  
                jsonp:"jsoncallback",  
                success  : function(response) {  

                    console.log(response);

                    var firstNews = response.rows[0];

                    $("#topNews_title").text(firstNews.title);

                    $("#topNews_content").text(firstNews.abstr);


                },  
                error : function() {  
                    console.log('获取首页数据失败')  
                }  
            }  
        );

        //处理头四条新闻
        $("#listNews_companySelected").click(function(){

            //处理红条的位置
            $("#listNews_segment").css("margin-left","20px");

            //处理头四条新闻
            homeTop4(0);


        });

        //初始化调用
        homeTop4(0);

        //处理头三条动态
        $("#listNews_industrySelected").click(function(){

            //设置红条的位置
            $("#listNews_segment").css("margin-left","130px");

            //处理头四条动态
            homeTop4(1);

        });

    } else if (document.title == "津驰介绍") {

        //接口获取数据
            $.ajax(  
            {  
                type:'get',  
                url : ABOUT_INTRO,  
                dataType : 'text json',  
                jsonp:"jsoncallback",  
                success  : function(response) {  

                    console.log(response.rows);

                    //处理文本
                    $("#about_intro_content").text(response.rows[0].content);

                    //处理3张图片
                    $("#about_intro_img1").attr('src',response.rows[0].imgUrls[0]);
                    $("#about_intro_img2").attr('src',response.rows[0].imgUrls[1]);
                    $("#about_intro_img3").attr('src',response.rows[0].imgUrls[2]);


                },  
                error : function() {  
                    console.log('获取首页数据失败')  
                }  
            }  
        );

    } else if (document.title == "董事长致辞") {

        //接口获取数据
            $.ajax(  
            {  
                type:'get',  
                url : ABOUT_MAN,  
                dataType : 'text json',  
                jsonp:"jsoncallback",  
                success  : function(response) {  

                    console.log(response.rows);

                    //处理文本
                    $("#about_man_content1").text(response.rows[0].content);
                    $("#about_man_content2").text(response.rows[0].content);

                    //处理图片
                    $("#about_man_img").attr('src',response.rows[0].imgUrls[0]);

                },  
                error : function() {  
                    console.log('获取首页数据失败')  
                }  
            }  
        );

    } else if (document.title == "荣誉资质") {

        //接口获取数据
            $.ajax(  
            {  
                type:'get',  
                url : ABOUT_HONOR,  
                dataType : 'text json',  
                jsonp:"jsoncallback",  
                success  : function(response) {  

                    console.log(response.rows);

                    var tempHTML = ""

                    for (var i = 0; i < response.rows.length; i ++) {

                        var row = response.rows[i];

                        var index = i + 1;

                        tempHTML = tempHTML + "<div class='item'><div class='index'><div class='text'>" + index + "</div></div><div class='textAndPhoto'><div class='text'>" + row.content + "</div><div class='photo'><img src='" + row.imgUrls[0] + "'/></div></div></div>"

                    }

                    $("#about_honor_items").html(tempHTML);

                },  
                error : function() {  
                    console.log('获取首页数据失败')  
                }  
            }  
        );

    } else if (document.title == "企业优势") {

        //接口获取数据
            $.ajax(  
            {  
                type:'get',  
                url : ABOUT_ADVAN,  
                dataType : 'text json',  
                jsonp:"jsoncallback",  
                success  : function(response) {  

                    console.log(response.rows);

                    //处理文本
                    $("#about_advan_content1").text(response.rows[0].content);
                    $("#about_advan_content2").text(response.rows[0].content);

                    //处理图片
                    $("#about_advan_img").attr('src',response.rows[0].imgUrls[0]);

                },  
                error : function() {  
                    console.log('获取首页数据失败')  
                }  
            }  
        );

    } else if (document.title == "发展历程") {

        //接口获取数据
            $.ajax(  
            {  
                type:'get',  
                url : CULTURE_HISTORY,  
                dataType : 'text json',  
                jsonp:"jsoncallback",  
                success  : function(response) {  

                    console.log(response.rows);

                    var tempHTML = ""

                    for (var i = 0; i < response.rows.length; i ++) {

                        var row = response.rows[i];

                        if (i % 2 == 0) {

                            tempHTML = tempHTML + "<li><div class='direction-r'><div class='flag-wrapper'><span class='flag'>" + row.title + "</span></div><div class='desc'>" + row.content + "</div></div></li>";

                        } else {

                            tempHTML = tempHTML + "<li><div class='direction-l'><div class='flag-wrapper'><span class='flag'>" + row.title + "</span></div><div class='desc'>" + row.content + "</div></div></li>";


                        }


                    }

                    $("#culture_history_timeline").html(tempHTML);

                },  
                error : function() {  
                    console.log('获取首页数据失败')  
                }  
            }  
        );

    } else if (document.title == "文化理念") {

        //接口获取数据
            $.ajax(  
            {  
                type:'get',  
                url : CULTURE_MISSION,  
                dataType : 'text json',  
                jsonp:"jsoncallback",  
                success  : function(response) {  

                    console.log(response.rows);

                    $("#culture_mission_img").attr('src',response.rows[0].imgUrl);

                },  
                error : function() {  
                    console.log('获取首页数据失败')  
                }  
            }  
        );

    } else if (document.title == "员工生活") {

        //接口获取数据
            $.ajax(  
            {  
                type:'get',  
                url : CULTURE_LIFE,  
                dataType : 'text json',  
                jsonp:"jsoncallback",  
                success  : function(response) {  

                    console.log(response.rows);

                    $("#culture_life_img").attr('src',response.rows[0].imgUrl);

                },  
                error : function() {  
                    console.log('获取首页数据失败')  
                }  
            }  
        );

    } else if (document.title == "津驰产品") {

        $.ajax(  
        {  
            type:'get',  
            url : PRODUCTS_LIST,  
            dataType : 'text json',  
            jsonp:"jsoncallback",  
            success  : function(response) {

                var rows = response.rows;  

                //列表生成
                var listHtml = "";

                for(var i = 0; i < rows.length; i ++) {

                    var product = rows[i];

                    var item = "<div class='item'><div class='dota'></div><div class='text'>" + product.title +"</div></div>";

                    listHtml = listHtml + item;

                }

                $("#paras_outline").html(listHtml);

                //处理选中状态
                var titles = $("#paras_outline .item");

                titles.each(function(index, item){

                    $(item).click(function(){

                        //清除所有已选中的选项
                        titles.each(function(indexTemp, itemTemp){
                            $(itemTemp).css("background","white");
                        });

                        //添加选中项背景色
                        $(item).css("background","rgb(204, 204, 204)");

                        //获取选中的详情
                        let id = rows[index].id;

                        productDetial(id);

                    });

                    if (index == 0) {

                         //添加选中项背景色
                        $(item).css("background","rgb(204, 204, 204)");

                        //获取选中的详情
                        let id = rows[index].id;

                        productDetial(id);

                    }

                });

            },  
            error : function() {

                console.log('获取首页产品失败');

            }  
        });

    }  else {



    }

}


// 获取当前页面的导航名称
function currentPageName() {

    var hrefA = $(".header .box .items .item a.active");

    return hrefA.text();
}

//导航栏添加点击事件
function makeNavClickable() {

    var Urls = ["index.html", "about_Intro.html", "culture_history.html", "product.html", "news_company.html", "contact_phone.html", "#"];    

    var navs = $(".header .box .items .item");

    navs.each(function(index, item){

        var pageUrl  = Urls[index];

        $(item).click(function(){

            window.location.href = pageUrl;

        });

    });

}

// 中间菜单添加点击事件
function makeMenuClickable(){

    var Urls = { 
        "Introduction"              : "about_Intro.html", 
        "Chairman's speech"         : "about_man.html", 
        "Honorary qualification"    : "about_honor.html", 
        "Enterprise advantage"      : "about_advan.html", 
        "History"                   : "culture_history.html", 
        "Culture"                   : "culture_mission.html", 
        "Staff life"                : "culture_life.html", 
        "Company news"              : "news_company.html", 
        "Industry news"             : "news_industry.html", 
        "Contact"                   : "contact_phone.html", 
        "Human Resource"            : "contact_hr.html", 
    };    
    
        var navs = $(".menu .box .items .item");
    
        navs.each(function(index, item){

            var pageName = $(item).find(".subTitle").text();
    
            var pageUrl  = Urls[pageName];
    
            $(item).click(function(){
    
                window.location.href = pageUrl;
    
            });
    
        });

}

//首页 处理头四条新闻或行业动态
function homeTop4(type) {

    var urlTemp = COMPANY_NEWS;

    if (type == 1) {

        urlTemp = INDUSTRY_NEWS;

    }

    $.ajax(  
    {  
        type:'get',  
        url : urlTemp,  
        dataType : 'text json',  
                jsonp:"jsoncallback",  
        success  : function(response) {  

            var tempHTML = ""

            for (var i = 0; i < 4; i ++) {

                var row = response.rows[i];

                tempHTML = tempHTML + "<div class='item'>" + row.title + "</div>"

            }

            $("#listNews_items").html(tempHTML);

        },  
        error : function() { 

            console.log('获取首页数据失败');

        }  
    });

}