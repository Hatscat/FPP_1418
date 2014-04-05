
/*INPUT : config, identifiant de la map (string)
OUTPUT : scene
FONCTION : crée une map
AUTHOR : LUCIEN, MAX */

function createScene (config)
{
	config.mapActuelle = config.mapSuivante;

	if (!config.scene)
	{
		config.scene = new BABYLON.Scene(config.engine);
		config.light = new BABYLON.PointLight(config.babylon_light.name, new BABYLON.Vector3(config.babylon_light.x, config.babylon_light.y, config.babylon_light.z), config.scene);

		config.lightNight = new BABYLON.PointLight(config.babylon_lightNight.name, new BABYLON.Vector3(config.babylon_lightNight.x, config.babylon_lightNight.y, config.babylon_lightNight.z), config.scene);

		config.lightNight.diffuse = new BABYLON.Color3(0.1, 0.1, 0.5);
		config.light.diffuse = new BABYLON.Color3(config.babylon_light.maxRed, config.babylon_light.maxGreen, config.babylon_light.maxBlue);
		config.light.intensity = 0;
		config.lightNight.intensity = 0.8
		//config.light.specular = new BABYLON.Color3(1, 1, 1);


		createLensflare(config);
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
	
	initPopUp(config);
	config.meshes_white_list = [config.ground.mesh];

	for (var i in config.villages)
		config.meshes_white_list.push(config.villages[i].mesh);

    createEvenement(config); // TODO if (evenement non init)
}


function set_scene_run_loop (config)
{
	config.scene.registerBeforeRender(function ()
	{
		var onOverResult = config.scene.pick(mouse.x, mouse.y, function(m){return is_in_white_list(m, config.meshes_white_list)});
		var timeSinceLastFrame = Date.now() - config.oldTimestamp;
		config.oldTimestamp = Date.now();
		config.deltaTime = timeSinceLastFrame * 0.06;

		dayNightCycle(config);

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
			if(config.scenes[config.mapActuelle].isFisrtTime)
			{
				displayPopUp("tuto", config.scenes[config.mapActuelle].popUps.tuto)
				config.scenes[config.mapActuelle].isFisrtTime = false;
			}
			var nearestVillage = checkNearestVillage(config);

			if (!bPause && config.camera.radius < config.babylon_camera.current_zoom_min * 1.5)
				scene_transition(config, nearestVillage.mesh.name, nearestVillage.mesh.position);
		}
		else
		{
			if (!bPause && config.camera.radius > config.babylon_camera.current_zoom_max)
				scene_transition(config, "globalMap", config.player.mesh.position);
		}

		if (mouse.target_onOver_3D)
		{
			for (var v in config.villages)
			{
				if (mouse.target_onOver_3D.targeted_mesh.name == config.villages[v].mesh.name)
				{
					if(config.isGlobalMap && !bPause && !grosPopUp && !config.ready2ChangeScene)
					{
						displayPopUp("preview", config.scenes[config.mapActuelle].popUps[config.villages[v].mesh.name])
					}

					if (config.villages[v].mesh.material.emissiveColor.r < 1)
					{
						config.villages[v].mesh.material.emissiveColor.r += 0.05 * config.deltaTime;
					}
				}
				else if (config.villages[v].mesh.material.emissiveColor.r > 0)
				{
					config.villages[v].mesh.material.emissiveColor.r -= 0.05 * config.deltaTime;
					
					if (bPause && !grosPopUp)
					{
						hidePopUp();
					}
				}
			}
			mouse.doubleClicks = false;
		}
		cameraBordersFunction(config.camera, config.babylon_camera, !config.ready2ChangeScene);

		if (!bPause)
		{
			playerMove(config, config.camera, config.player);

			if (config.ready2ChangeScene) // ANIM de transition
			{
				config.camera.radius = config.babylon_camera.current_zoom_min = config.babylon_camera.current_zoom_max;

				if (config.isGlobalMap)
				{
					transition_in(config);
				}
				else
				{
					transition_out(config);
				}
			}
		}

		if (!config.isGlobalMap) // POPUP
		{
			if (config.scenes[config.mapActuelle].isFisrtTime && config.firstlocal)
			{
				config.firstlocal = false;
				config.scenes[config.mapActuelle].isFisrtTime = false;
				displayPopUp("tuto", config.scenes[config.mapActuelle].popUps.tuto);
			}

			if (mouse.target_onClick_3D && !bPause)
			{
				for (v in config.villages)
				{
					if (mouse.target_onClick_3D.targeted_mesh.name == config.villages[v].mesh.name)
					{
						displayPopUp("PreviewVillage", config.scenes[config.mapActuelle].popUps)

						mouse.target_onClick_3D = null;
					}
				}
			}
			else if (!bPause)
			{
				for (var v in config.villages)
				{
					checkPlayerCollisions(config.player.mesh, config.villages[v].mesh, config);
				}
			}
		}
	});
}

function transition_in (config)
{
	var nearestVillage = checkNearestVillage(config);
	set_mouse_target_onClick_3D(nearestVillage.mesh.position.x, nearestVillage.mesh.position.z, nearestVillage.mesh);

	if (config.player.mesh.intersectsMesh(nearestVillage.mesh, false)
	&&	(config.babylon_camera.current_zoom_max -= config.deltaTime) < 1)
	{
		disposeThings(config);
		config.babylon_camera.current_zoom_min = config.babylon_camera._fixed_zoom_min;
		config.babylon_camera.current_zoom_max = config.babylon_camera._fixed_zoom_max;
		config.camera.radius = config.babylon_camera._fixed_zoom_max * 0.7;
		config.player.canCollide = false;
		config.ready2ChangeScene = false;
		createScene(config);
	}
}

function transition_out (config)
{
	if ((config.babylon_camera.current_zoom_max += config.deltaTime * 16) > config.babylon_camera._fixed_zoom_max * 16)
	{
		mouse.target_onClick_3D = null;
		disposeThings(config);
		config.babylon_camera.current_zoom_min = config.babylon_camera._fixed_zoom_min;
		config.babylon_camera.current_zoom_max = config.babylon_camera._fixed_zoom_max;
		config.camera.radius = config.babylon_camera._fixed_zoom_max * 0.7;
		config.player.canCollide = false;
		config.ready2ChangeScene = false;
		createScene(config);
	}
}

function scene_transition (config, next_scene, village_position)
{
	config.ready2ChangeScene = true;
	config.mapSuivante = next_scene;
	hidePopUp();
}

