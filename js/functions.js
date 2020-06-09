/*
	Script Name: Functions
	Author: Dominick Piaquadio
	Purpose: Place Universal functions into one file
*/

function parseEntity(data){
	var players = [];
	var zombies = [];

	var d = data.split("&");

	for (e=0; e < d.length; e++){
		if (d[e].includes("z")){
			zombies.push(data[e]);
		}
		else if (d[e].includes("p")){
			players.push(d[e]);
		}
	}
}

function parseEntityInfo(eInfoList, eInfo){
	for (e=0; e < eInfo.length; e++){
		var ei = eInfo[e].split("-");
		eInfoList.push([ei[0], ei[1], ei[2]]);
	}
}

function entityInfo(entity){
    for (e=0; e < entity.length; e++){
      if (entity[e].id.includes("p")){
            //$('#players').append("<tr id='"+ entity[e].id +"'><td>" + entity[e].id + "</td><td>" + entity[e].x + "</td><td>" + entity[e].y + "</td>");
            entityCircle(entity[e].x, entity[e].y, "blue");
        }
        else if (entity[e].id.includes("z")){
            //$('#zombies').append("<tr id='"+ entity[e].id +"'><td>" + entity[e].id + "</td><td>" + entity[e].x + "</td><td>" + entity[e].y + "</td>");
            entityCircle(entity[e].x, entity[e].y, "red");
        }             
    }
}

function entityCircle(x, y, color){
    ctx.beginPath();
    ctx.arc(x+20, y+20, 20, 0, 2*Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}