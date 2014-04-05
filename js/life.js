function createLife(config)
{
	config.animals = []
	var rand = Math.random()*30

	for(var i=0; i<rand; i++)
	{
		var animal 	= {}
		var randX 	= Math.min( Math.random()*2*config.scenes[config.mapActuelle].mapWidth-config.scenes[config.mapActuelle].mapWidth, config.scenes[config.mapActuelle].mapWidth)
		var randZ 	= Math.min( Math.random()*2*config.scenes[config.mapActuelle].mapHeight-config.scenes[config.mapActuelle].mapHeight, config.scenes[config.mapActuelle].mapHeight) 

		animal.sphere 			= BABYLON.Mesh.CreateSphere("shpere", 5, 0.5, config.scene);
		animal.sphere.position 	= new BABYLON.Vector3(randX,getPosOnHeightMap(randX, randZ, config.scenes[config.mapActuelle].mapData, config.scenes[config.mapActuelle].mapWidth, config.scenes[config.mapActuelle].mapHeight).y,randZ);
		animal.speed = Math.random();
		var materiaAnimal 		= new BABYLON.StandardMaterial("texture1", config.scene);
		
		materiaAnimal.diffuseColor 	= new BABYLON.Color3(Math.random(), Math.min(Math.random()+0.5, 1), Math.random());
		materiaAnimal.specularColor = new BABYLON.Color3(0, 0, 0);
		animal.sphere.material 		= materiaAnimal;
		config.animals.push(animal);
	}
}

function moveAnimals(config)
{
	for(var i=0; i<10; i++)
	{
		var rand = Math.floor(Math.random()*(config.animals.length-1));
		var directionX = Math.floor( (Math.random()*2) )-1; 
		var directionY = Math.floor( (Math.random()*2) )-1;

		if(config.animals[rand].sphere.position.x + config.animals[rand].speed*directionX < config.scenes[config.mapActuelle].mapWidth && config.animals[rand].sphere.position.x + config.animals[rand].speed*directionX > 0)
			config.animals[rand].sphere.position.x += config.animals[rand].speed*directionX;

		if(config.animals[rand].sphere.position.z + config.animals[rand].speed*directionY < config.scenes[config.mapActuelle].mapHeight && config.animals[rand].sphere.position.z + config.animals[rand].speed*directionY > 0)
			config.animals[rand].sphere.position.z += config.animals[rand].speed*directionY;

		config.animals[rand].sphere.position.y = getPosOnHeightMap(config.animals[rand].sphere.position.x, config.animals[rand].sphere.position.z, config.scenes[config.mapActuelle].mapData, config.scenes[config.mapActuelle].mapWidth, config.scenes[config.mapActuelle].mapHeight).y

	}
}