
fetchTitles()

function fetchTitles() {
	$.ajax(  
    {  
        type:'get',  
        url : 'http://39.108.95.14/api/history/list',  
        dataType : 'text json',  
        jsonp:"jsoncallback",  
        success  : function(response) {  
            
            handleTitles(response.data);

        },  
        error : function() {  
            console.log("获取新闻列表失败") 
        }  
    }  
);
}

function fetchDetail(id) {
	$.ajax(  
    {  
        type:'get',  
        url : 'http://39.108.95.14/api/history/detail/' + id,  
        dataType : 'text json',  
        jsonp:"jsoncallback",  
        success  : function(response) {  
            
            handleDetail(response.data);

        },  
        error : function() {  
            console.log("获取新闻列表失败") 
        }  
    }  
);
}

function handleDetail(detail) {
	$("#reviewTitle").text(detail.name);
	$("#reviewContent").html(detail.content);
}

function handleTitles(titles) {
	var baseHtml = ""
	for (var i = 0; i < titles.length; i ++) {
		var model = titles[i];
		var temp = "<div class = 'item line'><a onclick = 'toogle("+ i + "," + model.id +")' href = '#'>"+ model.name +"</a></div>";

		baseHtml += temp;
	}

	$("#reviewTitles").html(baseHtml);

	toogle(0, titles[0].id);
	
}

function toogle(index, id) {
	var items = $(".sideBar .item a");
    for (var i=0; i < items.length; i ++) {
        $(items[i]).removeClass("active");
    }

    $(items[index]).addClass("active");

    fetchDetail(id);

}