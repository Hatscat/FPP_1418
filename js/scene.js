/*INPUT : config, identifiant de la map (string)
OUTPUT : scene
FONCTION : crée une map
AUTHOR : LUCIEN, MAX */

function createScene (config) // TODO en faire une scene globale (pions tout ça tout ça)
{
	config.mapActuelle = config.mapSuivante;

	if(!config.scene)
	{
		config.scene = new BABYLON.Scene(config.engine);
		config.light = new BABYLON.PointLight(config.babylon_light.name, new BABYLON.Vector3(config.babylon_light.x, config.babylon_light.y, config.babylon_light.z), config.scene);
		config.camera = new BABYLON.ArcRotateCamera(config.babylon_camera.name, config.babylon_camera.alpha, config.babylon_camera.beta, config.babylon_camera.radius, new BABYLON.Vector3(config.babylon_camera.x, config.babylon_camera.y, config.babylon_camera.z), config.scene);
		var skybox = createSkybox(config);
	}

	config.ground = createGroundMesh(config.scene, config.scenes[config.mapActuelle]);
	config.groundMesh = config.ground.mesh;
	config.groundData = config.ground.data;
	var villages = createVillages(config.scene, config.scenes[config.mapActuelle]);
	var isGlobalMap = config.mapActuelle == "globalMap";
	config.player.mesh = createPlayer(config.scene, config.player, !isGlobalMap);
	config.scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
	config.scene.fogDensity = config.scenes[config.mapActuelle].fogDensity;
	createTable(config);
	
	if (config.scenes[config.mapActuelle].ArbresPos)
		createForet(config.scenes[config.mapActuelle], config.scene, config.images);
	
	if (isGlobalMap)
	{
		config.scene.registerBeforeRender(function ()
		{
			commonSceneUpdate(config, config.player.mesh, villages);

			if (mouse.doubleClicks && mouse.target_onOver_3D) // || zoom > ... // ---------------------------------------------------------------------------
			{
				for (var v in villages)
				{
					if (mouse.target_onOver_3D.targeted_mesh.name == villages[v].mesh.name) // || == "bubble"
					{
						console.log("go to village : " + villages[v].mesh.name);
						initPrePopUp(config, villages[v])
						/**/
					}
				}
			}

			/* if (user.firstTime == true)
			{
				showPopUpTuto()
			}*/
		});
	}

	else
	{
		/*config.scene.registerBeforeRender(function ()
		{
			commonSceneUpdate(config, config.player.mesh, villages);
			
			if (config.inputs.bPause)
			{
				
			}
			else if (!config.popUp && mouse.target_onClick_3D)
			{
				for (v in villages)
				{
					if (mouse.target_onClick_3D.targeted_mesh.name == villages[v].name)
					{
						config.popUp = true;
						config.inputs.bPause = true;
					}
				}
			}
			else
			{*/
				for (var v in villages)
				{
					checkPlayerCollisions(config.player.mesh, villages[v].mesh, config);
					initPopUp(config);
				}
			//}

			/* 
			if(PlayerFirstTimeOnThisFuckingScene && firstScene)
			{
				showPopUpTuto();
			}

			if (PlayerIsOutOfMap || zoom >= tooLess)
			{
				changeScene(config, "globalMap");
			}
			*/
		//});
	}
	
    createEvenement(config); // TODO if (evenement non init)
}

// les éléments communs à l'update d'une scene : le calcul du deltaTime + definition de la target_onOver_3D + le déplacement du player
function commonSceneUpdate (config, player, villages)
{
	var onOverResult = config.scene.pick(mouse.x, mouse.y);
	var timeSinceLastFrame = Date.now() - config.oldTimestamp;
	config.oldTimestamp = Date.now();
	config.deltaTime = timeSinceLastFrame * 0.06;

	if (onOverResult.hit)
	{
		mouse.target_onOver_3D = {
			x : onOverResult.pickedPoint.x,
			z : onOverResult.pickedPoint.z,
			targeted_mesh : onOverResult.pickedMesh
		};
	}

	if (mouse.target_onOver_3D) // -------------------------------------------------------------------------------------------------------------------------------
	{
		for (var v in villages)
		{
			if (mouse.target_onOver_3D.targeted_mesh.name == villages[v].mesh.name && villages[v].mesh.material.emissiveColor.r < 1)
			{
				villages[v].mesh.material.emissiveColor.r += 0.05 * config.deltaTime;
			}
			else if (villages[v].mesh.material.emissiveColor.r > 0)
			{
				villages[v].mesh.material.emissiveColor.r -= 0.05 * config.deltaTime;
			}
		}
	}

	if (!config.inputs.bPause)
	{
		cameraBordersFunction(config.camera, config.babylon_camera);
		playerMove(config, config.camera, player);
	}

	if (config.ready2ChangeScene)
	{
		// ANIM de transition
		if ((config.camera.radius -= config.deltaTime) < config.babylon_camera.zoom_min)
		{
			config.camera.radius = config.babylon_camera.zoom_max;
			config.ready2ChangeScene = false;
			config.ground.mesh.dispose(true);
			createScene(config);
		}
	}
}
