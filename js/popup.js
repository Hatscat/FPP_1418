function displayPopUp(config)
{
	if(!!config.popUpCraonne)
	{

		$("#veilleur1").addClass("veilleurActive")
		$("#craonneGame").slideDown(); // document.getElementById ?

		$("#btnPart1").click(function()
		{
			$("#videos").fadeIn(function(){$("#video1").fadeIn()});
			config.videosShown = true;
		});
		$("#btnPart2").click(function()
		{
			$("#videos").fadeIn(function(){$("#video2").fadeIn()});
			config.videosShown = true;
		});
		$("#btnPart3").click(function()
		{
			$("#videos").fadeIn(function(){$("#video3").fadeIn()});
			config.videosShown = true;
		});
		$("#btnPart4").click(function()
		{
			$("#videos").fadeIn(function(){$("#video4").fadeIn()});
			config.videosShown = true;
		});

		if(config.videosShown)
		{
			$("#closeVideo").click(function()
			{
				config.videosShown = false;
			});
		}
		if(!config.videosShown)
		{
			$("#videos").fadeOut()
		}
	}
	else if(!!config.popUp)
	{
		$("#craonnePop").slideDown();



		$(".btnVisite").click(function()
		{
			$(".popup").slideUp()
			config.inputs.bPause = false;
			config.scene.cameras[0].attachControl(config.canvas); 
		})
	}
	

	if(!config.popUp && !config.popUpCraonne)
	{
		$(".popup").slideUp(function(event){
			mouse.target_3D = null;
			config.inputs.bPause = false;
		});
	}


	if(config.popUp || config.popUpCraonne)
	{
		config.inputs.bPause = true;
		config.scene.cameras[0].detachControl(config.canvas);

		$(".close_button").click(function(){
			config.popUp = false;
			config.popUpCraonne = false;
			config.scene.cameras[0].attachControl(config.canvas);
			mouse.target_3D = null;
		})
		document.getElementById("renderCanvas").click(function()
		{
			config.popUp = false; 
			config.scene.cameras[0].attachControl(config.canvas); 
		})
	}
}


function initPopUp(config)
{
	$(".popup").hide()
}