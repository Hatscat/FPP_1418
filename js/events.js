/*INPUT : config
OUTPUT : NONE
FONCTION : initialise l'evenement de la souris
AUTHOR : LUCIEN, MAX */

function createEvenement (config)
{
	addEventListener('mouseup', function (e)
	{
		var pickResult = config.scene.pick(e.clientX, e.clientY, function(m){return is_in_white_list(m, config.meshes_white_list)});
		var normPosDown = mouse.target.x * mouse.target.x + mouse.target.y * mouse.target.y;
		var normPosUp = mouse.x * mouse.x + mouse.y * mouse.y;
		var marginRatio = config.moveToMouseUpSensitivity;
		if (!config.popUp && pickResult.hit && Math.abs(normPosDown - normPosUp) < normPosUp * marginRatio)
		{
			mouse.target_onClick_3D = {
				x : pickResult.pickedPoint.x,
				z : pickResult.pickedPoint.z,
				targeted_mesh : pickResult.pickedMesh
			};
			console.log(mouse.target_onClick_3D.targeted_mesh.name);
		}
	});
	addEventListener('dblclick', function (e)
	{
		if (config.isGlobalMap)
		{
			var wl = [];
			for (var i in config.villages)
				wl.push(config.villages[i].mesh);

			var pickResult = config.scene.pick(e.clientX, e.clientY, function(m){return is_in_white_list(m, wl)});

			if (pickResult.hit)
			{
				console.log("go to village : " + pickResult.pickedMesh.name);
				scene_transition(config, pickResult.pickedMesh.name, pickResult.pickedMesh.position);
			}
		}
	});
}

function is_in_white_list (m, white_list)
{
	for (var i in white_list)
		if (white_list[i] == m)
			return true;
	return false;
}