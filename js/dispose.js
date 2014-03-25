function disposeThings(config)
{
	config.ground.mesh.dispose(true);

	for( var c in config.table)
	{
		config.scene._toBeDisposed.push(config.table[c])
	}
	config.table = {};

	for (var i = 0; i<config.villages.length;i++)
		config.scene._toBeDisposed.push(config.villages[i].mesh)

	config.villages = [];

	for (var i = 0; i<config.arbres.length;i++)
	{
		for (b in config.arbres[i])
		{
			if(config.arbres[i][b])
				config.scene._toBeDisposed.push(config.arbres[i][b])
		}
	}

	config.arbres = [];
};