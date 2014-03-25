function disposeThings(config)
{
	config.ground.mesh.dispose(false);

	for( var c in config.table)
	{
		config.table[c].dispose(false);
	}

	for (var i = 0; i<config.villages.length;i++)
		config.villages[i].mesh.dispose(false);

	for (var i = 0; i<config.arbres.length;i++)
	{
		for (b in config.arbres[i])
		{
			if(config.arbres[i][b])
				config.arbres[i][b].dispose(false);
		}
	}
};