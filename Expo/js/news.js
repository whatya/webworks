
var type = 0



// 新闻初始化
fetchNews();

function fetchNews() {
    var urlTemp = "http://39.108.95.14/api/news/list?parent=" + type + "&pageSize=5" + "&currentPage=1";

    $.ajax(  
    {  
        type:'get',  
        url : urlTemp,  
        dataType : 'text json',  
        jsonp:"jsoncallback",  
        success  : function(response) {  

            handleNewsList(response.data);

            //初始化分页
            $('.M-box').pagination({
                totalData:response.total,
                showData:5,
                callback:function(api){
                    fetchNewssByPage(api.getCurrent());
                }
            });

        },  
        error : function() {  
            console.log("获取新闻列表失败");
        }  
    }  
);
}

function fetchNewssByPage(index) {
    var urlTemp = "http://39.108.95.14/api/news/list?parent=" + type + "&pageSize=5" + "&currentPage=" + index;

    $.ajax(  
    {  
        type:'get',  
        url : urlTemp,  
        dataType : 'text json',  
        jsonp:"jsoncallback",  
        success  : function(response) {  

            handleNewsList(response.data);

        },  
        error : function() {  
            console.log("获取新闻列表失败");
        }  
    }  
);
}



function handleNewsList(newsArray) {

    var newsHtml = ""

    for(var i = 0; i < newsArray.length; i ++) {

        var news = newsArray[i];

        newsHtml +=

        "<div class='item' onclick='toNewsDetail(" + news.id + ")'>" + 
            "<div class='avatar'><img src='"+ news.url +"' width='226px' height='171px'></div>" + 
            "<div class='content'>" + 
              "<div class='head'>" + news.title + "</div>" +
              "<div class='date'>" + news.createTimeStr + "</div>" +
              "<div class='text'>" + news.abstr + "</div>" +
            "</div>" +
        "</div>"


    }

    $("#newsContainer").html(newsHtml);
}



// 新闻详情导航
function toNewsDetail(id) {
    window.location.href= "news_detail.html?id=" + id;
}



function toogle(index) {
    var items = $(".sideBar .item a");
    for (var i=0; i < items.length; i ++) {
        $(items[i]).removeClass("active");
    }

    $(items[index]).addClass("active");

    this.type = index
    fetchNews()

}