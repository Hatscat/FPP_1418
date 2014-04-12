Date.now = Date.now || function(){return new Date().getTime()}
window.onload = function ()
{
	var config = getConfig();

	window.onkeydown = function (e)
	{
		switch (e.keyCode)
		{
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

	config.backSound = new Howl( // crée un son avec howler
	{ 
		urls: ['music/David_PalmeroOut_of_time.ogg','music/David_PalmeroOut_of_time.mp3' ],
		autoplay: false,
		loop: true,
		volume: 0.4,
	});

	for (var s in config.scenes)
	{
		extractDataFromHeightMap(config.scenes[s].images.heightmap, config.scenes[s].mapMaxHeight, s, function (data, p_scene)
		{
			config.scenes[p_scene].mapData = data;
			config.numberMapDataLoaded++;
			if(config.numberMapDataLoaded === config.numberMapDataToLoad )
				init(config);
		});
	}
	$("#videos").hide();
	//displayPopUp("village", config.scenes["craonne"].popUps.village)

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

			createPlayer(config, 1);
			set_scene_run_loop(config);
			createEvenement(config);
		}	
	}
};
