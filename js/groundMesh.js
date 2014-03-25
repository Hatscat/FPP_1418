/* INPUTS : config, scene
	OUTPUT : ground de type mesh
	FONCTION : crée le sol
	AUTHOR : LUCIEN, MAX*/

function createGroundMesh (scene, config)
{
	var ground = createGroundFromData("ground", config.mapData, config.mapWidth, config.mapHeight, config.subdivisions, scene, false);
	var groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture(config.images.map_texture, scene);
	groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	groundMaterial.bumpTexture = new BABYLON.Texture(config.images.bumpmap, scene);
	groundMaterial.bumpTexture.uScale = config.bump_width_subdivisions;
	groundMaterial.bumpTexture.vScale = config.bump_height_subdivisions;
	ground.mesh.position.y = config.y_margin;
	ground.mesh.material = groundMaterial;
	return ground;
};
