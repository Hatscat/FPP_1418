/* INPUTS : config, scene, l'alpha de la bouboule
	OUTPUT :  le player, de type mesh
	FONCTION : crée la bouboule qui nous sert de perso
	AUTHOR : LUCIEN, MAX*/

function createPlayer (config, bool) // bool == config.isGlobalMap
{
	if(!config.player.mesh)
	{
		config.player.mesh = BABYLON.Mesh.CreateSphere("player", 5.0, config.player.size, config.scene);
		var playerMaterial = new BABYLON.StandardMaterial("playerMaterial", config.scene);
		playerMaterial.emissiveColor = new BABYLON.Color4(1, 1, 1, 1);
		config.player.mesh.material = playerMaterial;

		config.player.warfog_collider = BABYLON.Mesh.CreateSphere("player", 2.0, config.player.collider_size, config.scene);
		var colliderMaterial = new BABYLON.StandardMaterial("colliderMaterial", config.scene);
		colliderMaterial.alpha = 0.0;
		config.player.warfog_collider.material = colliderMaterial;
	}

	config.player.mesh.material.alpha = +!bool;
	config.player.mesh.position.x = config.player.origin_x;
	config.player.mesh.position.z = config.player.origin_z;

	//console.log(getYFromMesh(config.scene, config.player.mesh.position, config.ground.mesh));
};

function playerMove (config, camera, player, is_active_keyboard)
{
	var speed = config.player.speed;
	var moveX = 0;
	var moveZ = 0;
	
	if (is_active_keyboard && (!mouse.target_onClick_3D || config.inputs.X_axis || config.inputs.Y_axis))
	{ /* keyboard inputs */
		mouse.target_onClick_3D = null;

		var direction = Math.atan2(camera.position.z - player.mesh.position.z, camera.position.x - player.mesh.position.x);
		var distancesXY = normalize(config.inputs.X_axis, config.inputs.Y_axis);
		moveX = distancesXY.z * Math.cos(direction) + distancesXY.x * Math.cos(direction + Math.PI / 2);
		moveZ = distancesXY.z * Math.sin(direction) + distancesXY.x * Math.sin(direction + Math.PI / 2);
	}
	else if (mouse.target_onClick_3D)
	{ /* mouse inputs */
		var distanceX = mouse.target_onClick_3D.x - player.mesh.position.x + 0.5 | 0;
		var distanceZ = mouse.target_onClick_3D.z - player.mesh.position.z + 0.5 | 0;
		var distancesXZ = normalize(distanceX, distanceZ);
		moveX = distancesXZ.x;
		moveZ = distancesXZ.z;
	}
	if (!config.bReady && moveX + moveZ != 0) config.bReady = true;

	var stepX = moveX * speed * config.deltaTime;
	var stepZ = moveZ * speed * config.deltaTime;
	var posHM = getPosOnHeightMap(player.mesh.position.x + stepX, player.mesh.position.z + stepZ, config.scenes[config.mapActuelle].mapData,
									 config.scenes[config.mapActuelle].mapWidth, config.scenes[config.mapActuelle].mapHeight);
	if (posHM)
	{
		config.posHeightMap = posHM;
		player.mesh.position.y = config.posHeightMap.y - config.player.y_margin;
		player.mesh.position.x += stepX;
		player.mesh.position.z += stepZ;
	}
	else if (!config.isGlobalMap)
	{
		scene_transition(config, "globalMap");
	}
	
	createPas(config, player.mesh.position.x, player.mesh.position.y - config.player.size / 3, player.mesh.position.z,
				((moveX * speed * config.deltaTime != 0 || moveZ * speed * config.deltaTime != 0)), config.scene);

	player.warfog_collider.position = player.mesh.position;

	camera.target.x = player.mesh.position.x;
	camera.target.z = player.mesh.position.z;
	camera.target.y = player.mesh.position.y;

	//console.log(player.mesh.position.x, player.mesh.position.z)
};

function cameraBordersFunction (camera, data, is_active)
{
	if (is_active)
	{
		if (camera.beta < data.beta_min)
			camera.beta = data.beta_min;
		else if (camera.beta > data.beta_max)
			camera.beta = data.beta_max;

		if (camera.radius < data.current_zoom_min)
			camera.radius = data.current_zoom_min;
		else if (camera.radius > data.current_zoom_max)
			camera.radius = data.current_zoom_max;
	}	
};

function checkNearestVillage (config)
{
	var smaller_distance = 10000;
	var nearestVillage;

	for (v in config.villages)
	{
		var d = distanceCarre(config.player.mesh.position, config.villages[v].mesh.position);
		if (d < smaller_distance)
		{
			smaller_distance = d;
			nearestVillage = config.villages[v];
		}
	}
	return nearestVillage;
};

function checkPlayerCollisions (player, veilleur, config)
{
	if (config.bReady && player.intersectsMesh(veilleur, false))
	{
		if (config.playerCanCollide)
		{
			config.playerCanCollide = false;
			yAller = false;
			displayPopUp("village", config.scenes[config.mapActuelle].popUps.village);
			mouse.target_onClick_3D = null;
			config.popUp = false;
		}
	}
	else
	{
		config.playerCanCollide = true;
	}
};