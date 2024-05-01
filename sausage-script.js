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

$(document).on(':passagerender', function(ev){
	
	rooster.play();
	
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