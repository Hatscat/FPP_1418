// city fait référence aux données PopUp JSON de la ville actuelle
// config.scenes[config.mapActuelle].popUps
function displayPopUp (type, city)//type "globalmap"
{
	initPopUp(type, city)

	if(type == "preview")
		$("#step_preview").fadeIn(400, function(){
			smallPopUp = true;
			
		});

	else
	{
		grosPopUp = true;
		$("#pop_up").fadeIn(400, function(){
			bPause = true;
			
		});
		
	}


}

function hidePopUp()
{
	popUpLauch = false;
	// On cache les boutons qui ne pourraient potentiellement pas être dans la prochaine pop-up + la pop-up
	$("#go_button").fadeOut();
	$("#link").fadeOut()
	$("#pop_up").fadeOut(400, function(){
		bPause = false;
			
	});

	$("#step_preview").fadeOut(400, function(){
		smallPopUp = false;
			
	});
}

$("#quit_button").click(function()
{
	hidePopUp()
	mouse.target_onClick_3D = null;
	grosPopUp = false;
})

$("#quit_button2").click(function()
{
	$("#videos").fadeOut();
	$("#pop_up").fadeIn();
})

$("#go_button").click(function()
{
	yAller = true;
	grosPopUp = false;
	mouse.target_onClick_3D = null;
	hidePopUp()
})

// Input : config (json)
// Initialise la pop-Up en position et contenu
// @author : Jules D.
function initPopUp (type, city) // doit initialiser TOUTES les popups ! (pas juste Craonne)
{
	if (!city) return;

	if(type == "preview")
	{
		$("#step_preview h1").text(city.title);
		$('#step_preview').css({
		    top: mouse.y,
		    left: mouse.x 
		});
	}

	else 
	{
		centerPopUp();
		// Contenu de la div #leftPart
		// Nom de la ville
		// Contenu de la div #rightPart
		// Base line de la ville
		$("#discussion").empty();
		$("#introduction").text(city.baseline);
		// Question réponses de la ville

		// Contenu de la div #linkToVideo
		// Affichage du bouton adéquat si y'a une video
		// Images de la popUp
		$("#pop_content").css("background-image", "url(scenes/"+ city.title + "/img/background.png)");
		$("#leftPart").hide();
		$("#veilleur_photo").css("background-image", "url(scenes/"+ city.title + "/img/persona.jpg)");
		$("#go_button").hide();
		$("#link").hide()

		if(type == "village")
		{
			window.city = city;
			for(var i = city.discussion.length; i--;)
			{
				$("#discussion").append("<div class='question' onclick='reponseToggle(" + i + ")'>" + city.discussion[i][0] + "<div state='inactive' id='reponse_" + i + "'class='reponse'>" + city.discussion[i][1] + "</div>")
			}

			for(var v in city.videos)
			{
				$("#discussion").append("<div class='question' onclick=showVideo('" + v + "')>" + v + "</div>")

			}

			$("#ville").text(city.title);
			// Nom du veilleur
			$("#veilleur_photo").css("background-image", "url(scenes/"+ city.title + "/img/veilleur.png)");

			$("#veilleur").text(city.veilleur[0]);
			// Statut du veilleur (maire par exemple)
			$("#statut").text(city.veilleur[1]);
			$("#link").show()


			$("#leftPart").show();
		}
		
		if(type == "tuto")
		{
			$("#leftPart").show();
			$("#rightPart").show();

			for(var i = city.discussion.length; i--;)
			{
				$("#discussion").append("<div class='question' onclick='reponseToggle(" + i + ")'>" + city.discussion[i][0] + "<div state='inactive' id='reponse_" + i + "'class='reponse'>" + city.discussion[i][1] + "</div>")
			}

			$("#discussion").show();


		}

		if(type == "previewVillage")
		{
			$("#go_button").show();
			$("#leftPart").show();
			$("#link").show()
			$("#veilleur").text(city.veilleur[0]);
			$("#ville").text(city.title);
			
			$("#veilleur_photo").css("background-image", "url(scenes/"+ city.title + "/img/veilleur.png)");

			for(var i = city.discussion.length; i--;)
			{
				$("#discussion").append("<div class='question' onclick='reponseToggle(" + i + ")'>" + city.discussion[i][0] + "<div state='inactive' id='reponse_" + i + "'class='reponse'>" + city.discussion[i][1] + "</div>")
			}
			$("#rightPart").show();

		}


	}
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
	var reponse = document.getElementById("reponse_" + index)

	if(reponse.active == "active")
	{
		$("#reponse_" + index).slideDown().attr('active', 'inactive');
	}
	// On instancie toutes les réponses inactives
	$(".reponse").slideUp().attr('active', 'inactive')
	// On instancie la réponse sélectionnée comme active
	$("#reponse_" + index).slideDown().attr('active', 'active');
}

function showVideo(index)
{
	if( document.getElementById("reponse_" + index) != null)
	{
		$("#pop_up").hide()
		$("#videos").show();
	}

	else
	{
		$("#pop_up").hide()
		$("#videos").append($("#quit_button2"))
		$("#videos").append("<video controls='controls' src='"+ window.city.videos[index] + "' id='reponse_" + index + "' width='2000' height='900' ></video>")
		$("#videos").show();

	}

}