/* INPUTS : config, scene
	OUTPUT :  la skybox skybox
	FONCTION : crée la skybox
	AUTHOR : LUCIEN, MAX*/

function createSkybox (config)
{
	var skybox = BABYLON.Mesh.CreateBox("skyBox", config.skybox.size, config.scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", config.scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(config.skybox.images, config.scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;
	return skybox;
};