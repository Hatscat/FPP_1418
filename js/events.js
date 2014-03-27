/*INPUT : config
OUTPUT : NONE
FONCTION : initialise l'evenement de la souris
AUTHOR : LUCIEN, MAX */

function createEvenement (config, white_list)
{
	addEventListener('mouseup', function (e)
	{
		var pickResult = config.scene.pick(e.clientX, e.clientY, function (m) {
			for (var i in white_list)
				if (white_list[i] == m)
					return true;
			return false;
		});
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
}
