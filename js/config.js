/*INPUT : NONE
OUTPUT : variable fourre tout : config
FONCTION : permet d'avoir toutes les variables de config
AUTHOR : LUCIEN, MAX */

bPause = false;
grosPopUp = false;

function getConfig ()
{
	var big_village = "create_mesh_39";
	var small_village = "create_mesh_30";

	var config =
	{
		villages : [],
		firstlocal: true,
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
				isFisrtTime: true,
				mapMaxHeight : 3,
				mapWidth : 50,
				mapHeight : 50,
				subdivisions : 50,
				bump_width_subdivisions : 50,
				bump_height_subdivisions : 50,
				y_margin: 0,
				fogDensity : 0,
				images : {
					map_texture : "scenes/global/img/map.jpg",
					heightmap : "scenes/global/img/heightmap.jpg",
					bumpmap : "img/misc/normal_leaves.jpg"
				},
				
				popUps : 
				{
					tuto:
					{
						title : "craonne",
						description : "village situé en picardie, lieu d'une bataille qui le détruisit complètement en 1914.", 
						datas : ["8.9", "km²", "76", "habitants"],
						discussion : [
							["Déplacement", "Cliquez sur la carte pour vous déplacer, maintenez enfonçé pour déplacer la caméra"],
							["Interaction", "Double cliquez sur un village pour vous y rendre"],
							["But", "Trouvez les 5 veilleurs de mémoire pour en apprendre plus sur la première guerre mondiale"],
						],
						baseline : "Controles",
						images : {
							background : "scenes/craonne/img/background.png",
						},
						videos : {
							arrivee : "scenes/craonne/videos/1.OGG",
							//chanson : ""
						}
						
					},

					craonne:
					{
						title : "craonne",
						
					},

					Pozieres:
					{
						title : "Pozieres",
						
					},

					Vauquois:
					{
						title : "Vauquois",
						
					},

					Verdun:
					{
						title : "Verdun",
						
					},

					Eparges:
					{
						title : "Eparges",
						
					},
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
						name : "Pozieres",
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
						y_margin : 0.8,
						scale : 0.05,
						collider_poly : 6.0,
						collider_size : 50,
						mesh_kind : small_village

					},

				]
			},
			craonne :
			{

				isFisrtTime: true,
				mapMaxHeight : 2,
				mapWidth : 50, // /!\ too low!
				mapHeight : 50, // /!\ too low!
				subdivisions : 50,
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
						name : "craonne",
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
			Pozieres :
			{
				isFisrtTime: true,
				mapMaxHeight : 3,
				mapWidth : 50,
				mapHeight : 50,
				subdivisions : 50,
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
					description : "village dans ton cul, magnifique et fier habitants qui quand ils ne se vide pas de leurs entrailles déjeunent au feu de bois", 
					datas : ["8.9", "km²", "76", "habitants"],
					discussion : [
						["Question 1", "Réponse 1"],
						["Question 2", "Réponse 2"],
						["Question 3", "Réponse 3"],
						["Question 4", "Réponse 4"]
					],
					veilleur : ["machin", "machine"],
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
						name : "globalMap",
						x : 11,
						z : 14,
						y_margin : 1.3,
						scale : 0.05,
						collider_poly : 6.0,
						collider_size : 50,
						mesh_kind : big_village
					}
				],
				ArbresPos :	
				[
					[-15 , -10, 5 , 9], 
					[-4 , -15, 3 , 6], 
					[-7 , -16, 7 , 8], 
					[9 , -7, 6 , 4], 
					[-9 , 8 , 7 , 4.5], 
					[-20 , 13 , 5 , 7], 
					[-17 , 20 , 2 , 4], 
					[4 , 16 , 4 , 5], 
				],
			},

			Vauquois :
			{
				isFisrtTime: true,
				mapMaxHeight : 3,
				mapWidth : 50,
				mapHeight : 50,
				subdivisions : 50,
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
						name : "globalMap",
						x : 5,
						z : 5,
						y_margin : 0.8,
						scale : 0.05,
						collider_poly : 6.0,
						collider_size : 50,
						mesh_kind : big_village
					}
				],
				ArbresPos :	
				[
					[-4 , -16, 5 , 9], 
					[-3 , -15, 3 , 6], 
					[-1 , -12, 7 , 8], 
					[3 , -9, 6 , 4], 
					[-9 , 4.5 , 7 , 4.5], 
					[-23 , 6 , 5 , 7], 
					[-15 , 17 , 2 , 4], 
					[5 , 13 , 4 , 5], 
				],
			},

			Verdun :
			{
				isFisrtTime: true,
				mapMaxHeight : 3,
				mapWidth : 50,
				mapHeight : 50,
				subdivisions : 50,
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
						name : "globalMap",
						x : 5,
						z : -14,
						y_margin : 0.6,
						scale : 0.05,
						collider_poly : 6.0,
						collider_size : 50,
						mesh_kind : big_village
					}
				],
				ArbresPos :	
				[
					[-8 , -10, 5 , 9], 
					[-15 , -20, 3 , 6], 
					[-1 , -12, 7 , 8], 
					[10 , -9, 6 , 4], 
					[-9 , 4.5 , 7 , 4.5], 
					[-23 , 8 , 5 , 7], 
					[-17 , 14 , 2 , 4], 
					[5 , 16 , 4 , 5], 
				],
			},

			Eparges :
			{
				isFisrtTime: true,
				mapMaxHeight : 3,
				mapWidth : 50,
				mapHeight : 50,
				subdivisions : 50,
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
						name : "globalMap",
						x : 0,
						z : 0,
						y_margin : 0.5,
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
		},
		skybox : {
			size : 750.0,
			images : "img/skybox/skybox"
		},
		player : {
			speed : 0.1,
			y_margin: -0.25,
			size : 0.5,
			collider_size : 5,
			origin_x : 0,
			origin_z : 0
		},
		babylon_light : {
			name : "Omni",
			x : 0,
			y : 100,
			z : 0,
			angle: 0,
			maxRed: 230/255,
			maxGreen: 60/255,
			maxBlue: 20/255,
		},

		babylon_lightNight : {
			name : "Omni",
			x : 0,
			y : -100,
			angle: 4*(Math.PI/6),
		},
		
		babylon_camera : {
			name : "Camera",
			alpha : 199.5,
			beta : 0.5,
			radius : 50,
			beta_min : 0.1,
			beta_max : (Math.PI / 2) * 0.75,
			current_zoom_min : 10,
			current_zoom_max : 50,
			_fixed_zoom_min : 10,
			_fixed_zoom_max : 50,
			x : 0,
			y : 11,
			z : 0
		},

		meshes_white_list: [],
		tempoRotation: 10,
		timeRotation: 6000,
		taille: 0.5,
		wayOfTheSun: 1,
		updateTime: 0,
		isGlobalMap : false,
		mapActuelle : "globalMap",
		mapSuivante : "globalMap", 
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
		numberMapDataToLoad : 6,
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
