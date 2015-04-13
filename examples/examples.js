$(function(){
  $(".html").wrap("<div class='html' />").removeClass("html");
  $(".js").wrap("<div class='js' />").removeClass("js");
  $(".jquery").wrap("<div class='jquery' />").removeClass("jquery");
  $(".php").wrap("<div class='php' />").removeClass("php");
  $(".css").wrap("<div class='css' />").removeClass("css");
  $("output").on("DOMSubtreeModified", function(){
    var v = $(this).val();
    var p = $(this).attr("placeholder");
    if(
      v == '' ||
      v == 'NaN' ||
      v == 'undefined' ||
      v == p
    ){
      $(this).html($(this).attr("placeholder"))
      $(this).addClass("placeholder");
    } else {
      $(this).removeClass("placeholder");
    }
  }).trigger("DOMSubtreeModified");
});
/* *
console.log = function(str){
  if($("#log").length===0)$("body").append("<div id='log'><pre></pre><button class='log-clear' onclick='$(\"#log pre .log-item\").remove();'>Clear</button></div>");
  var l = $("#log")
  l.find("pre").append("<span class='log-item'>"+str+"</span>");
  l[0].scrollTop = l[0].scrollHeight;
}
/* */