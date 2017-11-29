
var INDEX_URL       = "http://120.78.206.170/api/homepage/all"

var INDEX_BANNERS   = "http://120.78.206.170/api/banner/list"

var ABOUT_INTRO     = "http://120.78.206.170/api/about/list?parent=0"
var ABOUT_MAN       = "http://120.78.206.170/api/about/list?parent=1"
var ABOUT_HONOR     = "http://120.78.206.170/api/about/list"
var ABOUT_ADVAN     = "http://120.78.206.170/api/about/list?parent=3"

var CULTURE_HISTORY = "http://120.78.206.170/api/culture/list"
var CULTURE_MISSION = "http://120.78.206.170/api/culture/list?parent=1"
var CULTURE_LIFE    = "http://120.78.206.170/api/culture/list?parent=2"

var COMPANY_NEWS    = "http://120.78.206.170/api/news/list?parent=0"
var INDUSTRY_NEWS   = "http://120.78.206.170/api/news/list?parent=1"

var NEWS_DETAIL     = "http://120.78.206.170/api/news/getById?id="

var PRODUCTS_LIST   = "http://120.78.206.170/api/product/list"
var PRODUCT_DETAIL  = "http://120.78.206.170/api/product/getById?id="

var GLOBAL_FOOTER   = "http://120.78.206.170/api/homepage/footer"

var CONTACT_PHONE   = "http://120.78.206.170/api/contact/list?parent=0"
var CONTACT_HR      = "http://120.78.206.170/api/contact/list?parent=1"



// **************************************页面加载运行 start*************************************



//全局数据处理
APPInit();


// **************************************页面加载运行 end  *************************************




//所有页面footer处理
function footerInit() {

    $.ajax(
        {  
            type:'get',  
            url : GLOBAL_FOOTER,  
            dataType : 'text json',  
            jsonp:"jsoncallback",  
            success  : function(response) {  

                console.log(response.data);

                //处理footer数据
                $("#footer_address").text(response.data.address);
                $("#footer_phone").text(response.data.phone);
                $("#footer_email").text(response.data.mail);


            },  
            error : function() {  
                console.log('获取首页数据失败')  
            }  
        }  
    );

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

            for(var i = 0; i < response.rows.length; i ++) {

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

    //导航栏添加点击事件
    makeNavClickable();

    //二级子菜单添加点击事件
    makeMenuClickable();

    //处理页脚本地数据
    footerInit();

    //logo添加点击返回首页
    toHome();


    if (document.title == "首页") {

        //处理视频
        $("#videoCover").click(function(){
            $("#videoCover").fadeOut();

            setTimeout(function(){

                $("#videoPlayer").fadeIn();

            }, 500);
            

        });



        //处理轮播
        coversMove();

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

                    //处理关于津驰图片和文本
                    $("#about_img").attr('src',response.data.imgUrl);
                    $("#about_content").text(response.data.introduction);

                    //处理最下方三张图片
                    $("#sns_1").attr('src',response.data.mediaUrls[0]);
                    $("#sns_2").attr('src',response.data.mediaUrls[1]);
                    $("#sns_3").attr('src',response.data.mediaUrls[2]);

                    //处理视频
                    let videoPlayerFullURl = "http://player.youku.com/embed/" + response.data.videoUrl;
                    $("#videoPlayer").attr('src',videoPlayerFullURl);

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

    } else if (document.title == "公司动态") {

        //处理新闻列表
        newsListAll(0, 1);

    } else if (document.title == "行业新闻") {

        //处理行业新闻列表
        newsListAll(1, 1);

    } else if (document.title == "公司动态详情") {

        makeDetail();

    } else if (document.title == "行业新闻详情") {

        makeDetail();

    } else if (document.title == "联系我们") {

        makePhone(0);

    } else if (document.title == "人力资源") {

        makePhone(1);

    }  else {



    }

}

//处理联系我们
function makePhone(type) {

    var urlTemp = CONTACT_PHONE

    if (type == 1) {

        urlTemp = CONTACT_HR

    }

    $.ajax(  
    {  
            type:'get',  
            url : urlTemp,  
            dataType : 'text json',  
            jsonp:"jsoncallback",  
            success  : function(response) {  

                console.log(response);

                $("#contact_phone_title").text(response.rows[0].title);
                $("#contact_phone_content").html(response.rows[0].content);

                if (type == 0) {

                    $("#contact_phone_img").attr('src',response.rows[0].imgUrl);

                } else {
                    let position = "url(" + response.rows[0].imgUrl + ")";
                    $("#contact_phone_img").css("background-image", position);

                }
                

            },  
            error : function() {  
                console.log('获取首页数据失败')  
            }  
        }  
    );

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



//处理新闻列表或者动态列表
function newsListAll(type, page) {

    var urlTemp = COMPANY_NEWS + "&pageSize=10&currentPage=" + page;

    if (type == 1) {

        urlTemp = INDUSTRY_NEWS + "&pageSize=10&currentPage=" + page;

    }

    $.ajax(  
    {  
        type:'get',  
        url : urlTemp,  
        dataType : 'text json',  
                jsonp:"jsoncallback",  
        success  : function(response) {  

            console.log(response);

            //列表html拼接
            var tempHTML = ""

            var rows = response.rows;

            if (page == 1) {

                //初始化分页
                $('.M-box').pagination({
                    totalData:response.total,
                    showData:10,
                    callback:function(api){
                        newsListAll(type, api.getCurrent());
                    }
                });

            }

            for (var i = 0; i < rows.length; i ++) {

                var row   = rows[i];

                var date  = new Date(row.createTimeStr);

                var year  = date.getFullYear() + "";

                var month = (date.getMonth() +1 ) + "";

                var day   = date.getDate() + "";

                var dayTitle = day;

                var yearAndMonthTitle = year + "/" + month;

                var fullTimeTitle = day + "/" + month + "," + year;

                tempHTML  += "<div class='item'><div class='index'><div class='text'><div class='day'>" + day + "</div><div class='yearAndMonth'>" + yearAndMonthTitle + "</div></div></div><div class='titleAndText'><div class='bigDate'><span>" + fullTimeTitle + "</span></div><div class='title'>" + row.title + "</div><div class='text'> " + row.abstr + " </div><div class='moreDiv'><img src='images/news_detailicon.png'><span>查看详情</span></div></div><div class = 'forFirst'><img src='" + row.imgUrl + "'></div></div>";

            }

             $("#content_items").html(tempHTML);

             //第一条最左边日期隐藏
             var indexes = $(".paras .index");

             $(indexes[0]).css("display", "none");

             //隐藏剩余元素更多按钮
             var moreDivs = $(".paras .moreDiv");

             moreDivs.each(function(index, data){

                if (index != 0) { 

                    $(data).css("display", "none"); 

                } else {

                    //绑定点击事件
                    $(data).click(function() {

                        var bigID = rows[index].id;

                        if (type == 0) {

                            window.location.href = "news_detail.html?id=" + bigID + "&type=0";

                        } else {

                            window.location.href = "industry_detail.html?id=" + bigID + "&type=1";

                        }
                        

                    });

                }


             });

             //隐藏剩余元素右边图片
             var feedIcons = $(".paras .forFirst");

             feedIcons.each(function(index, data){

                if (index != 0) { $(data).css("display", "none"); }

             });

             //隐藏剩余元素大标题
             var bigtitles = $(".paras .bigDate");

             bigtitles.each(function(index, data){

                if (index != 0) { $(data).css("display", "none"); }

             });

             //标题添加点击事件
             var clickbleTitles = $(".paras .content .items .title");

             clickbleTitles.each(function(index, data){

                 //绑定点击事件
                    $(data).click(function() {

                        var bigID = rows[index].id;

                        if (type == 0) {

                            window.location.href = "news_detail.html?id=" + bigID + "&type=0";

                        } else {

                            window.location.href = "industry_detail.html?id=" + bigID + "&type=1";

                        }
                        

                    });

             });


        },  
        error : function() { 

            console.log('获取首页数据失败');

        }  
    });

}


//处理公司新闻、行业新闻详情
function makeDetail() {

    var id = 0;
    //获取页面URL传过来的ID
    var url = location.search;

    var type = 0;

    if (url.indexOf("?") != -1) {  

        var str = url.substr(1);  

        var strs = str.split('&');  

        if (strs.length > 1) {

            var kvs = strs[0].split('=');

            if (kvs.length == 2) {

                var v = kvs[1];

                id = v;

            }

            var kvs2 = strs[1].split('=');

            if (kvs2.length == 2) {

                var v = kvs2[1];

                type = v;

            }

        }
    }

    //请求详情
    var urlTemp = NEWS_DETAIL + id;

    $.ajax(  
    {  
        type:'get',  
        url : urlTemp,  
        dataType : 'text json',  
                jsonp:"jsoncallback",  
        success  : function(response) {  

            $("#detail_title").text(response.title);
            $("#detail_date").text(response.createTimeStr);
            $("#detail_content").html(response.content);


        },  
        error : function() { 

            console.log('获取首页数据失败');

        }  
    });

    //获取id数组，用于做上一条、下一条详情
    var urlListTemp = COMPANY_NEWS + "?pageSize=100&currentPage=1";

    if (type == 1) {

        urlListTemp = INDUSTRY_NEWS + "&pageSize=100&currentPage=1";

    }

    var ids = [];

    $.ajax(  
    {  
        type:'get',  
        url : urlListTemp,  
        dataType : 'text json',  
                jsonp:"jsoncallback",  
        success  : function(response) {  

            for (var i = 0; i < response.rows.length; i++) {

                ids.push(response.rows[i].id);

            }


        },  
        error : function() { 

            console.log('获取首页数据失败');

        }  
    });


    //上一页新闻事件点击
    $("#detail_pre").click(function(){

        //获取当前详情页面id的Index
         var currentIDInt = Number(id);

         var currentIndex = ids.indexOf(currentIDInt);

         var willBeIndex = currentIndex - 1;

         if (willBeIndex >= 0) {

            var willBeID = ids[willBeIndex];

            if (type == 0) {

                window.location.href = "news_detail.html?id=" + willBeID + "&type=0";

            } else {

                window.location.href = "industry_detail.html?id=" + willBeID + "&type=1";

            }

         }

    });


    //下一页新闻事件点击
    $("#detail_next").click(function(){

        //获取当前详情页面id的Index
         var currentIDInt = Number(id);

         var currentIndex = ids.indexOf(currentIDInt);

         var willBeIndex = currentIndex + 1;

         if (willBeIndex < ids.length) {

            var willBeID = ids[willBeIndex];

            if (type == 0) {

                window.location.href = "news_detail.html?id=" + willBeID + "&type=0";

            } else {

                window.location.href = "industry_detail.html?id=" + willBeID + "&type=1";

            }

         }

    });


}