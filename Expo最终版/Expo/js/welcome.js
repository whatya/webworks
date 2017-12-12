function fetchHomepage() {

	$.ajax(  
    {  
        type:'get',  
        url : 'http://www.sportswuhan.com/api/homepage/base',  
        dataType : 'text json',  
        jsonp:"jsoncallback",  
        success  : function(response) {  
            
            handleHomepage(response.data);

        },  
        error : function() {  
            alert('fail');  
        }  
    }  
	);
}

function handleHomepage(data) {
    console.log(data);

    $("#timeStr").text(data.time);
    $("#addressStr").text(data.address);
    $("#logoImg").attr("src", data.logoUrl);

    // 设置到local里
    try {
        localStorage.setItem("beginTime", data.beginTime);
        localStorage.setItem("timeStr", data.time);
        localStorage.setItem("addressStr", data.address);
    } catch (error) {
        alert("在隐私模式下浏览时间显示可能有误，请见谅！");
    }
}
