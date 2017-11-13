
var INDEX_URL       = "http://120.78.206.170/api/homepage/all"

var ABOUT_INTRO     = "http://120.78.206.170/api/about/list?parent=0"
var ABOUT_MAN       = "http://120.78.206.170/api/about/list?parent=1"
var ABOUT_HONOR     = "http://120.78.206.170/api/about/list"
var ABOUT_ADVAN     = "http://120.78.206.170/api/about/list?parent=3"

var CULTURE_HISTORY = "http://120.78.206.170/api/culture/list"
var CULTURE_MISSION = "http://120.78.206.170/api/culture/list?parent=1"
var CULTURE_LIFE    = "http://120.78.206.170/api/culture/list?parent=2"

// **************************************页面加载运行 start*************************************

//导航栏添加点击事件
makeNavClickable();

//二级子菜单添加点击事件
makeMenuClickable();

//首页获取并处理数据
indexInit();


// **************************************页面加载运行 end  *************************************







//首页 获取处理数据
function indexInit() {

    if (document.title == "首页") {

        //接口获取数据
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