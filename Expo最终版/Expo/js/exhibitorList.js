$.ajax(  
    {  
        type:'get',  
        url : 'http://39.108.95.14/api/company/list',  
        dataType : 'text json',  
        jsonp:"jsoncallback",  
        success  : function(response) {  
            handleCompanies(response.data);
        },  
        error : function() {  
            console.log("获取活动列表失败") 
        }  
    }  
);


// 处理活动
function handleCompanies(array) {

    var companyHtml = ""

    for(var i = 0; i < array.length; i ++) {

        var company = array[i];

        var head = "<li class='contact'>"
        var midd = company.name;
        var tail = "</li>"

        companyHtml = companyHtml + (head + midd + tail);

    }

    $("#exhibitorListContainer").html(companyHtml);
    
}