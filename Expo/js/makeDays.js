caculateRemainDays()

var logo = $("#logo img");
logo.click(function(){
  window.location.href = "index.html"
});

// 计算距开幕的时间
function caculateRemainDays() {
	var remainDaysSpan = $('#remainDays');
  var start = new Date();
  console.log(start);
  var end =  moment("10-17-2018", "MM-DD-YYYY"); //转换为12-18-2006格式  
  console.log(end);
  var iDays  =  parseInt(Math.abs(end  -  start)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数  
  remainDaysSpan.text(iDays);

}
