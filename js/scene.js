/*INPUT : config, identifiant de la map (string)
OUTPUT : scene
FONCTION : crée une map
AUTHOR : LUCIEN, MAX */

function createScene (config) // TODO en faire une scene globale (pions tout ça tout ça)
{
	config.mapActuelle = config.mapSuivante; // -------------------------------------------------------------------------------------- NEW;
	var scene = new BABYLON.Scene(config.engine);
	config.light = new BABYLON.PointLight(config.babylon_light.name, new BABYLON.Vector3(config.babylon_light.x, config.babylon_light.y, config.babylon_light.z), scene);
	config.camera = new BABYLON.ArcRotateCamera(config.babylon_camera.name, config.babylon_camera.alpha, config.babylon_camera.beta, config.babylon_camera.radius, new BABYLON.Vector3(config.babylon_camera.x, config.babylon_camera.y, config.babylon_camera.z), scene);
	var skybox = createSkybox(scene, config);
	var ground = createGroundMesh(scene, config.scenes[config.mapActuelle]);
	config.groundMesh = ground.mesh;
	config.groundData = ground.data;
	var villages = createVillages(scene, config.scenes[config.mapActuelle]);
	var isGlobalMap = config.mapActuelle == "globalMap";
	config.player.mesh = createPlayer(scene, config.player, !isGlobalMap); // -------------------------------------------------------------------------------------- NEW;
	scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
	scene.fogDensity = config.scenes[config.mapActuelle].fogDensity;
	createTable(config.scenes[config.mapActuelle], scene, config.images.wood_normal);
	
	if (config.scenes[config.mapActuelle].ArbresPos)
		createForet(config.scenes[config.mapActuelle], scene, config.images);
	
	if (isGlobalMap)
	{
		scene.registerBeforeRender(function ()
		{
			commonSceneUpdate(config, config.player.mesh, villages);

			if (mouse.doubleClicks && mouse.target_onOver_3D)
			{
				for (var v in villages)
				{
					if (mouse.target_onOver_3D.targeted_mesh.name == villages[v].mesh.name) // || == "bubble"
					{
						console.log("go to village : " + villages[v].mesh.name);
						mouse.doubleClicks = false;
						config.ready2ChangeScene = true;
						config.mapSuivante = villages[v].mesh.name;  // ------------------------------------------------------ NEW
						config.player.mesh.position = villages[v].mesh.position; // ------------------------------------------------------ NEW
						// changeScene(config, villages[v].mesh.name);  // ------------------------------------------------------ DELETE
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
		scene.registerBeforeRender(function ()
		{
			if (config.inputs.bPause)
			{
				displayPopUp(config);
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
			{
				for (var v in villages)
				{
					checkPlayerCollisions(config.player.mesh, villages[v].mesh, config);
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
			}
			*/
		});
	}
	initPopUp(config);
    createEvenement(config); // TODO if (evenement non init)
    return scene;
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
			config.scene = createScene(config); // ----------------------------------------------------- NEW
		}
	}
}
