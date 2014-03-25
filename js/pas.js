// --------------------- INPUTS : config : la structure fourre tout; coordonée xyz ou mettre la trace, bool créer ou non une nouvelle trace ------------------------------
// ---------------------  OUTPUR : NONE -----------------------------
// --------------------- FONCTION : crée des "traces" où le joueur est passé et suprime les anciennes ------------------------
// --------------------- AUTEUR : Maxime ------------------------


function createPas (config, x,y,z, bool, scene)
{

	if(config.oldTimestamp - config.coolDown > 0 && bool) //  && !config.mapActuelle == "globalMap"
	{
		config.coolDown = config.oldTimestamp + 100;
		var box1 = BABYLON.Mesh.CreateSphere("Trace" + config.cpt, 5.0, 0.5*(config.scenes[config.mapActuelle].mapWidth/100), scene);
		box1.position = new BABYLON.Vector3(x,y,z);
		var materalPas = new BABYLON.StandardMaterial("texture1", scene);
		materalPas.emissiveColor = new BABYLON.Color3(1, 1, 1, 1);
		materalPas.alpha = 1.0;
		box1.scaling.y = 0.1;
		box1.material = materalPas;
		config.pas.push(box1);
		config.cpt++;
	}

	for(var i=0;  i < config.pas.length; i++)
	{
		config.pas[i].material.alpha -= 0.02

		if(config.pas[i].material.alpha <= 0)
		{
			config.pas[i].dispose(true);
			config.pas.splice(i, 1);	
		}
	}
};