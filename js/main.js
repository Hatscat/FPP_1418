Date.now = Date.now || function(){return new Date().getTime()}
window.onload = function ()
{
	var config = getConfig();

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

	for (var s in config.scenes)
	{
		extractDataFromHeightMap(config.scenes[s].images.heightmap, config.scenes[s].mapMaxHeight, s, function (data, p_scene)
		{
			config.scenes[p_scene].mapData = data;
			config.numberMapDataLoaded++;
			if(config.numberMapDataLoaded === config.numberMapDataToLoad)
				init(config);
		});
	}

	/*INPUT : config
	OUTPUT : NONE
	FONCTION : initialise le jeu permet d'avoir tout de préparé
	AUTHOR : LUCIEN, MAX */

	function init (config)
	{
		if (!BABYLON.Engine.isSupported())
		{
			window.alert('Browser not supported');
		}
		else
		{
			config.engine = new BABYLON.Engine(config.canvas, true);
			createScene(config, "globalMap");
			config.scene.activeCamera.attachControl(config.canvas);
			
			config.engine.runRenderLoop(function ()
			{
				config.scene.render();
			});

			window.onresize = function ()
			{
				config.engine.resize();
				//centerPopUp(); // ----------------------------------------------------- Commented
			};

			set_scene_run_loop(config);
		}	
	}
};
