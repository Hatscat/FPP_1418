/*INPUT : config, identifiant de la map (string)
OUTPUT : NONE
FONCTION : fait l'animation (je recomande de l'assacrone)
AUTHOR : MAX */

function changeScene(config, id)
{
	//ANIM
	createScene(config, id);
};

/*INPUT : config, identifiant de la map (string)
OUTPUT : NONE
FONCTION : crée la map globale
AUTHOR : LUCIEN, MAX */

function createScene (config, id) // TODO en faire une scene globale (pions tout ça tout ça)
{
	var scene = new BABYLON.Scene(config.engine);
	config.light = new BABYLON.PointLight(config.babylon_light.name, new BABYLON.Vector3(config.babylon_light.x, config.babylon_light.y, config.babylon_light.z), scene);
	var camera = new BABYLON.ArcRotateCamera(config.babylon_camera.name, config.babylon_camera.alpha, config.babylon_camera.beta, config.babylon_camera.radius, new BABYLON.Vector3(config.babylon_camera.x, config.babylon_camera.y, config.babylon_camera.z), scene);
	var skybox = createSkybox(scene, config);
	var ground = createGroundMesh(scene, config.scenes[id]);
	config.groundMesh = ground.mesh;
	config.groundData = ground.data;


	var villages = createVillages(scene, config.scenes[id]);

	scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
	scene.fogDensity = config.fogDensity;
	createTable(config.scenes[id], scene)
	if(!!config.scenes[id].ArbresPos)
		createForet(config.scenes[id], scene)

	if(id === "globalMap")
	{
		var player = createPlayer(scene, config.player, 0);
		scene.registerBeforeRender(function ()
		{
			var onHoverResult = config.scene.pick(mouse.x, mouse.y);
			var timeSinceLastFrame = Date.now() - config.oldTimestamp;
			config.oldTimestamp = Date.now();
			config.deltaTime = timeSinceLastFrame * 0.06;

			if (onHoverResult.hit)
			{
				mouse.target_onHover_3D = {
					x : onHoverResult.pickedPoint.x,
					z : onHoverResult.pickedPoint.z,
					targeted_mesh : onHoverResult.pickedMesh
				};
				for (var v=0; v<villages.length; v++)
				{
					onMouseHover(villages[v].collider, villages[v].bubble);
				}
			}

			/* if(user.firstTime == true)
			{
				showPopUpTuto()
			}*/

			/* if(dbclickOnVillage || zoom >= tooMuch)
			{
				config.mapActuelle = idVillageClicked;
				config.scene = changeScene(config, idVillageClicked);
			}*/

			if (!config.inputs.bPause)
			{
				camerasBorderFunction(camera, config.babylon_camera);
				playerMove(config, camera, player);

				for (var v=0; v<villages.length; v++)
				{
					checkPlayerCollisions(player, villages[v].collider, config);
				}
			}
			else
			{
				displayPopUp(config);
			}
			if (!config.popUp && mouse.target_3D && mouse.target_3D.targeted_mesh.name == "veilleurC")
			{
				config.popUp = true;
				config.inputs.bPause = true;
			}
		});
	}

	else
	{
		var player = createPlayer(scene, config.player, 1);

		scene.registerBeforeRender(function ()
		{
			var onHoverResult = config.scene.pick(mouse.x, mouse.y);
			var timeSinceLastFrame = Date.now() - config.oldTimestamp;
			config.oldTimestamp = Date.now();
			config.deltaTime = timeSinceLastFrame * 0.06;

			if (onHoverResult.hit)
			{
				mouse.target_onHover_3D = {
					x : onHoverResult.pickedPoint.x,
					z : onHoverResult.pickedPoint.z,
					targeted_mesh : onHoverResult.pickedMesh
				};
				for (var v=0; v<villages.length; v++)
				{
					onMouseHover(villages[v].collider, villages[v].bubble); // modifier la fonction onMouseHover pour afficher une pop up
				}
			}
			if (!config.inputs.bPause)
			{
				camerasBorderFunction(camera, config.babylon_camera);
				playerMove(config, camera, player);

				for (var v=0; v<villages.length; v++)
				{
					checkPlayerCollisions(player, villages[v].collider, config);
				}
			}
			else
			{
				displayPopUp(config);
			}
			if (!config.popUp && mouse.target_3D && mouse.target_3D.targeted_mesh.name == "veilleurC")
			{
				config.popUp = true;
				config.inputs.bPause = true;
			}

			/* 
			if(PlayerFirstTimeOnThisFuckingScene && firstScene)
			{
				showPopUpTuto();
			}

			if(PlayerIsOutOfMap || zoom >= tooLess)
			{
				config.mapActuelle = "globalMap";
				config.scene = changeScene(config, "globalMap");
			}*/

		});
	}
    createEvenement(config); // TODO if(evenement non init)
    return scene;
}