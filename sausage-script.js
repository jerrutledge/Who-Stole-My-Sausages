// As a boolean; always start stowed
Config.ui.stowBarInitially = true;

var foreground = document.createElement("div");
foreground.id = "foreground";
document.body.appendChild(foreground);

function on_click_settings() {
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
    label.innerHTML = "Enable profanity?";
    content.appendChild(label);

    Dialog.append(content);
    Dialog.open();

    return false;
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

waitForElm('#settings_storymenu').then((elm) => {
    elm.onclick = on_click_settings;
});
