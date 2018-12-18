
var logo = $("#logo img");
logo.click(function(){
  window.location.href = "index.html"
});

$("#timeStr").text(localStorage.getItem("timeStr"));
$("#addressStr").text(localStorage.getItem("addressStr"));


// 计算距开幕的时间
function caculateRemainDays() {
	var endTime = localStorage.getItem("beginTime");
	var remainDaysSpan = $('#remainDays');
  var start = new Date();
  console.log(start);
  var end =  moment(endTime, "YYYY-MM-DD"); //转换为12-18-2006格式
  console.log(end);
  var iDays  =  parseInt(Math.abs(end  -  start)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
  remainDaysSpan.text(iDays);

  var yearStr = endTime.substr(0, 4);
  $("#yearStr").text(yearStr);
}

caculateRemainDays();

function fillFooter() {

  $.ajax(  
    {  
        type:'get',  
        url : 'http://www.sportswuhan.com/api/homepage/base',  
        dataType : 'text json',  
        jsonp:"jsoncallback",  
        success  : function(response) {  
            
        var tel = data.tele;
        var address =  data.addre;
        var mail = data.mail;

        // 设置页脚地址和电话
        var officeAddresNode  = $("#footer .contact .phone p:nth-child(1)");
        var officeTelNode     = $("#footer .contact .phone p:nth-child(2)");

        var officeAddressText = "地址： " + address;
        var officeTelMailText = "电话： " + tel + "  邮箱：  " + mail;

        officeTelNode.text(officeTelMailText);
        officeAddresNode.text(officeAddressText);

        },  
        error : function() {  
            alert('fail');  
        }  
    }  
  );
}
