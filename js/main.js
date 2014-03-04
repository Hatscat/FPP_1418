Date.now = Date.now || function(){return new Date().getTime()}
window.onload = function ()
{
	var config = {

		images : {
			map_texture : "img/satmap.jpg",
			heightmap : "img/heightMap.jpg",
			skybox : "img/skybox/skybox",
			wood_normal : "img/normal_trunk.jpg",
			leave_normal : "img/normal_leaves.jpg"
		},
		videos : {

		},
		scenes : {
			globalMap : 0,
			craonne : 1

		},
		skybox : {
			size : 2000.0
		},
		ground : {
			mapMaxHeight : 10,
			mapWidth : 500,
			mapHeight : 500,
			subdivisions : 255,
			bump_width_subdivisions : 200,
			bump_height_subdivisions : 200,
			y_margin: -2.0
		},
		moveToMouseUpSensitivity : 0.04,
		fogDensity : 0.001,
		player : {
			speed : 1.4,
			y_margin: -1.5,
			origin_x : 0,
			origin_z : 150
		},
		babylon_light : {
			name : "Omni",
			x : 0,
			y : 100,
			z : 100
		},
		babylon_camera : {
			name : "Camera",
			alpha : 44.5,
			beta : 1.0,
			radius : 300,
			beta_min : 0.1,
			beta_max : (Math.PI / 2) * 0.75,
			zoom_min : 50,
			zoom_max : 500,
			x : 0,
			y : 11,
			z : 0
		},
		villages : {
			craonne : {
				x : -120,
				z : -150,
				y_margin : 3.5,
				scale : 0.5,
				bubble_poly : 10.0,
				bubble_collider_size : 10.0,
				bubble_render_size : 4.6,
				bubble_alpha : 0.15,
				collider_poly : 6.0,
				collider_size : 50
			}

		},

		oldTimestamp : Date.now(),
		canvas : document.getElementById("renderCanvas"),
		playerCanCollide : true,
		bReady : false,
		inputs : {
			bPause : false,
			X_axis : 0,
			Y_axis : 0
		},
		popUp : false,
		popUpCraonne : false,
		videosShown : false
	};

	window.onkeydown = function (e)
	{
		switch (e.keyCode)
		{
			case 32 : /* space button */
				config.inputs.bPause = !config.inputs.bPause;
			break;
			case 81 : /* q key */
				config.inputs.X_axis = -1;
			break;
			case 68 : /* d key */
				config.inputs.X_axis = 1;
			break;
			case 90 : /* z key */
				config.inputs.Y_axis = -1;
			break;
			case 83 : /* s key */
				config.inputs.Y_axis = 1;
			break;
		}
	};
	window.onkeyup = function (e)
	{
		switch (e.keyCode)
		{
			case 81 : /* q key */
				config.inputs.X_axis = 0;
			break;
			case 68 : /* d key */
				config.inputs.X_axis = 0;
			break;
			case 90 : /* z key */
				config.inputs.Y_axis = 0;
			break;
			case 83 : /* s key */
				config.inputs.Y_axis = 0;
			break;
		};
	};

	$("#resizeBtn").click(function(){toFullScreen()});
	
	if (!BABYLON.Engine.isSupported())
	{
		window.alert('Browser not supported');
	}
	else
	{
		config.engine = new BABYLON.Engine(config.canvas, true);

		extractDataFromHeightMap(config.images.heightmap, config.ground.mapMaxHeight, function (data)
		{
			config.mapData = data;

			createScene(config, function (scene)
			{
				config.scene = scene;
				config.scene.activeCamera.attachControl(config.canvas);
				
				document.onmouseup = function (e)
				{
					var pickResult = config.scene.pick(e.clientX, e.clientY);
					var normPosDown = mouse.target.x * mouse.target.x + mouse.target.y * mouse.target.y;
					var normPosUp = mouse.x * mouse.x + mouse.y * mouse.y;
					var marginRatio = config.moveToMouseUpSensitivity;
					if (!config.popUp && pickResult.hit && Math.abs(normPosDown - normPosUp) < normPosUp * marginRatio)
					{
						mouse.target_3D = {
							x : pickResult.pickedPoint.x,
							z : pickResult.pickedPoint.z,
							targeted_mesh : pickResult.pickedMesh
						};
					}
				};
				config.engine.runRenderLoop(function ()
				{
					config.scene.render();
				});
				window.addEventListener("resize", function ()
				{
					config.engine.resize();
				});
			});
		});
	}
};
