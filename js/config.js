/*INPUT : NONE
OUTPUT : variable fourre tout : config
FONCTION : permet d'avoir toutes les variables de config
AUTHOR : LUCIEN, MAX */

function getConfig ()
{
	var big_village = "create_mesh_39";
	var small_village = "create_mesh_30";

	var config =
	{
		villages : [],
		arbres: [],
		images :
		{
			icones : "img/misc/icon.png",
			quit_cross : "img/misc/quit_cross.png",
			simple_texture : "img/misc/textureSimple.jpg",
			wood_normal : "img/misc/normal_trunk.jpg",
			leave_normal : "img/misc/normal_leaves.jpg"
		},
		scenes : 
		{
			globalMap : 
			{
				mapMaxHeight : 3,
				mapWidth : 50,
				mapHeight : 50,
				subdivisions : 20,
				bump_width_subdivisions : 50,
				bump_height_subdivisions : 50,
				y_margin: 0,
				fogDensity : 0,
				images : {
					map_texture : "scenes/global/img/map.jpg",
					heightmap : "scenes/global/img/heightmap.jpg",
					bumpmap : "img/misc/normal_leaves.jpg"
				},
				villages : 
				[
					{
						name : "craonne",
						x : 2,
						z : 3,
						y_margin : 0.4,
						scale : 0.05,
						collider_poly : 6.0,
						collider_size : 50,
						mesh_kind : small_village

					},

					{
						name : "Pozières",
						x : -1,
						z : 6,
						y_margin : 0.4,
						scale : 0.05,
						collider_poly : 6.0,
						collider_size : 50,
						mesh_kind : small_village

					},

					{
						name : "Vauquois",
						x : 7,
						z : 1,
						y_margin : 0,
						scale : 0.05,
						collider_poly : 6.0,
						collider_size : 50,
						mesh_kind : small_village

					},
					
					{
						name : "Verdun",
						x : 10,
						z : -1,
						y_margin : 0,
						scale : 0.05,
						collider_poly : 6.0,
						collider_size : 50,
						mesh_kind : small_village

					},

					{
						name : "Eparges",
						x : 11,
						z : -3,
						y_margin : 0.6,
						scale : 0.05,
						collider_poly : 6.0,
						collider_size : 50,
						mesh_kind : small_village

					},

				]
			},
			craonne :
			{
				mapMaxHeight : 3,
				mapWidth : 50,
				mapHeight : 50,
				subdivisions : 20,
				bump_width_subdivisions : 50,
				bump_height_subdivisions : 50,
				y_margin: 0,
				fogDensity : 0.001,
				images : {
					map_texture : "scenes/craonne/img/map.jpg",
					heightmap : "scenes/craonne/img/heightmap.jpg",
					bumpmap : "img/misc/normal_leaves.jpg"
				},
				popUps : {
					title : "craonne",
					description : "village situé en picardie, lieu d'une bataille qui le détruisit complètement en 1914.", 
					datas : ["8.9", "km²", "76", "habitants"],
					discussion : [
						["Question 1", "Réponse 1"],
						["Question 2", "Réponse 2"],
						["Question 3", "Réponse 3"],
						["Question 4", "Réponse 4"]
					],
					veilleur : ["Noël Genteur", "maire"],
					baseline : "Craonne a vécu de grandes choses durant la première guerre mondiale, que veux-tu savoir ?",
					images : {
						background : "scenes/craonne/img/background.png",
						veilleur : "scenes/craonne/img/veilleur.png"
					},
					videos : {
						arrivee : "scenes/craonne/videos/1.OGG",
						//chanson : ""
					}
				},
				villages : 
				[
					{
						name : "globalMap", // ------------------------------- CHANGED
						x : -12,
						z : -15,
						y_margin : 0.4,
						scale : 0.05,
						collider_poly : 6.0,
						collider_size : 50,
						mesh_kind : big_village
					}
				],
				ArbresPos :	
				[
					[-8 , -16, 5 , 9], 
					[-3 , -20, 3 , 6], 
					[-1 , -12, 7 , 8], 
					[8 , -9, 6 , 4], 
					[-9 , 4.5 , 7 , 4.5], 
					[-23 , 13 , 5 , 7], 
					[-17 , 17 , 2 , 4], 
					[5 , 16 , 4 , 5], 
				],
			},

			machin:
			{
				mapMaxHeight : 3,
				mapWidth : 50,
				mapHeight : 50,
				subdivisions : 20,
				bump_width_subdivisions : 50,
				bump_height_subdivisions : 50,
				y_margin: 0,
				fogDensity : 0,
				images : {
					map_texture : "scenes/global/img/map.jpg",
					heightmap : "scenes/global/img/heightmap.jpg",
					bumpmap : "img/misc/normal_leaves.jpg"
				},
				villages : 
				[
					{
						name : "craonne",
						x : 2,
						z : 3,
						y_margin : 0.4,
						scale : 0.05,
						collider_poly : 6.0,
						collider_size : 50,
						mesh_kind : small_village

					},

					{
						name : "Pozières",
						x : -1,
						z : 6,
						y_margin : 0.4,
						scale : 0.05,
						collider_poly : 6.0,
						collider_size : 50,
						mesh_kind : small_village

					},

					{
						name : "Vauquois",
						x : 7,
						z : 1,
						y_margin : 0,
						scale : 0.05,
						collider_poly : 6.0,
						collider_size : 50,
						mesh_kind : small_village

					},
					

				],
			},
		},
		skybox : {
			size : 750.0,
			images : "img/skybox/skybox"
		},
		player : {
			speed : 0.1,
			y_margin: 0,
			origin_x : 0,
			origin_z : 0
		},
		babylon_light : {
			name : "Omni",
			x : 0,
			y : 100,
			z : 100
		},
		babylon_camera : {
			name : "Camera",
			alpha : 199.5,
			beta : 0.5,
			radius : 50,
			beta_min : 0.1,
			beta_max : (Math.PI / 2) * 0.75,
			zoom_min : 10,
			zoom_max : 50,
			x : 0,
			y : 11,
			z : 0
		},
		isGlobalMap : false, // ------------------------------------------------------------------------- NEW
		mapActuelle : "globalMap",
		mapSuivante : "globalMap",  // -------------------------------------------------------------------------------------- ???
		moveToMouseUpSensitivity : 0.04,

		oldTimestamp : Date.now(),
		canvas : document.getElementById("renderCanvas"),
		playerCanCollide : true,
		bReady : false,
		ready2ChangeScene : false, 
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
		pas : [],

		toufu :
		{
			rgbTronc : [148, 130, 101, 126, 107, 78, 99, 87, 68, 54, 47, 37],
			rgbFeuiles :
			[
				[123, 157, 80,102, 136, 60,72, 97, 41,49, 66, 28],
				[143, 157, 80,137, 151, 74,109, 120, 57,82, 90, 42],
				[89, 149, 106,81, 130, 95,53, 101, 67,34, 74, 46]

			]
		},

		sapin :
		{
			rgbTronc : [148, 130, 101,126, 107, 78, 99, 87, 68, 54, 47, 37],
			rgbFeuiles :
			[
				[123, 157, 80,102, 136, 60,72, 97, 41,49, 66, 28],
				[143, 157, 80,137, 151, 74,109, 120, 57,82, 90, 42],
				[89, 149, 106,81, 130, 95,53, 101, 67,34, 74, 46]
			]
		},
	};
	return config;
}
