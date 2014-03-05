/*INPUT : config, identifiant de la map (string)
OUTPUT : NONE
FONCTION : fait l'animation (je recomande de l'assacrone)
AUTHOR : MAX */

function changeScene (config, id)
{
	//ANIM
	config.scene = createScene(config, id);
};

/*INPUT : config, identifiant de la map (string)
OUTPUT : scene
FONCTION : crée une map
AUTHOR : LUCIEN, MAX */

function createScene (config, id) // TODO en faire une scene globale (pions tout ça tout ça)
{
	config.mapActuelle = id;
	var scene = new BABYLON.Scene(config.engine);
	config.light = new BABYLON.PointLight(config.babylon_light.name, new BABYLON.Vector3(config.babylon_light.x, config.babylon_light.y, config.babylon_light.z), scene);
	config.camera = new BABYLON.ArcRotateCamera(config.babylon_camera.name, config.babylon_camera.alpha, config.babylon_camera.beta, config.babylon_camera.radius, new BABYLON.Vector3(config.babylon_camera.x, config.babylon_camera.y, config.babylon_camera.z), scene);
	var skybox = createSkybox(scene, config);
	var ground = createGroundMesh(scene, config.scenes[id]);
	config.groundMesh = ground.mesh;
	config.groundData = ground.data;
	var villages = createVillages(scene, config.scenes[id]);
	var isGlobalMap = id == "globalMap";
	var player = createPlayer(scene, config.player, !isGlobalMap);
	scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
	scene.fogDensity = config.scenes[id].fogDensity;
	createTable(config.scenes[id], scene, config.images.wood_normal);
	
	if (config.scenes[id].ArbresPos)
		createForet(config.scenes[id], scene);
	
	if (isGlobalMap)
	{
		scene.registerBeforeRender(function ()
		{
			commonSceneUpdate(config, player);

			if (mouse.target_onOver_3D)
			{
				for (var v in villages)
				{
					if (mouse.target_onOver_3D.targeted_mesh == villages[v].name) // || == "bubble"
					{
						console.log(v);
						onMouseOver(villages[v].collider, villages[v].bubble); // à changer ça, plus de bubble
						
						if (mouse.doubleClicks) // || zoom > ...
						{
							mouse.doubleClicks = false;
							changeScene(config, villages[v].name);
						}
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
					checkPlayerCollisions(player, villages[v].collider, config);
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
function commonSceneUpdate (config, player)
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

	if (!config.inputs.bPause)
	{
		cameraBordersFunction(config.camera, config.babylon_camera);
		playerMove(config, config.camera, player);
	}
}
