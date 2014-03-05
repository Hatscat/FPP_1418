/*INPUT : NONE
OUTPUT : variable fourre tout : config
FONCTION : permet d'avoir toutes les variables de config
AUTHOR : LUCIEN, MAX */

function getConfig ()
{
	var config = {

		videos : {

		},

		scenes : 
		{
			globalMap : 
			{
				mapMaxHeight : 10,
				mapWidth : 500,
				mapHeight : 500,
				subdivisions : 255,
				bump_width_subdivisions : 200,
				bump_height_subdivisions : 200,
				y_margin: -2.1,

				images : {
					map_texture : "img/satmap.jpg",
					heightmap : "img/heightMap.jpg",
					skybox : "img/skybox/skybox",
					wood_normal : "img/normal_trunk.jpg",
					leave_normal : "img/normal_leaves.jpg"
				},

				villages : 
				[
					{
						name : "craonne",
						x : -120,
						z : -150,
						y_margin : 3.5,
						scale : 0.5,
						bubble_poly : 10.0,
						bubble_collider_size : 10.0,
						bubble_render_size : 4.6,
						bubble_alpha : 0.15,
						collider_poly : 6.0,
						collider_size : 50
					}
				],
			},

			craonne : 
			{
				mapMaxHeight : 10,
				mapWidth : 500,
				mapHeight : 500,
				subdivisions : 255,
				bump_width_subdivisions : 200,
				bump_height_subdivisions : 200,
				y_margin: -2.1,

				images : {
					map_texture : "img/satmap.jpg",
					heightmap : "img/heightMap.jpg",
					skybox : "img/skybox/skybox",
					wood_normal : "img/normal_trunk.jpg",
					leave_normal : "img/normal_leaves.jpg"
				},

				villages : 
				[
					{
						name : "craonne",
						x : -120,
						z : -150,
						y_margin : 3.5,
						scale : 0.5,
						bubble_poly : 10.0,
						bubble_collider_size : 10.0,
						bubble_render_size : 4.6,
						bubble_alpha : 0.15,
						collider_poly : 6.0,
						collider_size : 50
					}
				],

				ArbresPos :	
				[
					[48.667 , -125 , 13.667 , 14.669], 
					[25.667 , -50 , 13.667 , 14.669], 
					[0 , -115 , 13.667 , 14.669], 
					[-30 , -55 , 13.667 , 14.669], 
					[-60 , -135 , 13.667 , 14.669], 
					[75 , -110 , 13.667 , 18], 
					[60 , -50 , 13.667 , 14.669], 
					[125 , -120 , 13.667 , 14], 
					[100 , -60 , 13.667 , 14], 
					[160 , -115 , 18 , 14], 
					[150 , -50 , 18 , 14], 
					[50 , -3 , 20 , 15], 
					[-42 , 65 , 16 , 18], 
					[-39 , 85 , 16 , 15], 
					[-38 , 122 , 12 , 13], 
					[-60 , 179 , 19 , 15], 
					[-80 , 51 , 33 , 40], 
					[67 , 170 , 35 , 45], 
				],
			},
		},

		skybox : {
			size : 2000.0,

			images : {
				map_texture : "img/satmap.jpg",
				heightmap : "img/heightMap.jpg",
				skybox : "img/skybox/skybox",
				wood_normal : "img/normal_trunk.jpg",
				leave_normal : "img/normal_leaves.jpg"
			},
		},

		moveToMouseUpSensitivity : 0.04,
		fogDensity : 0.001,

		player : {
			speed : 1.4,
			y_margin: -1.5,
			origin_x : 0,
			origin_z : 150
		},
		babylon_light : {
			name : "Omni",
			x : 0,
			y : 100,
			z : 100
		},
		babylon_camera : {
			name : "Camera",
			alpha : 44.5,
			beta : 1.0,
			radius : 300,
			beta_min : 0.1,
			beta_max : (Math.PI / 2) * 0.75,
			zoom_min : 50,
			zoom_max : 500,
			x : 0,
			y : 11,
			z : 0
		},

		oldTimestamp : Date.now(),
		canvas : document.getElementById("renderCanvas"),
		playerCanCollide : true,
		bReady : false,
		inputs : {
			bPause : false,
			X_axis : 0,
			Y_axis : 0
		},
		popUp : false,
		popUpCraonne : false,
		videosShown : false,
		numberMapDataLoaded : 0,
		numberMapDataToLoad : 2,
		cpt : 0,
		coolDown : 0,
		pas : []
	};
	
	return config;
}