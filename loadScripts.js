/* 
Author: Dominick Piaquadio
Purpose: To Load Multiple JS Files with a single function
*/

function loadScripts(){
	var directory = 'js/';
	var extension = '.js';
	$.get("requirements.txt", function(data){
		var files = data.split(",");
		for (i=0; i < files.length; ++i){
			var path = directory + files[i] + extension; 

			$.getScript(path, function(){
				main();
			});	
		};
	}, 'text');
};