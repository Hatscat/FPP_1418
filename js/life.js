function createLife (config)
{
	config.animals 	= [];
	var rand_nb 	= 20 + Math.random() * 6 | 0;
	var map 		= config.scenes[config.mapActuelle];
	var map_w 		= map.mapWidth;
	var map_h 		= map.mapHeight;

	for (var i = rand_nb; i--;)
	{
		rand_nb 					= Math.random();
		var rand_nb_2 				= Math.random();
		var animal 					= {};
		var randX 					= rand_nb * map_w - map_w / 2;
		var randZ 					= rand_nb_2 * map_h - map_h / 2;
		var materiaAnimal 			= new BABYLON.StandardMaterial("texture1", config.scene);

		animal.size 				= 0.3;
		animal.margin_y 			= animal.size / 1.5;
		animal.sphere 				= BABYLON.Mesh.CreateSphere("sphere", 4, animal.size, config.scene);
		animal.sphere.position 		= new BABYLON.Vector3(randX, getPosOnHeightMap(randX, randZ, map.mapData, map_w, map_h).y + animal.margin_y, randZ);
		animal.speed 				= rand_nb * 0.5;
		animal.direction_x 			= (rand_nb > 0.5) * 2 - 1;
		animal.direction_z 			= (rand_nb_2 > 0.5) * 2 - 1;

		materiaAnimal.diffuseColor 	= new BABYLON.Color3(rand_nb, rand_nb_2, rand_nb * rand_nb_2);
		materiaAnimal.specularColor = new BABYLON.Color3(0, 0, 0);
		animal.sphere.material 		= materiaAnimal;
		config.animals.push(animal);
	}
}

function moveAnimals (config)
{
	var rand_nb_1 			= Math.random();
	var rand_nb_2 			= Math.random();
	var rand_animal 		= rand_nb_1 * config.animals.length | 0;

	config.animals[rand_animal].direction_x = (rand_nb_1 > 0.5) * 2 - 1;
	config.animals[rand_animal].direction_z = (rand_nb_2 > 0.5) * 2 - 1;

	for (var i1 in config.animals)
	{
		var step_x = config.animals[i1].direction_x * config.animals[i1].speed * config.deltaTime;
		var step_z = config.animals[i1].direction_z * config.animals[i1].speed * config.deltaTime;
		var posHM = getPosOnHeightMap(	config.animals[i1].sphere.position.x + step_x,
										config.animals[i1].sphere.position.z + step_z,
										config.scenes[config.mapActuelle].mapData,
										config.scenes[config.mapActuelle].mapWidth,
										config.scenes[config.mapActuelle].mapHeight);

		if (posHM)
		{
			config.animals[i1].sphere.position.y = posHM.y + config.animals[i1].margin_y;
			config.animals[i1].sphere.position.x += step_x;
			config.animals[i1].sphere.position.z += step_z;
		}
		else
		{
			config.animals[rand_animal].direction_x *= -1;
			config.animals[rand_animal].direction_z *= -1;
		}
	}
}