// URL Info
host = "http://192.168.1.7";
port = "9081";
URL = host + ":" + port + "/Swarm";

// Player Info
player = $('#p1408');
player_id = player.children()[0];
player_x = player.children()[1];
player_y = player.children()[2];

function updatePlayer(id, x, y){
	var u = URL+"?id="+id+"&newX="+x+"&newY="+y;
	setInterval(function(){
		$.post(u);
	},	
	1000);
}
 
function keyboardControls(){
	$('html').keydown(function(event){
		// Manipulate Player Instance

		// Left
		if (event.keyCode == "65"){
			player_x.innerHTML = parseInt(player_x.innerHTML)-1;
			updatePlayer(player_id.innerHTML, player_x.innerHTML, player_y.innerHTML);

		}

		// Up
		else if (event.keyCode == "87"){
			player_y.innerHTML = parseInt(player_y.innerHTML)-1;
			updatePlayer(player_id.innerHTML, player_x.innerHTML, player_y.innerHTML);
		}

		// Right
		else if (event.keyCode == "68"){
			player_x.innerHTML = parseInt(player_x.innerHTML)+1;
			updatePlayer(player_id.innerHTML, player_x.innerHTML, player_y.innerHTML);
		}

		// Down
		else if (event.keyCode == "83"){
			player_y.innerHTML = parseInt(player_y.innerHTML)+1;
			updatePlayer(player_id.innerHTML, player_x.innerHTML, player_y.innerHTML);
		}
	});

}

function main(){
	keyboardControls();
	updatePlayer(player_id.innerHTML, player_x.innerHTML, player_y.innerHTML);
	$.get(URL, function(data){
		console.log(data);
		}, 'html'
	);
}