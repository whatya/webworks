function fetchArticleDetail(id) {

	$.ajax(  
    {  
        type:'get',  
        url : 'http://www.sportswuhan.com/api/articles/getContent/'+ id,  
        dataType : 'text json',  
        jsonp:"jsoncallback",  
        success  : function(response) {  
            
            handleDetail(response.data, id);

        },  
        error : function() {  
            alert('fail');  
        }  
    }  
	);
}

function handleDetail(articles, id) {

    $("#articleContent").html(articles.content);
    
}
