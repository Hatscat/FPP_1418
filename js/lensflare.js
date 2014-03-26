function createLensflare(config)
{
	config.lensFlareSystem = new BABYLON.LensFlareSystem("lensFlareSystem", config.light, config.scene);

	var flare00 = new BABYLON.LensFlare(0.2, 0, new BABYLON.Color3(1, 1, 1), "img/misc/lens5.png", config.lensFlareSystem);
	var flare01 = new BABYLON.LensFlare(0.5, 0.2, new BABYLON.Color3(0.5, 0.5, 1), "img/misc/lens4.png", config.lensFlareSystem);
	var flare02 = new BABYLON.LensFlare(0.2, 1.0, new BABYLON.Color3(1, 1, 1), "img/misc/lens4.png", config.lensFlareSystem);
	var flare03 = new BABYLON.LensFlare(0.4, 0.4, new BABYLON.Color3(1, 0.5, 1), "img/misc/Flare.png", config.lensFlareSystem);
	var flare04 = new BABYLON.LensFlare(0.1, 0.6, new BABYLON.Color3(1, 1, 1), "img/misc/lens5.png", config.lensFlareSystem);
	var flare05 = new BABYLON.LensFlare(0.3, 0.8, new BABYLON.Color3(1, 1, 1), "img/misc/lens4.png", config.lensFlareSystem);
}
function dayNightCycle(config, sensDepart, fisrtWayToChange)
{
	if(config.oldTimestamp > config.updateTime+config.tempoRotation)
	{
		if(config.wayOfTheSunY == -1)
		{
			config.light.diffuse.r += config.amplitudeRotationX/((config.timeRotation/4)/config.tempoRotation)*config.wayOfTheSunX*0.2/100;
			config.light.diffuse.g += config.amplitudeRotationX/((config.timeRotation/4)/config.tempoRotation)*config.wayOfTheSunX*0.6/100;
			config.light.diffuse.b += config.amplitudeRotationX/((config.timeRotation/4)/config.tempoRotation)*config.wayOfTheSunX*0.9/100;
			
		}
		else
		{
			config.light.diffuse.r += config.amplitudeRotationX/((config.timeRotation/4)/config.tempoRotation)*(-config.wayOfTheSunX)*0.2/100;
			config.light.diffuse.g += config.amplitudeRotationX/((config.timeRotation/4)/config.tempoRotation)*(-config.wayOfTheSunX)*0.4/100;
			config.light.diffuse.b += config.amplitudeRotationX/((config.timeRotation/4)/config.tempoRotation)*(-config.wayOfTheSunX)*0.9/100;
		}
		config.light.position.x += config.amplitudeRotationX/((config.timeRotation/4)/config.tempoRotation)*config.wayOfTheSunX;

		config.lightNight.position.x -= config.amplitudeRotationX/((config.timeRotation/4)/config.tempoRotation)*config.wayOfTheSunX;
		config.light.position.y += config.amplitudeRotationY/((config.timeRotation/4)/config.tempoRotation)*config.wayOfTheSunY;
		config.lightNight.position.y -= config.amplitudeRotationY/((config.timeRotation/4)/config.tempoRotation)*config.wayOfTheSunY;
		config.updateTime = config.oldTimestamp;

		if( config.light.position.x < config.babylon_light.x+config.amplitudeRotationX*config.wayOfTheSunX+5 && config.light.position.x > config.babylon_light.x+config.amplitudeRotationX*config.wayOfTheSunX && config.light.position.y < config.babylon_light.y+config.amplitudeRotationY*config.wayOfTheSunY+5 && config.light.position.y > config.babylon_light.y+config.amplitudeRotationY*config.wayOfTheSunY && config.wayOfTheSunY == sensDepart)
		{
			config.wayOfTheSunX*=-1;
			config.light.intensity = 0;
			config.lightNight.intensity = 0.8;
			config.lensFlareSystem.dispose()
		}

		else if(config.light.position.x < config.babylon_light.x+5 && config.light.position.x > config.babylon_light.x && config.light.position.y > config.babylon_light.y+2*config.amplitudeRotationY*config.wayOfTheSunY && config.light.position.y < config.babylon_light.y+2*config.amplitudeRotationY*config.wayOfTheSunY+5 && config.wayOfTheSunY == sensDepart)
		{
			config.wayOfTheSunY*=-1;
		}

		else if( config.light.position.x < config.babylon_light.x+config.amplitudeRotationX*config.wayOfTheSunX+5 && config.light.position.x > config.babylon_light.x+config.amplitudeRotationX*config.wayOfTheSunX && config.light.position.y > config.babylon_light.y-config.amplitudeRotationY*config.wayOfTheSunY && config.light.position.y < config.babylon_light.y-config.amplitudeRotationY*config.wayOfTheSunY+5 && config.wayOfTheSunX == -sensDepart)
		{
			config.wayOfTheSunX*=-1;
			config.light.intensity = 1;
			config.light.diffuse = new BABYLON.Color3(0.8, 0.6, 0.1);
			createLensflare(config);

			config.lightNight.intensity = 0;

		}
		else if(config.light.position.x < config.babylon_light.x && config.light.position.x > config.babylon_light.x-5 && config.light.position.y > config.babylon_light.y && config.light.position.y < config.babylon_light.y+10 && config.wayOfTheSunY == -sensDepart)
		{
			config.wayOfTheSunY*=-1;
			config.light.diffuse = new BABYLON.Color3(1, 1, 1);
			config.light.position.x = config.babylon_light.x;
			/*config.lightNight.position.x = -200;*/
			config.light.position.y = config.babylon_light.y;
			/*config.lightNight.position.y = 0;*/
		}
	}
}