
var url = location.search;    
if (url.indexOf("?") != -1) {  
    var str = url.substr(1);  
    var strs = str.split('&');  
    if (strs.length > 0) {
    	var kvs = strs[0].split('=');
    	if (kvs.length == 2) {
    		var v = kvs[1];
    		fetchNewsDetail(v);
    	}
    }
}


function fetchNewsDetail(id) {

	$.ajax(  
    {  
        type:'get',  
        url : 'http://39.108.95.14/api/news/detail/'+ id,  
        dataType : 'text json',  
        jsonp:"jsoncallback",  
        success  : function(response) {  
            
            handleDetail(response.data);

        },  
        error : function() {  
            alert('fail');  
        }  
    }  
	);
}

function handleDetail(news) {
    console.log(news)

	$("#newsTitle").text(news.title);
	$("#posttime").text(news.createTimeStr);
	$("#newsContent").html(news.content);
}