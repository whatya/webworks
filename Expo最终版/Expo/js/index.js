
var HOME_PAGE = "http://39.108.95.14/api/homepage/all";

fetchHome();
fetchCover()
fetchCompanies();
fetchMedias();

// 首页页面导航
function toNext(index) {
    if (index == 1) {
        window.location.href = "exhibitor_sign.html";
    } else if (index == 2) {
        window.location.href = "audience_sign.html";
    } else if (index == 3) {
        window.location.href = "index_media_sign.html";
    } else if (index == 4) {
        window.location.href = "exhibitor_position.html";
    } else if (index == 5) {
        window.location.href = "news.html";
    } else if (index == 6) {
        window.location.href = "events.html";
    } else if (index == 7) {
        window.location.href = "about_download.html";
    } else {
        // do nothing
    }
}

//获取轮播图
function fetchCover() {
    $.ajax(  
    {  
        type:'get',  
        url : 'http://39.108.95.14/api/sliders/new?size=5',  
        dataType : 'text json',  
        jsonp:"jsoncallback",  
        success  : function(response) {  

            console.log(response.data);

            var files = response.data;

            var coversHtml = "";

            var temp = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503158036959&di=79e2eb7198c88a8a991df304093c5146&imgtype=0&src=http%3A%2F%2Fwww.zhlzw.com%2FUploadFiles%2FArticle_UploadFiles%2F201204%2F20120412123925693.jpg";

            for(var i = 0; i < files.length; i ++) {

                var file = files[i];

                var item = "<img src='" + file.src + "'>";

                coversHtml = coversHtml + item;

            }

            $(".coverContainer").html(coversHtml);

            $('.coverContainer').slick({
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
            });


        },  
        error : function() {  
            console.log('获取首页数据失败')  
        }  
    }  
);
}
 
//获取轮播展商
function fetchCompanies() {
     $.ajax(  
    {  
        type:'get',  
        url : 'http://www.sportswuhan.com//api/company/list?status=1',  
        dataType : 'text json',  
        jsonp:"jsoncallback",  
        success  : function(response) {  

            console.log(response.data);

            var files = response.data;

            var companiesHtml = ""

            for(var i = 0; i < files.length; i ++) {

                var file = files[i];

                var item = "<div class='pic'><img onclick='window.open(\""+ file.url + "\",\"_blank_\")' src='" + file.imageUrl + "'></div>";

                companiesHtml = companiesHtml + item;

            }

            $("#forSlick").html(companiesHtml)

            $('#forSlick').slick({
                variableWidth: true,
                arrows: true,
                prevArrow: $("#famous .arrowLeft"),
                nextArrow: $("#famous .arrowRigh"),
                slidesToShow: 8,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
            });


        },  
        error : function() {  
            console.log('获取首页数据失败')  
        }  
    }  
);
}

//获取底部媒体图片
function fetchMedias() {
     $.ajax(  
    {  
        type:'get',  
        url : 'http://www.sportswuhan.com/api/medias/list?status=1',  
        dataType : 'text json',  
        jsonp:"jsoncallback",  
        success  : function(response) {  

            console.log(response.data);

            var files = response.data;

            var mediasHtml = ""

            for(var i = 0; i < files.length; i ++) {

                var file = files[i];

                var item = "<div class='icon'><img onclick='window.open(\""+ file.url + "\",\"_blank_\")' src='" + file.image + "'></div>";

                mediasHtml = mediasHtml + item;

            }

            $("#partnerIcons").html(mediasHtml);

        },  
        error : function() {  
            console.log('获取媒体数据失败')  
        }  
    }  
);
}


// 获取首页数据
function fetchHome() {
	$.ajax(  
    {  
        type:'get',  
        url : 'http://39.108.95.14/api/homepage/all',  
        dataType : 'text json',  
        jsonp:"jsoncallback",  
        success  : function(response) {  

            console.log(response.data);
            
            handleHomeNews(response.data.news);

            handleEvents(response.data.activities);

            handleIntroduction(response.data.introduction);

            handleDownloads(response.data.downloads);

        },  
        error : function() {  
            console.log('获取首页数据失败')  
        }  
    }  
);
}

// 处理新闻
function handleHomeNews(newsArray) {

    var newsHtml = ""

    for(var i = 0; i < newsArray.length; i ++) {

        if (i == 5) { break; }

        var news = newsArray[i];

        var head = "<div class='item' " + "onclick='toNewsDetail("+ news.id +")'" + " > <div class='dot'></div><div class='text'>"
        var midd = news.title;
        var tail = "</div></div>"

        newsHtml = newsHtml + (head + midd + tail);

    }

    $("#newsContainer").html(newsHtml);

}

// 新闻详情导航
function toNewsDetail(id) {
    window.location.href= "news_detail.html?id=" + id;
}

// 处理活动
function handleEvents(eventsArray) {

    var eventsHtml = ""

    for(var i = 0; i < eventsArray.length; i ++) {

        if (i == 8) { break; }

        var event = eventsArray[i];

        var head = "<li " + "onclick='toEventsDetail("+ event.id +")'" + " >"
        var midd = event.title;
        var tail = "</li>"

        eventsHtml = eventsHtml + (head + midd + tail);

    }

    $("#eventsContainer").html(eventsHtml);
    
}

//处理介绍
function handleIntroduction(introduction) {
    $("#home_introduction").text(introduction)
}

//处理下载
function handleDownloads(files) {
    var downloadsHtml = ""

    for(var i = 0; i < files.length; i ++) {

        if (i == 8) { break; }

        var file = files[i];

        var item = "<div class='item'> <div><span class='text'>" + file.title + "</span></div><div><span class='link'><a href='"+file.url+"'>下载</a></span></div></div>";

        downloadsHtml = downloadsHtml + item;

    }

    $("#home_hdownloadsContainer").html(downloadsHtml)
}

function toEventsDetail(id) {
    window.location.href= "event_detail.html?id=" + id;
}
