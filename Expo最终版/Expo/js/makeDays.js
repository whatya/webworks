caculateRemainDays();

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
