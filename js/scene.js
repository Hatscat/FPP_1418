
/*INPUT : config, identifiant de la map (string)
OUTPUT : scene
FONCTION : crée une map
AUTHOR : LUCIEN, MAX */

function createScene (config) // TODO en faire une scene globale (pions tout ça tout ça)
{
	config.mapActuelle = config.mapSuivante;

	if (!config.scene)
	{
		config.scene = new BABYLON.Scene(config.engine);
		config.light = new BABYLON.PointLight(config.babylon_light.name, new BABYLON.Vector3(config.babylon_light.x, config.babylon_light.y, config.babylon_light.z), config.scene);
		config.camera = new BABYLON.ArcRotateCamera(config.babylon_camera.name, config.babylon_camera.alpha, config.babylon_camera.beta, config.babylon_camera.radius, new BABYLON.Vector3(config.babylon_camera.x, config.babylon_camera.y, config.babylon_camera.z), config.scene);
		var skybox = createSkybox(config);
	}

	config.ground = createGroundMesh(config.scene, config.scenes[config.mapActuelle]);
	createVillages(config);
	config.isGlobalMap = config.mapActuelle == "globalMap";
	createPlayer(config, config.isGlobalMap);
	config.scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
	config.scene.fogDensity = config.scenes[config.mapActuelle].fogDensity;
	createTable(config);
	
	if (config.scenes[config.mapActuelle].ArbresPos)
		createForet(config);
	
	//initPopUp(config);
    createEvenement(config); // TODO if (evenement non init)
}


function set_scene_run_loop (config)
{
	config.scene.registerBeforeRender(function ()
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

		if (config.isGlobalMap)
		{
			var nearestVillage = checkNearestVillage(config);

			if (config.camera.radius < config.babylon_camera.zoom_min)
				scene_transition(config, nearestVillage.mesh.name, nearestVillage.mesh.position);
		}
		else
		{
			if (config.camera.radius > config.babylon_camera.zoom_max)
				scene_transition(config, "globalMap", config.player.mesh.position);
		}

		if (mouse.target_onOver_3D)
		{
			for (var v in config.villages)
			{
				if (mouse.target_onOver_3D.targeted_mesh.name == config.villages[v].mesh.name)
				{
					if (config.isGlobalMap && (mouse.doubleClicks))
					{
						console.log("go to village : " + config.villages[v].mesh.name);
						scene_transition(config, config.villages[v].mesh.name, config.villages[v].mesh.position);
						mouse.doubleClicks = false;
					}
					else if (config.villages[v].mesh.material.emissiveColor.r < 1)
					{
						config.villages[v].mesh.material.emissiveColor.r += 0.05 * config.deltaTime;
					}
				}
				else if (config.villages[v].mesh.material.emissiveColor.r > 0)
				{
					config.villages[v].mesh.material.emissiveColor.r -= 0.05 * config.deltaTime;
				}
			}
		}
		if (!config.inputs.bPause && !config.ready2ChangeScene)
		{
			cameraBordersFunction(config.camera, config.babylon_camera);
			playerMove(config, config.camera, config.player.mesh);
		}
		else if (config.ready2ChangeScene)
		{
			// ANIM de transition
			if ((config.isGlobalMap && (config.camera.radius -= config.deltaTime) < 1)
			||	(!config.isGlobalMap && (config.camera.radius += config.deltaTime) > config.babylon_camera.zoom_max * 1.5))
			{
				config.camera.radius = config.babylon_camera.zoom_max * 0.8;
				config.ground.mesh.dispose(true);

				for (v in config.villages)
					config.villages[v].mesh.dispose(true);

				/*for (a in config.arbres)
					for (b in config.arbres[a])
						config.arbres[a].arbre[b].dispose(true);
				*/

				config.ready2ChangeScene = false;
				createScene(config);
			}
		}


		/*if (!config.isGlobalMap) // POPUP
		{
			console.log("isGlobalMap  : " + isGlobalMap);
			
			if (config.inputs.bPause)
			{
				displayPopUp(config);
			}
			else if (!config.popUp && mouse.target_onClick_3D)
			{
				for (v in config.villages)
				{
					if (mouse.target_onClick_3D.targeted_mesh.name == config.villages[v].name)
					{
						config.popUp = true;
						config.inputs.bPause = true;
					}
				}
			}
			else
			{
				for (var v in config.villages)
				{
					checkPlayerCollisions(config.player.mesh, config.villages[v].mesh, config);
				}
			}

			/* 
			if(PlayerFirstTimeOnThisFuckingScene && firstScene)
			{
				showPopUpTuto();
			}

			if (PlayerIsOutOfMap || zoom >= tooLess)
			{
				changeScene(config, "globalMap");
			}///
			
		}*/
	});
}

function scene_transition (config, next_scene, village_position)
{
	config.ready2ChangeScene = true;
	config.mapSuivante = next_scene;
	config.player.mesh.position = village_position;
	playerMove(config, config.camera, config.player.mesh);
	mouse.target_onClick_3D = null;
}
