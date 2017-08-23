$(document).ready(function(){
	if(location.pathname != "/"){
		$("#ajax_icon_menu").load('/noindex/noindex.php #ajax_icon_table',function(){
			$("#ajax_icon_table a").each(function(el,index){
				if($(this).attr("href") == location.pathname){
					$(this).parent().addClass("active");
				}
			})
			 //console.log("kokoko");
		})
	}
})