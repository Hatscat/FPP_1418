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
				mapMaxHeight : 2,
				mapWidth : 50,
				mapHeight : 50,
				subdivisions : 20,
				bump_width_subdivisions : 20,
				bump_height_subdivisions : 20,
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
						x : -12,
						z : -15,
						y_margin : 3.5,
						scale : 0.25,
						bubble_poly : 10.0,
						bubble_collider_size : 10.0,
						bubble_render_size : 4.6,
						bubble_alpha : 0.15,
						collider_poly : 6.0,
						collider_size : 50,
						mesh_kind : big_village
					},
					{
						name : "test1",
						x : -10,
						z : -50,
						y_margin : 3.5,
						scale : 0.25,
						bubble_poly : 10.0,
						bubble_collider_size : 10.0,
						bubble_render_size : 4.6,
						bubble_alpha : 0.15,
						collider_poly : 6.0,
						collider_size : 50,
						mesh_kind : small_village
					},


					{
						name : "test2",
						x : 21,
						z : 15,
						y_margin : 3.5,
						scale : 0.25,
						bubble_poly : 10.0,
						bubble_collider_size : 10.0,
						bubble_render_size : 4.6,
						bubble_alpha : 0.15,
						collider_poly : 6.0,
						collider_size : 50,
						mesh_kind : small_village
					},
					{
						name : "test3",
						x : 10,
						z : 22,
						y_margin : 3.5,
						scale : 0.25,
						bubble_poly : 10.0,
						bubble_collider_size : 10.0,
						bubble_render_size : 4.6,
						bubble_alpha : 0.15,
						collider_poly : 6.0,
						collider_size : 50,
						mesh_kind : small_village
					},
				]
			},
			craonne :
			{
				mapMaxHeight : 10,
				mapWidth : 250,
				mapHeight : 250,
				subdivisions : 200,
				bump_width_subdivisions : 100,
				bump_height_subdivisions : 100,
				y_margin: -2.1,
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
						collider_size : 50,
						mesh_kind : big_village
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
			size : 750.0,
			images : "img/skybox/skybox"
		},
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
			radius : 250,
			beta_min : 0.1,
			beta_max : (Math.PI / 2) * 0.75,
			zoom_min : 50,
			zoom_max : 250,
			x : 0,
			y : 11,
			z : 0
		},
		veilleurColliderName : "veilleurC",
		mapActuelle : "globalMap",
		moveToMouseUpSensitivity : 0.04,
		

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
