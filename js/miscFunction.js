function onMouseOver (mesh, bubble) // a changer, plus de bubble
{
	if (mouse.target_onOver_3D.targeted_mesh.name == mesh.name || mouse.target_onOver_3D.targeted_mesh.name == "bubble") 
	{
		if (bubble.scaling.x < bubble.render_size)
		{
			bubble.scaling.x = bubble.scaling.y = bubble.scaling.z += 0.5;
		}
	}
	else
	{
		if (bubble.scaling.x > 0.1)
		{
			bubble.scaling.x = bubble.scaling.y = bubble.scaling.z -= 0.5;
		}
	}
}

function cameraBordersFunction (camera, data)
{
	if (camera.beta < data.beta_min)
		camera.beta = data.beta_min;
	else if (camera.beta > data.beta_max)
		camera.beta = data.beta_max;

	if (camera.radius < data.zoom_min)
		camera.radius = data.zoom_min;
	else if (camera.radius > data.zoom_max)
		camera.radius = data.zoom_max;
};

function playerMove (config, camera, player)
{
	var speed = config.player.speed;
	var moveX = 0;
	var moveZ = 0;
	
	if (!mouse.target_onClick_3D || config.inputs.X_axis || config.inputs.Y_axis)
	{ /* keyboard inputs */
		mouse.target_onClick_3D = null;

		var direction = Math.atan2(camera.position.z - player.position.z, camera.position.x - player.position.x);
		var normalisationRatio = Math.abs(config.inputs.X_axis) + Math.abs(config.inputs.Y_axis);
		normalisationRatio = normalisationRatio ? normalisationRatio : 1;
		moveX = config.inputs.Y_axis / normalisationRatio * Math.cos(direction)
			+ config.inputs.X_axis / normalisationRatio * Math.cos(direction + Math.PI / 2);
		moveZ = config.inputs.Y_axis / normalisationRatio * Math.sin(direction)
			+ config.inputs.X_axis / normalisationRatio * Math.sin(direction + Math.PI / 2);
	}
	else
	{ /* mouse inputs */
		var distanceX = mouse.target_onClick_3D.x - player.position.x + 0.5 | 0;
		var distanceZ = mouse.target_onClick_3D.z - player.position.z + 0.5 | 0;
		var normalisationRatio = Math.abs(distanceX) + Math.abs(distanceZ);
		normalisationRatio = normalisationRatio ? normalisationRatio : 1;
		moveX = distanceX / normalisationRatio;
		moveZ = distanceZ / normalisationRatio;
	}

	if (!config.bReady && moveX + moveZ != 0) config.bReady = true;

	player.position.x += moveX * speed * config.deltaTime;
	player.position.z += moveZ * speed * config.deltaTime;
	config.posHeightMap = getPosOnHeightMap(player.position.x, player.position.z, config.scenes[config.mapActuelle].mapData, config.scenes[config.mapActuelle].mapWidth, config.scenes[config.mapActuelle].mapHeight);
	player.position.y = config.posHeightMap.y - config.player.y_margin;

	createPas(config, player.position.x, player.position.y, player.position.z, ((moveX * speed * config.deltaTime != 0 || moveZ * speed * config.deltaTime != 0)), config.scene)


	camera.target.x = player.position.x;
	camera.target.z = player.position.z;
	camera.target.y = player.position.y;
}

function checkPlayerCollisions (player, veilleur, config)
{
	if (config.bReady && player.intersectsMesh(veilleur, false))
	{
		if (config.playerCanCollide)
		{
			config.playerCanCollide = false;
			config.inputs.bPause = true;
			config.popUpCraonne = true;
			mouse.target_onClick_3D = null;
			config.popUp = false;
		}
	}
	else
	{
		config.playerCanCollide = true;
	}
};