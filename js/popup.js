function displayPopUp (config)
{
	$("#go_button").fadeIn();
	$("#pop_up").fadeIn();
	mouse.target_onClick_3D = null;
	config.inputs.bPause = true;
	config.camera.detachControl(config.canvas);
}

function hidePopUp(config)
{
	$("#go_button").fadeOut();
	$("#pop_up").fadeOut();
	config.inputs.bPause = false;
	config.camera.attachControl(config.canvas);
	mouse.target_onClick_3D = null;
}

// Input : config (json)
// Initialise la pop-Up en position et contenu
// @author : Jules D.
function initPopUp (config) // doit initialiser TOUTES les popups ! (pas juste Craonne)
{
	//$(".popup").hide()
	centerPopUp();
	var actualPopUp = config.scenes[config.mapActuelle].popUps || 0;
	if (!actualPopUp) return;
	$("#pop_content h1").text(actualPopUp.title);
	$("#pop_content p").text(actualPopUp.description);
	$("#pop_content #datas_one .number").text(actualPopUp.datas[0]);
	$("#pop_content #datas_one .value").text(actualPopUp.datas[1]);
	$("#pop_content #datas_two .number").text(actualPopUp.datas[2]);
	$("#pop_content #datas_two .value").text(actualPopUp.datas[3]);
	$("#pop_content p").css("margin-top", - $("#pop_content p").innerHeight() + "px");
	
	$("#go_button").hide();
	$("#pop_up").hide();

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