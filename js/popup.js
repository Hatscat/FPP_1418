function displayPopUp (config)
{
	

}

// Input : config (json)
// Initialise la prePop-Up en position et contenu (lancé via un if(isGlobal))
// @author : Jules D.
function initPrePopUp (config, village)
{
	//$(".popup").hide()
	mouse.doubleClicks = false;
	centerPopUp();
	console.log(mouse.target_onClick_3D.targeted_mesh.name)
	var mapActuelle = config.scenes[mouse.target_onClick_3D.targeted_mesh.name] || 0;
	if(mapActuelle)
		mapActuellePopUp = mapActuelle.popUps

	else return;
	//$("#go_button").show()
	$("#pop_content h1").text(mapActuellePopUp.title);
	$("#pop_content p").text(mapActuellePopUp.description);
	$("#pop_content #datas_one .number").text(mapActuellePopUp.datas[0]);
	$("#pop_content #datas_one .value").text(mapActuellePopUp.datas[1]);
	$("#pop_content #datas_two .number").text(mapActuellePopUp.datas[2]);
	$("#pop_content #datas_two .value").text(mapActuellePopUp.datas[3]);
	$("#pop_content p").css("margin-top", - $("#pop_content p").innerHeight() + "px");
	
	$("#pop_up").fadeIn();


	$("#quit_button").click(function()
	{
		$('#pop_up').fadeOut()			
	})

	$("#go_button").click(function()
	{
		$("#pop_up").fadeOut();

		initPopUp(config);
		config.ready2ChangeScene = true;
		config.mapSuivante = village.mesh.name;
		config.player.mesh.position = village.mesh.position;
	})
}

// Input : config (json)
// Initialise la Pop-Up en position et contenu (lancé si non global)
// @author : Jules D.
function initPrePopUp (config, village)
function initPopUp (config)
{
	$("#go_button").css("display", "none")
	$("#discussion").html("")
	var actualPopUp = config.scenes[config.mapActuelle].popUps || 0;
	if (!actualPopUp) return;
	$("#ville").text(actualPopUp.title);
	$("#veilleur").text(actualPopUp.veilleur[0]);
	$("#statut").text(actualPopUp.veilleur[1]);
	$("#introduction").text(actualPopUp.baseline);
	if(actualPopUp.video)
	{
		$("#link").append("Voir la vidéo")
	}
	$("#veilleur_photo").css("background-image", "url(img/scenes/"+ actualPopUp.title + "/veilleur.png)");
	//$("#pop_content #people").text(actualPopUp.people + "habitants");
	$("#pop_content").css("background-image", "url(img/scenes/"+ actualPopUp.title + "/background.png)");
	for(var i = actualPopUp.discussion.length; i--;)
	{
		$("#discussion").append("<div class='question' onclick='reponseToggle(" + i + ")'>" + actualPopUp.discussion[i][0] + "<div id='reponse_" + i + "'class='reponse'>" + actualPopUp.discussion[i][1] + "</div>")

	}
	mouse.target_onClick_3D = null;
	//config.scene.activeCamera.attachControl(config.canvas); 
	config.inputs.bPause = false;
	//config.popUp = false;
}

// Input : none
// Centre la pop-up au milieu en x et au 1/4 en y
// @author : Jules D.
function centerPopUp()
{
	var popup = document.getElementById("pop_up");
	popup.style.left = (window.innerWidth - $("#pop_up").innerWidth()) / 2  + "px";

	if(window.innerHeight > 550)
		popup.style.top = (window.innerHeight -  $("#pop_up").innerHeight()) / 4  + "px";
	else
		popup.style.top = $("#interface").innerHeight() + "px";
}

// Inputs : Index de la question cliquée
// Remonte le volet de toutes les réponses et descendre celui de la question cliquée.
// @author : Youle
function reponseToggle (index)
{
	$(".reponse").slideUp();
	$("#reponse_" + index).slideDown();
}
