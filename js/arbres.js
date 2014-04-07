/* INPUTS : config,
	OUTPUT : none
	FONCTION : crée les arbres de la scene
	AUTHOR : MAX*/
	
function createForet (config)  // ---------------------------------------------------------------------------
{
	var t = 0;
	for(k=0; k < config.scenes[config.mapActuelle].ArbresPos.length; k++)
	{
		for(i=config.scenes[config.mapActuelle].ArbresPos[k][0]; i<config.scenes[config.mapActuelle].ArbresPos[k][0]+config.scenes[config.mapActuelle].ArbresPos[k][2]; i+=((Math.random()*10)+2)*config.tree_dispersion*config.taille)
		{
			for(j=config.scenes[config.mapActuelle].ArbresPos[k][1]; j<config.scenes[config.mapActuelle].ArbresPos[k][1]+config.scenes[config.mapActuelle].ArbresPos[k][3]; j+=((Math.random()*15)+3)*config.tree_dispersion*config.taille)
			{
				if(t%2 == 0)
					createArbreToufu(config, i, getPosOnHeightMap(i, j, config.scenes[config.mapActuelle].mapData, config.scenes[config.mapActuelle].mapWidth, config.scenes[config.mapActuelle].mapHeight).y, j, (Math.random()*5 + 3)/50);

				else
					createArbreSapin(config, i, getPosOnHeightMap(i, j, config.scenes[config.mapActuelle].mapData, config.scenes[config.mapActuelle].mapWidth, config.scenes[config.mapActuelle].mapHeight).y, j, (Math.random()*5 + 3)/50);

			}
		}
		t = Math.floor(Math.random()*2)+1;
	}
};

/* INPUTS : config, la possition et la taille de l'arbre, et la scene
	OUTPUT :  NONE
	FONCTION : crée un touffu
	AUTHOR :MAX*/

function createArbreToufu (config, x, y, z, scale) 
{
	var scale = scale || 1;
	var arbre = {};
	var troncColor = Math.floor(Math.random()*4)
	var typeFeuilles = Math.floor(Math.random()*3)
	var colorFeuilles = Math.floor(Math.random()*4)

	arbre.cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 60*scale, 10*scale, 6*scale, 5, config.scene, false);
	arbre.cylinder.scaling.x = 0.4*config.taille;
	arbre.cylinder.scaling.y = 0.4*config.taille;
	arbre.cylinder.scaling.z = 0.4*config.taille;
	arbre.cylinder.position = new BABYLON.Vector3(x,y,z);
	
	arbre.sphere = BABYLON.Mesh.CreateSphere("sphere", 5, 20*scale,config.scene);
	arbre.sphere.position = new BABYLON.Vector3(arbre.cylinder.position.x,arbre.cylinder.position.y+(50*scale*arbre.cylinder.scaling.y),arbre.cylinder.position.z);
	arbre.sphere.scaling.x = 1*config.taille;
	arbre.sphere.scaling.y = 1.04*config.taille;
	arbre.sphere.scaling.z = 0.84*config.taille;
	
	var materialtronc = new BABYLON.StandardMaterial("texture1", config.scene);
	materialtronc.bumpTexture = new BABYLON.Texture(config.images.wood_normal, config.scene);  // ---------------------------------------------------------------------------
	materialtronc.bumpTexture .uScale = 5;
	materialtronc.bumpTexture .vScale = 5;
	materialtronc.diffuseColor = new BABYLON.Color3(config.toufu.rgbTronc[troncColor*3]/255, config.toufu.rgbTronc[troncColor*3+1]/255, config.toufu.rgbTronc[troncColor*3+2]/255);
	materialtronc.specularColor = new BABYLON.Color3(0,0,0);
	arbre.cylinder.material =  materialtronc;

	var materialfeuilles = new BABYLON.StandardMaterial("texture1", config.scene);
	materialfeuilles.bumpTexture = new BABYLON.Texture(config.images.leave_normal, config.scene);  // ---------------------------------------------------------------------------
	materialfeuilles.bumpTexture .uScale = 5;
	materialfeuilles.bumpTexture .vScale = 5;
	materialfeuilles.diffuseColor = new BABYLON.Color3(config.toufu.rgbFeuiles[typeFeuilles][colorFeuilles*3]/255, config.toufu.rgbFeuiles[typeFeuilles][colorFeuilles*3+1]/255, config.toufu.rgbFeuiles[typeFeuilles][colorFeuilles*3+2]/255);
	materialfeuilles.specularColor = new BABYLON.Color3(0, 0, 0);
	arbre.sphere.material = materialfeuilles;

	config.arbres.push(arbre);
};

/* INPUTS : config, la possition et la taille de l'arbre, et la scene
	OUTPUT :  NONE
	FONCTION : crée un sapin
	AUTHOR :MAX*/

function createArbreSapin (config, x, y, z, scale)  // ---------------------------------------------------------------------------
{
	var scale = scale || 1;
	var arbre = {};
	var troncColor = Math.floor(Math.random()*4);
	var typeFeuilles = Math.floor(Math.random()*3);
	var colorFeuilles = Math.floor(Math.random()*4);

	arbre.cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 15*scale, 12*scale, 12*scale, 5, config.scene, false);
	arbre.cylinder2 = BABYLON.Mesh.CreateCylinder("cylinder", 24*scale, 60*scale, 30*scale, 5, config.scene, false);
	arbre.cylinder3 = BABYLON.Mesh.CreateCylinder("cylinder", 24*scale, 45*scale, 15*scale, 5, config.scene, false);
	arbre.cylinder4 = BABYLON.Mesh.CreateCylinder("cylinder", 30*scale, 30*scale, 0*scale, 6, config.scene, false);
	arbre.cylinder.scaling.x = arbre.cylinder2.scaling.x = arbre.cylinder3.scaling.x = arbre.cylinder4.scaling.x = 0.4*config.taille;
	arbre.cylinder.scaling.y = arbre.cylinder2.scaling.y = arbre.cylinder3.scaling.y = arbre.cylinder4.scaling.y = 0.4*config.taille;
	arbre.cylinder.scaling.z = arbre.cylinder2.scaling.z = arbre.cylinder3.scaling.z = arbre.cylinder4.scaling.z = 0.4*config.taille;
	arbre.cylinder.position = new BABYLON.Vector3(x,y,z);
	arbre.cylinder2.position = new BABYLON.Vector3(arbre.cylinder.position.x,arbre.cylinder.position.y+(15*scale*arbre.cylinder.scaling.y),arbre.cylinder.position.z);
	arbre.cylinder3.position = new BABYLON.Vector3(arbre.cylinder2.position.x,arbre.cylinder2.position.y+(24*scale*arbre.cylinder.scaling.y),arbre.cylinder.position.z);
	arbre.cylinder4.position = new BABYLON.Vector3(arbre.cylinder3.position.x,arbre.cylinder3.position.y+(24*scale*arbre.cylinder.scaling.y),arbre.cylinder.position.z);

	var materialtronc = new BABYLON.StandardMaterial("texture1", config.scene);
	materialtronc.bumpTexture = new BABYLON.Texture(config.images.wood_normal, config.scene);  // ---------------------------------------------------------------------------
	materialtronc.bumpTexture .uScale = 5;
	materialtronc.bumpTexture .vScale = 5;
	materialtronc.diffuseColor = new BABYLON.Color3(config.sapin.rgbTronc[troncColor*3]/255, config.sapin.rgbTronc[troncColor*3+1]/255, config.sapin.rgbTronc[troncColor*3+2]/255);
	materialtronc.specularColor = new BABYLON.Color3(0, 0, 0);
	arbre.cylinder.material =  materialtronc;

	var materialfeuilles = new BABYLON.StandardMaterial("texture1", config.scene);
	materialfeuilles.bumpTexture = new BABYLON.Texture(config.images.leave_normal, config.scene);  // ---------------------------------------------------------------------------
	materialfeuilles.bumpTexture .uScale = 5;
	materialfeuilles.bumpTexture .vScale = 5;
	materialfeuilles.diffuseColor = new BABYLON.Color3(config.sapin.rgbFeuiles[typeFeuilles][colorFeuilles*3]/255, config.sapin.rgbFeuiles[typeFeuilles][colorFeuilles*3+1]/255, config.sapin.rgbFeuiles[typeFeuilles][colorFeuilles*3+2]/255);
	materialfeuilles.specularColor = new BABYLON.Color3(0, 0, 0);
	arbre.cylinder2.material = arbre.cylinder3.material = arbre.cylinder4.material = materialfeuilles;
	config.arbres.push(arbre);
};



/*function createArbreToufu_model (config, x, y, z, scale) 
{
	var scale = scale || 1;
	var arbre = {};
	var troncColor = Math.floor(Math.random()*4);
	var typeFeuilles = Math.floor(Math.random()*3);
	var colorFeuilles = Math.floor(Math.random()*4);

	arbre.cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 60*scale, 10*scale, 6*scale, 5, config.scene, false);
	arbre.cylinder.scaling.x = 0.4*config.taille;
	arbre.cylinder.scaling.y = 0.4*config.taille;
	arbre.cylinder.scaling.z = 0.4*config.taille;
	arbre.cylinder.position = new BABYLON.Vector3(x,y,z);
	
	arbre.sphere = BABYLON.Mesh.CreateSphere("sphere", 5, 20*scale,config.scene);
	arbre.sphere.position = new BABYLON.Vector3(arbre.cylinder.position.x,arbre.cylinder.position.y+(50*scale*arbre.cylinder.scaling.y),arbre.cylinder.position.z);
	arbre.sphere.scaling.x = 1*config.taille;
	arbre.sphere.scaling.y = 1.04*config.taille;
	arbre.sphere.scaling.z = 0.84*config.taille;

	return arbre;
};

function createArbreSapin_model (config, x, y, z, scale)  // ---------------------------------------------------------------------------
{
	var scale = scale || 1;
	var arbre = {};
	var troncColor = Math.floor(Math.random()*4);
	var typeFeuilles = Math.floor(Math.random()*3);
	var colorFeuilles = Math.floor(Math.random()*4);

	arbre.cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 15*scale, 12*scale, 12*scale, 5, config.scene, false);
	arbre.cylinder2 = BABYLON.Mesh.CreateCylinder("cylinder", 24*scale, 60*scale, 30*scale, 5, config.scene, false);
	arbre.cylinder3 = BABYLON.Mesh.CreateCylinder("cylinder", 24*scale, 45*scale, 15*scale, 5, config.scene, false);
	arbre.cylinder4 = BABYLON.Mesh.CreateCylinder("cylinder", 30*scale, 30*scale, 0*scale, 6, config.scene, false);
	arbre.cylinder.scaling.x = arbre.cylinder2.scaling.x = arbre.cylinder3.scaling.x = arbre.cylinder4.scaling.x = 0.4*config.taille;
	arbre.cylinder.scaling.y = arbre.cylinder2.scaling.y = arbre.cylinder3.scaling.y = arbre.cylinder4.scaling.y = 0.4*config.taille;
	arbre.cylinder.scaling.z = arbre.cylinder2.scaling.z = arbre.cylinder3.scaling.z = arbre.cylinder4.scaling.z = 0.4*config.taille;
	arbre.cylinder.position = new BABYLON.Vector3(x,y,z);
	arbre.cylinder2.position = new BABYLON.Vector3(arbre.cylinder.position.x,arbre.cylinder.position.y+(15*scale*arbre.cylinder.scaling.y),arbre.cylinder.position.z);
	arbre.cylinder3.position = new BABYLON.Vector3(arbre.cylinder2.position.x,arbre.cylinder2.position.y+(24*scale*arbre.cylinder.scaling.y),arbre.cylinder.position.z);
	arbre.cylinder4.position = new BABYLON.Vector3(arbre.cylinder3.position.x,arbre.cylinder3.position.y+(24*scale*arbre.cylinder.scaling.y),arbre.cylinder.position.z);
	
	return arbre;
};*/