//Javascript Test functions fo LibertySwarm API
//Steve Cina, May 2020

function main(){
    var URL = "http://192.168.1.7";

    //This class creats all of the 'NPC' sprites.
    //This includes Zombies AND other (remote) players
    class Sprite {
        constructor(id, x, y){
            this.id = id;
            this.x = x;
            this.y = y;
        }
    }

    //This class is for the local player. Only one instance should
    //need to be created per game.
    class Player {
        constructor(id, x, y){
            this.id = id;
            this.x = x;
            this.y = y;
    	    this.speed = 15;
        }
    }

    //This function makes a rest call to the LibertySwarm server
    //and returns an array of the server sprites.
    //This should be called every frame to track Zombie movements
    function getBoard(){
        var sprites2 = [];
        var getUrl = URL + ":9081/Swarm";
        var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        
                        var returnArray = this.responseText.split("&"); //Separate out our objects
                        
                        for (i = 1; i < returnArray.length-1; i++){
                            var objArray = returnArray[i].split("-"); //split individual objects into their property values
                            sprites2[i-1] = new Sprite(objArray[0], objArray[1], objArray[2]);
                        }                  
                    }
                };
        xhttp.open("GET", getUrl, false);
        xhttp.send();
        return sprites2;
    }

    //This function updates the local player's position on the board
    //This should be called every frame. The Rest call within
    //is what triggers the zombies to actually move on the backend.
    function updatePos(id, x, y){
        var putUrl = URL + ":9081/Swarm?id=" + id + "&newX=" + x + "&newY=" + y;
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", putUrl, true);
        xhttp.send();
    }

    //Pass in the ID of any sprite on the board, this method will remove that sprite
    //from the serverBoard. The server will respond with
    //either HTTP200 (OKAY), or HTTP404 (not found). 
    function kill(id){
        var delUrl = URL + ":9081/Swarm?id=" + id;
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", delUrl, true);
        xhttp.send();
    }

    //getBoard Test
    var sprites = getBoard();

    function entityInfo(entity){
        for (e=0; e < entity.length; e++){
          if (entity[e].id.includes("p")){
                $('#players').append("<tr id='"+ entity[e].id +"'><td>" + entity[e].id + "</td><td>" + entity[e].x + "</td><td>" + entity[e].y + "</td>");
            }
            else if (entity[e].id.includes("z")){
                $('#zombies').append("<tr><td>" + entity[e].id + "</td><td>" + entity[e].x + "</td><td>" + entity[e].y + "</td>");
            }             
        }
        return entityInfo;
    }

    entityInfo(sprites);

    // Manipulate Player Instance
    var player = $('#p1408');

    // -- Debugging -- //

    //console.log(sprites);

    //console.log(sprites.length);

    //console.log(sprites[0].id + " " + sprites[0].x + " " + sprites[0].y);
    //updatePos Test
    //var myChar = new Player("p1776", 100, 100);
    //updatePos(myChar.id, myChar.x, myChar.y);

    // kill Test
    //kill("z145");
}