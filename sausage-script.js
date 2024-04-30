// As a boolean; always start stowed
Config.ui.stowBarInitially = true;

var foreground = document.createElement("div");
foreground.id = "foreground";
document.body.appendChild(foreground);

Setting.addHeader("Test Settings");


window.on_click_settings = function() {
    Dialog.setup();
    var content = document.createElement('div');

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'profanity_checkbox';
    checkbox.checked = State.getVar('$profanity');
    checkbox.addEventListener('change', (event) => {
        State.setVar('$profanity', event.currentTarget.checked);
    });
    content.appendChild(checkbox);

    var label = document.createElement('label');
    label.setAttribute('for', 'profanity_checkbox');
    label.innerHTML = "Profanity";
    content.appendChild(label);

    Dialog.append(content);
    Dialog.open();

    return false;
}


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
