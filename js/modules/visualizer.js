define(
	[
		"analyser"
	], 
	function(analyser){

		var container = document.getElementById("visualizer");
		var active = false;

		function update(){
			var data = analyser.data;
			var node = container.firstElementChild;
			var i = 0;
			do{
				updateNode(node, data[i]);
				i++;
			}while(node = node.nextElementSibling, node);
			active && requestAnimationFrame(update);
		}

		function updateNode(node, data){
			var val = Math.round((data / 255) * 100);
			node.style.height = val + '%';
		}

		function addLine(height){
			var line = document.createElement("span");
			line.className = "node";
			line.style.height = height + "%";
			container.appendChild(line);
		}

		function init(size){
			for(var i=0, l=size; i<l; i++){
				addLine(100);
			}
			active = true;
			requestAnimationFrame(update);
		}

		return Object.create(null, {
			"init" : {
				value : init
			}
		});
	}
);