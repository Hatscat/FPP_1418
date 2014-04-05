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
function dayNightCycle(config)
{
	if(config.oldTimestamp > config.updateTime+config.tempoRotation)
	{

		if(config.babylon_light.angle%(2*Math.PI)  > (Math.PI/24)%(2*Math.PI) && config.babylon_light.angle%(2*Math.PI)  < (Math.PI/2)%(2*Math.PI))
		{
			config.light.diffuse.r += (1-config.babylon_light.maxRed)/((config.timeRotation/4)/(config.tempoRotation));
			config.light.diffuse.g += (1-config.babylon_light.maxGreen)/((config.timeRotation/4)/(config.tempoRotation));
			config.light.diffuse.b += (1-config.babylon_light.maxBlue)/((config.timeRotation/4)/(config.tempoRotation));
			config.light.intensity += 1/((config.timeRotation/4)/(config.tempoRotation))
			config.lightNight.intensity -= 0.8/((config.timeRotation/4)/(config.tempoRotation))
			
		}
		else if(config.babylon_light.angle%(2*Math.PI)  > (Math.PI/2)%(2*Math.PI) && config.babylon_light.angle%(2*Math.PI)  < (Math.PI)%(2*Math.PI))
		{
			config.light.diffuse.r -= (1-config.babylon_light.maxRed)/((config.timeRotation/4)/(config.tempoRotation));
			config.light.diffuse.g -= (1-config.babylon_light.maxGreen)/((config.timeRotation/4)/(config.tempoRotation));
			config.light.diffuse.b -= (1-config.babylon_light.maxBlue)/((config.timeRotation/4)/(config.tempoRotation));
			config.light.intensity -= 1/((config.timeRotation/4)/(config.tempoRotation))
			config.lightNight.intensity += 0.8/((config.timeRotation/4)/(config.tempoRotation))

		}

		if(config.babylon_light.angle%(2*Math.PI) > Math.PI%(2*Math.PI) && config.wayOfTheSun == 1)
		{
			config.timeRotation = config.timeRotation/4
			config.lensFlareSystem.dispose()
			config.lightNight.intensity = 0.8
			config.light.intensity = 0;
			config.lightNight.diffuse = new BABYLON.Color3(0.1, 0.1, 0.5);
			config.light.diffuse = new BABYLON.Color3(config.babylon_light.maxRed, config.babylon_light.maxGreen, config.babylon_light.maxBlue);
			config.wayOfTheSun = -1
		}

		else if(config.babylon_light.angle%(2*Math.PI)  > (Math.PI/24)%(2*Math.PI) && config.babylon_light.angle%(2*Math.PI)  < (Math.PI/2)%(2*Math.PI) && config.wayOfTheSun == -1)
		{
			config.timeRotation = config.timeRotation*4
			createLensflare(config);
			config.wayOfTheSun = 1
		}

		config.light.position.x = Math.cos(config.babylon_light.angle)*100;
		config.lightNight.position.x = Math.cos(config.babylon_lightNight.angle)*100;
		config.light.position.y = Math.sin(config.babylon_light.angle)*100;
		config.lightNight.position.y = Math.sin(config.babylon_lightNight.angle)*100;
		config.babylon_light.angle += Math.PI/(config.timeRotation/config.tempoRotation);
		//config.babylon_lightNight.angle += Math.PI/(config.timeRotation/config.tempoRotation);
		config.updateTime = config.oldTimestamp;


	}
}