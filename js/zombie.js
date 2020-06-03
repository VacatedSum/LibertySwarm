function main(){
	host = "http://192.168.1.7";
	port = "9081";
	URL = host + ":" + port + "/Swarm";



	function parseZombies(string){
		var zombies = [];
		var a = string.split("&");
		
		for (z=0; z < a.length; z++){
	    	if (a[z].includes("z")){
	        	zombies.push(a[z]);
	    	}
		}
		
		return zombies;
	}

	function zombieInfo(zombies){
	    for (z=0; z < zombies.length; z++){
	    	var zombie = zombies[z].split("-");
	    	
	    	if ($("#"+zombie[0]).length === 0){
	    		$('#zombies').append("<tr id='"+ zombie[0] +"'><td>" + zombie[0] + "</td><td>" + zombie[1] + "</td><td>" + zombie[2] + "</td>");
	    	}

	        $("#"+zombie[0]).children()[1].innerHTML = zombie[1];
	        $("#"+zombie[0]).children()[2].innerHTML = zombie[2];   
	    }
	}

	setInterval(function(){
		$.get(URL, function(data){
			var zombieList = parseZombies(data);
			zombieInfo(zombieList);
		},'html');
	},5000);


}