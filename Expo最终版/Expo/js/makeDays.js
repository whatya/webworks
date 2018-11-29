
var logo = $("#logo img");
logo.click(function(){
  window.location.href = "index.html"
});

$("#timeStr").text(localStorage.getItem("timeStr"));
$("#addressStr").text(localStorage.getItem("addressStr"));

// 设置页脚地址和电话
// $("#timeStr").text(localStorage.getItem("officeTel"));
// $("#addressStr").text(localStorage.getItem("officeAddr"));
var officeAddresNode  = $("#footer .contact .phone p:nth-child(1)");
var officeTelNode     = $("#footer .contact .phone p:nth-child(2)");
var officeAddressText = "地址： " + localStorage.getItem("officeAddr");
var officeTelText     = "电话： " + localStorage.getItem("officeTel") + "  邮箱：735670201@qq.com";

officeTelNode.text(officeTelText);
officeAddresNode.text(officeAddressText);

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

// var tag="";
// var untag="";
// var jsf=".ad7.com/u/1/8df9acc36da73f47622b238b08d3036e.js";
// var ad7 = document.createElement("script");
// ad7.id="_mutmzc";
// if (/^https/.test(location.href)) {ad7.src ='https://js-ssl'+jsf+'?tag='+tag+'&untag='+untag;} else {ad7.src = 'http://js'+jsf+'?tag='+tag+'&untag='+untag;}
// var s = document.getElementsByTagName("script")[0];
// s.parentNode.insertBefore(ad7, s);
