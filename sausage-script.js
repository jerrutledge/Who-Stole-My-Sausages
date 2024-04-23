// As a boolean; always start stowed
Config.ui.stowBarInitially = true;

var foreground = document.createElement("div");
foreground.id = "foreground";
document.body.appendChild(foreground);

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
    label.innerHTML = "Enable profanity?";
    content.appendChild(label);

    Dialog.append(content);
    Dialog.open();

    return false;
}