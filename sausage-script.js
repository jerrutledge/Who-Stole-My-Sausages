// As a boolean; always start stowed
Config.ui.stowBarInitially = true;

var foreground = document.createElement("div");
foreground.id = "foreground";
document.body.appendChild(foreground);

Setting.addRange("masterVolume", {
	label    : "Volume",
	min      : 0,
	max      : 10,
	step     : 1,
	onChange : function () {
		SimpleAudio.volume(settings.masterVolume / 10);
	}
}); // default value not defined, so max value (10) is used

var rooster = new Audio('audio/rooster.wav');
var arturo_theme = new Audio('audio/Arturo Theme 3.mp3');
arturo_theme.loop = true;
var quinten_theme = new Audio('audio/Quinten Theme 1.mp3');
quinten_theme.loop = true;
var kitchen_theme = new Audio('audio/Kitchen Theme.mp3');
kitchen_theme.loop = true;
var sati_theme = new Audio('audio/Sati Theme 2.mp3');
sati_theme.loop = true;
var lose_theme = new Audio('audio/You Lose!.mp3');
var win_theme = new Audio('audio/You Win!.mp3');

var current_theme = '';

$(document).on(':passagerender', function(ev){
	
	var tags = document.body.getAttribute("data-tags");
	var tags_split = tags.split(" ");
	console.log("Tags:"+tags_split);
	
	
	if (tags_split[0] == "bg-kitchen"){
		console.log("in kitchen");
		if (!(current_theme == kitchen_theme)){
			if (current_theme != ''){
				current_theme.pause();
				current_theme.currentTime = 0;
			}
			console.log("Playing kitchen theme");
			kitchen_theme.play();
			current_theme = kitchen_theme;
		}
	}
	else if (tags_split[0] == "bg-arturo-room"){
		if (!(current_theme == arturo_theme)){
			if (current_theme != ''){
				current_theme.pause();
				current_theme.currentTime = 0;
			}
			arturo_theme.play();
			current_theme = arturo_theme;
		}
	}
	else if (tags_split[0] == "bg-sati-room"){
		if (!(current_theme == sati_theme)){
			if (current_theme != ''){
				current_theme.pause();
				current_theme.currentTime = 0;
			}
			sati_theme.play();
			current_theme = sati_theme;
		}
	}
	else if (tags_split[0] == "bg-quentin-room"){
		if (!(current_theme == quinten_theme)){
			if (current_theme != ''){
				current_theme.pause();
				current_theme.currentTime = 0;
			}
			quinten_theme.play();
			current_theme = quinten_theme;
		}
	}
	else if (tags_split[0] == "bg-beefed"){
		if (!(current_theme == quinten_theme)){
			if (current_theme != ''){
				current_theme.pause();
				current_theme.currentTime = 0;
			}
			lose_theme.play();
			current_theme = lose_theme;
		}
	}
	else if (tags_split[0] == "bg-congrats"){
		if (!(current_theme == quinten_theme)){
			if (current_theme != ''){
				current_theme.pause();
				current_theme.currentTime = 0;
			}
			win_theme.play();
			current_theme = win_theme;
		}
	}
	else if (tags_split[0] == "bg-title"){
		if (current_theme != ''){
			current_theme.pause();
			current_theme.currentTime = 0;
		}
	} 


	
});



function preloader() {
    console.log("preloader activated...");
	if (document.images) {
        var imglist = []; // image list is replaced in python script
        for (let i = 0; i < imglist.length; i++) {
            const img = new Image();
            img.src = imglist[i];
            console.log("preloaded "+imglist[i]);
        }
	}
    console.log("preloader finished.");
}
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}
addLoadEvent(preloader);

// Add setting for profanity
var settingProfanityToggle = function () {
    var setProfanity = settings.profanity;
    State.setVar('$profanity', setProfanity);
};
Setting.addToggle("profanity", {
	label    : "Profanity",
	default  : true,
	onChange : settingProfanityToggle
});