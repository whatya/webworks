
initPageAndPagination()

//初始化页面，和分页数据
function initPageAndPagination() {

    var urlTemp = "http://39.108.95.14/api/activities/list?pageSize=5&currentPage=1";

        $.ajax(  
            {  
                type:'get',  
                url : urlTemp,  
                dataType : 'text json',  
                jsonp:"jsoncallback",  
                success  : function(response) { 
                    //首次填充列表
                    handleEventList(response.data); 
                    //初始化分页
                    $('.M-box').pagination({
                        totalData:response.total,
                        showData:5,
                        callback:function(api){
                            fetchEventsByPage(api.getCurrent());
                        }
                    });

                },  
                error : function() { 
                    console.log("获取活动列表失败"); 
                }  
            }  
        );   

}

function fetchEventsByPage(index) {

    var urlTemp = "http://39.108.95.14/api/activities/list?pageSize=5&currentPage=" + index;

        $.ajax(  
            {  
                type:'get',  
                url : urlTemp,  
                dataType : 'text json',  
                jsonp:"jsoncallback",  
                success  : function(response) { 
                    //首次填充列表
                    handleEventList(response.data); 
                },  
                error : function() { 
                    console.log("获取活动列表失败"); 
                }  
            }  
        );   

}





function handleEventList(eventArray) {

    var eventHtml = ""

    for(var i = 0; i < eventArray.length; i ++) {

        var event = eventArray[i];

        eventHtml +=

        "<div class='item' onclick='toEventDetail(" + event.id + ")'>" + 
            "<div class='avatar'><img src='"+ event.url +"' width='226px' height='171px'></div>" + 
            "<div class='content'>" + 
              "<div class='head'>" + event.title + "</div>" +
              "<div class='date'>" + event.createTimeStr + "</div>" +
              "<div class='text'>" + event.abstr + "</div>" +
            "</div>" +
        "</div>"


    }

    $("#eventContainer").html(eventHtml);
}

// 新闻详情导航
function toEventDetail(id) {
    window.location.href= "event_detail.html?id=" + id;
}