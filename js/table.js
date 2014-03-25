// --------------------- INPUTS : config : la structure fourre tout ------------------------------
// ---------------------  OUTPUR : NONE -----------------------------
// --------------------- FONCTION : cree une table sur laquelle est posé le plateau de jeu ------------------------
// --------------------- AUTEUR : Maxime ------------------------

function createTable (config)
{
	if(!config.table)
		config.table = {};


	config.table.box1 = BABYLON.Mesh.CreateBox("Box1", 5.0, config.scene);

	if(config.ground.mesh)
	{

		config.table.box1.position = new BABYLON.Vector3(0,0,-(config.scenes[config.mapActuelle].mapWidth/2));
		config.table.box1.scaling.z = 0.4*(config.scenes[config.mapActuelle].mapWidth/100);
		config.table.box1.scaling.y = 35*(config.scenes[config.mapActuelle].mapMaxHeight/100);
		config.table.box1.scaling.x = config.scenes[config.mapActuelle].mapWidth/5;
	}


	config.table.box2 = BABYLON.Mesh.CreateBox("Box2", 5.0, config.scene);
	
	if(config.ground.mesh)
	{
		config.table.box2.position = new BABYLON.Vector3(-(config.scenes[config.mapActuelle].mapWidth/2),0,0);
		config.table.box2.scaling.x = 0.4*(config.scenes[config.mapActuelle].mapWidth/100);
		config.table.box2.scaling.y = 35*(config.scenes[config.mapActuelle].mapMaxHeight/100);
		config.table.box2.scaling.z = config.scenes[config.mapActuelle].mapWidth/5;
	}

	config.table.box3 = BABYLON.Mesh.CreateBox("Box3", 5.0, config.scene);
	
	if(config.ground.mesh)
	{
		config.table.box3.position = new BABYLON.Vector3(0,0,(config.scenes[config.mapActuelle].mapWidth/2));
		config.table.box3.scaling.z = 0.4*(config.scenes[config.mapActuelle].mapWidth/100);
		config.table.box3.scaling.y = 35*(config.scenes[config.mapActuelle].mapMaxHeight/100);
		config.table.box3.scaling.x = config.scenes[config.mapActuelle].mapWidth/5;
	}

	config.table.box4 = BABYLON.Mesh.CreateBox("Box4", 5.0, config.scene);
	
	if(config.ground.mesh)
	{
		config.table.box4.position = new BABYLON.Vector3((config.scenes[config.mapActuelle].mapWidth/2),0,0);
		config.table.box4.scaling.x = 0.4*(config.scenes[config.mapActuelle].mapWidth/100);
		config.table.box4.scaling.y = 35*(config.scenes[config.mapActuelle].mapMaxHeight/100);
		config.table.box4.scaling.z = config.scenes[config.mapActuelle].mapWidth/5;
	}

	config.table.box5 = BABYLON.Mesh.CreateBox("Box5", 150.0, config.scene);
	
	if(config.ground.mesh)
	{
		config.table.box5.position = new BABYLON.Vector3(0,-((0.6*(config.scenes[config.mapActuelle].mapWidth/100)*150)/2 - config.scenes[config.mapActuelle].y_margin + 1),0);
		config.table.box5.scaling.x = (config.scenes[config.mapActuelle].mapWidth/150)-((config.scenes[config.mapActuelle].mapWidth/150)*2/100);
		config.table.box5.scaling.y = 0.6*(config.scenes[config.mapActuelle].mapWidth/100);
		config.table.box5.scaling.z = (config.scenes[config.mapActuelle].mapWidth/150)-((config.scenes[config.mapActuelle].mapWidth/150)*2/100);
	}
	
	var materalBois = new BABYLON.StandardMaterial("texture1", config.scene);
	materalBois.bumpTexture = new BABYLON.Texture(config.images.wood_normal, config.scene);
	materalBois.bumpTexture .uScale = 5;
	materalBois.bumpTexture .vScale = 5;
	materalBois.diffuseColor = new BABYLON.Color3(148/255, 130/255, 101/255);
	materalBois.specularColor = new BABYLON.Color3(0,0,0);
	config.table.box1.material = config.table.box2.material = config.table.box3.material = config.table.box4.material = materalBois;

	var materialSupport = new BABYLON.StandardMaterial("texture1", config.scene);
	materialSupport.bumpTexture = new BABYLON.Texture(config.images.wood_normal, config.scene);
	materialSupport.bumpTexture .uScale = 5;
	materialSupport.bumpTexture .vScale = 5;
	materialSupport.emissiveColor = new BABYLON.Color3(53/255, 65/255, 68/255);
	config.table.box5.material = materialSupport;	
};