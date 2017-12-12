$.ajax(  
    {  
        type:'get',  
        url : 'http://39.108.95.14/api/downloads/listInfos',  
        dataType : 'text json',  
        jsonp:"jsoncallback",  
        success  : function(response) {  
            handleHotelsList(response.data);
        },  
        error : function() {  
            console.log("获取活动列表失败") 
        }  
    }  
);

var temp;

function handleHotelsList(hotelArray) {

    temp = hotelArray;

    var hotelHtml = ""

    for(var i = 0; i < hotelArray.length; i ++) {

        var hotel = hotelArray[i];

        hotelHtml +=

        "<div class='linkBox' onClick = 'get("+  hotel.id + ")' > <div class='leading'> <img src='images/ico_download1.png'><span>"+ hotel.title +"</span> </div> <div class='traing'> <img src='images/ico_download2.png'> </div> </div>"



    }

    $("#audienceDownloadContainer").html(hotelHtml);
}

function get(id) {
     for (var i = 0; i < temp.length; i ++) {
        if (id == temp[i].id) {
            window.location.href = temp[i].url;
        }
     }
}