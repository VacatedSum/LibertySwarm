//Javascript Test functions fo LibertySwarm API
//Steve Cina, May 2020

function main(){
    var host = "http://192.168.1.7";
    var port = "9081";
    var URL = host + ":" + port + "/Swarm";

    var path = '/LibertySwarm/js/functions.js';

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
        var getUrl = URL;
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
        var putUrl = URL + "?id=" + id + "&newX=" + x + "&newY=" + y;
        console.log(putUrl);
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", putUrl, true);
        xhttp.send(); 
    }   

    //Pass in the ID of any sprite on the board, this method will remove that sprite
    //from the serverBoard. The server will respond with
    //either HTTP200 (OKAY), or HTTP404 (not found). 
    function kill(id){
        var delUrl = URL + "?id=" + id;
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", delUrl, true);
        xhttp.send();
    }

    //getBoard Test
    var sprites = getBoard();
    

    // -- Game Content -- //
    function loadGame(){
        var canvas = document.getElementById('game');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        var ctx = canvas.getContext('2d');

        function entityCircle(x, y, color){
            ctx.beginPath();
            ctx.arc(x+20, y+20, 20, 0, 2*Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
        }

        function entityInfo(entity){
            for (e=0; e < entity.length; e++){
                if (entity[e].id.includes("p")){
                    players.push([entity[e].id, entity[e].x, entity[e].y]);
                }
                else if (entity[e].id.includes("z")){
                  //  $('#zombies').append("<tr id='"+ entity[e].id +"'><td>" + entity[e].id + "</td><td>" + entity[e].x + "</td><td>" + entity[e].y + "</td>");
                //
                    zombies.push([entity[e].id, entity[e].x, entity[e].y]);
                }             
            }
        }

        var players = [];
        var zombies = [];

        entityInfo(sprites);    


        function entityPosition(entityList, color){
            for (i=0; i < entityList.length; i++){
                entityCircle(parseInt(entityList[i][1]), parseInt(entityList[i][2]), color);
            }
        }

        entityPosition(players, "blue");
        entityPosition(zombies, "red");

        function updatePlayer(id, x, y){
            var u = URL+"?id="+id+"&newX="+x+"&newY="+y;
            setInterval(function(){
                $.post(u);
            },  
            500);
        }

        player = players[0];
        pid = player[0];
        px = player[1];
        py = player[2];

        updatePlayer(pid, px, py);

        function keyboardControls(pid, px, py){
            $('html').keydown(function(event){
                // Manipulate Player Instance

                // Left
                if (event.keyCode == "65"){
                    px = parseInt(px)-1;
                    updatePlayer(pid, px, py);

                }

                // Up
                else if (event.keyCode == "87"){
                    py = parseInt(py)-1;
                    updatePlayer(pid, px, py);
                }

                // Right
                else if (event.keyCode == "68"){
                    px = parseInt(px)+1;
                    updatePlayer(pid, px, py);
                }

                // Down
                else if (event.keyCode == "83"){
                    py = parseInt(px)+1;
                    updatePlayer(pid, px, py);
                }
            });

        }
    }

    setInterval(loadGame(), 200);
    // -- Debugging -- //

    //console.log(sprites);

    //console.log(sprites.length);

    //console.log(sprites[0].id + " " + sprites[0].x + " " + sprites[0].y);
    //updatePos Test
    //var myChar = new Player("p1776", 100, 100);
    //updatePos(myChar.id, myChar.x, myChar.y);
    
    // Zombie Killswitch
    $('#killZ').click(function() {
        var zList = $('#zombies tbody').children();
        for (z=1; z < zList.length; z++){
            var zid = zList[z].innerHTML.split("</td><td>")[0].split("<td>")[1];
            kill(zid);
        }
        $.get(host+"/LibertySwarm");
    });
    //kill("z145");
}