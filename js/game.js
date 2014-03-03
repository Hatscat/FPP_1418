window.onload = init;

if (!Date.now)
{
	Date.now = function now() {
		return new Date().getTime();
	};
}

function init ()
{
	var config = {};
	config.oldTimestamp = Date.now();
	config.deltaTime = 0;
	config.posArbreXYZ = [];
	config.ArbresPos = 	
	[
		[48.667 , -125 , 13.667 , 14.669], 
		[25.667 , -50 , 13.667 , 14.669], 
		[0 , -115 , 13.667 , 14.669], 
		[-30 , -55 , 13.667 , 14.669], 
		[-60 , -135 , 13.667 , 14.669], 
		[75 , -110 , 13.667 , 18], 
		[60 , -50 , 13.667 , 14.669], 
		[125 , -120 , 13.667 , 14], 
		[100 , -60 , 13.667 , 14], 
		[160 , -115 , 18 , 14], 
		[150 , -50 , 18 , 14], 
		[50 , -3 , 20 , 15], 
		[-42 , 65 , 16 , 18], 
		[-39 , 85 , 16 , 15], 
		[-38 , 122 , 12 , 13], 
		[-60 , 179 , 19 , 15], 
		[-80 , 51 , 33 , 40], 
		[67 , 170 , 35 , 45], 
		/*[17 , -125 , 14.667 , 7.334],
		[-16.333 , -125 , 17 , 10.002], 
		[-43.333 , -125 , 9.583 , 7.334],
		[125 , -100.664 , 17 , 16],
		[92.333 , -100.664 , 11.667 , 14.333],
		[39.333 , -102.664 , 12.667 , 11.667],
		[0 , -111.998 , 8.333 , 13],
		[-38.333 , -114.998 , 13 , 12.333],
		[-31 , -92.664 , 13.833 , 10],
		[118.333 , -70.998 , 5.667 , 6.667],
		[112.667 , -77.997 , 7.333 , 6.999],
		[94.667 , -79.331 , 8.167 , 8.333],
		[35 , -67.664 , 16.667 , 15],
		[48.667 , -40.998 , 13.667 , 15.333],
		[26.667 , -44.998 , 13.333 , 11.667], 
		[-28.333 ,  -13.664 , 15 , 16.667], 
		[43.667 , 11.336 , 8.667 , 8.333],
		[31 , 9.002 , 5.5 , 8],
		[9.667 , 17.002 , 9.667 , 10.5], 
		[-4.333 , 9.169 , 53.25 , 54.5], 
		[-58.833 , 11.835 , 22.167 , 40.75],
		[13.333 , 31.669 , 13.333 , 14], 
		[31 , 42.669 , 11 , 12.333], 
		[43.667 , 59.002 , 31.667 , 12.333],
		[9.667 , 56.336 , 13 , 15],
		[-16.333 , 65.169 , 7 , 9.167],
		[-63.667 , 55.002 , 15.667 , 10.167],
		[-98 , 42.669 , 4.333 , 9.917],
		[-114.667 , 48.836 , 9 , 7.5],
		[41.833 , 84.334 , 6.833 , 6],
		[23.667 , 85.667 , 10.333 , 15.333],
		[41.833 , 115.667 , 8.833 , 9.333],
		[9.667 , 103.334 , 9.5 , 8.333],
		[-28.333 , 115.667 , 9.583 , 9.333],
		[-44.833 , 117.334 , 7.5 , 7.666]*/
	];
	config.canvasMiniMap = document.getElementById("canvasMiniMap")
	config.canvasMiniMap.width = 1559/4;
	config.canvasMiniMap.height = 808/4;
	config.canvasMiniMap.style.top = window.innerHeight-config.canvasMiniMap.height-100 + "px";
	config.canvasMiniMap.style.left = "50px";

	config.miniMapContext = canvasMiniMap.getContext("2d");
	config.canvas = document.getElementById("renderCanvas");
	config.miniMapImage = new Image();
	config.miniMapImage.src = "img/heightMap.jpg";
	config.mapMaxHeight = 10;
	config.mapWidth = 500;
	config.mapHeight = 500;
	config.subdivisions = 200;
	config.playerCanCollide = true;
	config.bReady = false;
	config.inputs = {
			bPause : false,
			X_axis : 0,
			Y_axis : 0
		};

	config.popUp = false;
	config.popUpCraonne = false;
	config.videosShown = false;
	$("#resizeBtn").click(function(){toFullScreen()})
	
	config.checkInputs = function (inputs) 
	{
		/* ****************** Mouse Events ****************** */

		// if (mouse.pressed)
		// {
		// 	var pickResult = config.scene.pick(mouse.e.clientX, mouse.e.clientY);

		// 	if (pickResult.hit)
		// 	{
		// 		mouse.target_3D = {
		// 			x : pickResult.pickedPoint.x,
		// 			z : pickResult.pickedPoint.z
		// 		};
		// 	}
		// }

		/* ****************** Keyboard Events ****************** */

		window.onkeydown = function (e)
		{
			//console.log(event.keyCode); //ok
			switch (e.keyCode)
			{
				case 32 : /* space button */
					inputs.bPause = !inputs.bPause;
				break;
				//case 37 : /* left arrow */
				case 81 : /* q key */
					inputs.X_axis = -1;
				break;
				//case 39 : /* right arrow */
				case 68 : /* d key */
					inputs.X_axis = 1;
				break;
				//case 38 : /* up arrow */
				case 90 : /* z key */
					inputs.Y_axis = -1;
				break;
				//case 40 : /* down arrow */
				case 83 : /* s key */
					inputs.Y_axis = 1;
				break;
			}
		}
		window.onkeyup = function (e)
		{
			switch (e.keyCode)
			{
				//case 37 : /* left arrow */
				case 81 : /* q key */
					inputs.X_axis = 0;
				break;
				//case 39 : /* right arrow */
				case 68 : /* d key */
					inputs.X_axis = 0;
				break;
				//case 38 : /* up arrow */
				case 90 : /* z key */
					inputs.Y_axis = 0;
				break;
				//case 40 : /* down arrow */
				case 83 : /* s key */
					inputs.Y_axis = 0;
				break;
			}
		}
	};

	if (!BABYLON.Engine.isSupported()) // Check support
	{
		window.alert('Browser not supported');
	}
	else
	{
		config.engine = new BABYLON.Engine(config.canvas, true); // Load BABYLON 3D engine

		extractDataFromHeightMap("img/heightMap.jpg", config.mapMaxHeight, function (data)
		{
			config.mapData = data;

			createScene(config, function (scene)
			{
				config.scene = scene;
				
				// Attach the camera to the scene
				config.scene.activeCamera.attachControl(config.canvas);
				
				var t = 0
				for(k=0; k<config.ArbresPos.length; k++)
				{
					for(i=config.ArbresPos[k][0]; i<config.ArbresPos[k][0]+config.ArbresPos[k][2]; i+=(Math.random()*10)+2)
					{
						for(j=config.ArbresPos[k][1]; j<config.ArbresPos[k][1]+config.ArbresPos[k][3]; j+=(Math.random()*15)+3)
						{
							if(t%2 == 0)
								createArbreToufu(config, i, getPosOnHeightMap(i, j, config.mapData, config.mapWidth, config.mapHeight).y, j, (Math.random()*5 + 3)/50);

							else
								createArbreSapin(config.scene, i, getPosOnHeightMap(i, j, config.mapData, config.mapWidth, config.mapHeight).y, j, (Math.random()*5 + 3)/50);

						}
					}
					t = Math.floor(Math.random()*2)+1
				}
				document.onmouseup = function (e)
				{
					var pickResult = config.scene.pick(e.clientX, e.clientY);
					var normPosDown = mouse.target.x * mouse.target.x + mouse.target.y * mouse.target.y;
					var normPosUp = mouse.x * mouse.x + mouse.y * mouse.y;
					var marginRatio = 0.03; // sensitivity
					if (!config.popUp && pickResult.hit && Math.abs(normPosDown - normPosUp) < normPosUp * marginRatio)
					{
						mouse.target_3D = {
							x : pickResult.pickedPoint.x,
							z : pickResult.pickedPoint.z,
							targeted_mesh : pickResult.pickedMesh
						};
					}
				}

				// Once the scene is loaded, just register a render loop to render it
				config.engine.runRenderLoop(function ()
				{
					config.checkInputs(config.inputs);
					config.scene.render();
					if(!!config.posHeightMap)
					{
						config.miniMapContext.fillStyle= "red";
						config.miniMapContext.drawImage(config.miniMapImage, 0, 0, 1559/4, 808/4)
						config.miniMapContext.fillRect(config.posHeightMap.z/4, config.posHeightMap.x/4, 5, 5)
					}
				});

				// Resize event
				window.addEventListener("resize", function ()
				{
					config.engine.resize();
				});
			});
			
		});
	}
}

(function($)
{
	$.fn.iTvScroller = function(settings) {
	    // Options
	    var options =  {
	        delay: 5000
	    };
	    $.extend(options, settings);
	        
	    return this.each(function(){
	        var $$ = $(this);
	        
	        // Applique les classes au 1er et 2ème DT
	        $('dt', $$)
	            .eq(1).addClass('second').end()
	            .eq(0).addClass('first');

	        // Fait apparaitre doucement la première news
	        $('dd', $$).eq(0).fadeIn('slow');
	        
	        // Appelle la méthode scrollTitles() toutes les x secondes
	        setInterval(scrollTitles, options.delay);
	        
	        function scrollTitles() {
	            // Traitement des DD
	            $('dd', $$)
	                // On les masque tous
	                .hide()
	                // On réaffiche celui qui nous intéresse : le suivant
	                .eq(1).fadeIn('slow');

	            // Traitement des DT
	            $('dt', $$)
	                // On réinitialise les classes de tous les titres
	                .removeClass('first')
	                .removeClass('second')
	                // On réapplique les classes au 1er, 2ème et 3ème titre
	                .eq(2).addClass('second').end()
	                .eq(1).addClass('first').end()
	                .eq(0).addClass('first')
	                // Puis on déplace les titres vers la gauche
	                .animate( { marginLeft : '-150px'}, 1000, function() {

	                    // Lorsque le déplacement est termine le 1er DT ne nous intéresse plus
	                    var dt = $('dt', $$).eq(0)
	                        // On réinitialise la marge à gauche
	                        .css('marginLeft', 0)
	                        // On supprime la classe
	                        .removeClass('first')
	                        // On le supprime
	                        .remove();

	                    // On supprime également le DD
	                    var dd = $('dd', $$).eq(0).remove();

	                    // On repose le DT et DD à la suite des autres titres
	                    $$.append( dt.hide().fadeIn('slow'), dd );
	                }
	            )
	        }    
	    });
	};
})(jQuery);
