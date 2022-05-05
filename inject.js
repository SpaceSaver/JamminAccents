const postit_editor = document.getElementById("jam-postit-editor");
const postit_bar = document.createElement("div");
postit_bar.classList.add("jam-postit-editor-header");
const acc_bar = document.createElement("div");
acc_bar.style.width = "100%";
acc_bar.style.textAlign = "center";
acc_bar.style.fontSize = "20pt";
const accents = "çéâêîôûàèìòùëïü";
for (let x = 0; x < accents.length; x++) {
    const character = accents.substring(x, x+1);
    const button = document.createElement("button");
    button.classList.add("accent-button");
    button.textContent = character;
    button.setAttribute("character", character);
    button.style.marginLeft = "1pt";
    button.style.marginRight = "1pt";
    button.style.marginBottom = "10px";
    button.style.marginTop = "10px";
    acc_bar.appendChild(button);
}
postit_bar.appendChild(acc_bar);
postit_editor.insertBefore(postit_bar, document.getElementsByClassName("jam-postit-editor-buttons")[0]);
function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = endPos + myValue.length;
    } else {
        myField.value += myValue;
    }
}
const buttons = document.getElementsByClassName("accent-button");
// const textArea = document.getElementsByClassName("jam-postit-editor-input")[0];
for (let x = 0; x < buttons.length; x++) {
    buttons[x].addEventListener("click", ev => {
        const textArea = document.getElementsByClassName("jam-postit-editor-input")[0];
        insertAtCursor(textArea, buttons[x].getAttribute("character"));
        textArea.focus();
    });
    document.body.addEventListener("keydown", e => {
        if (e.code.startsWith("Shift")) {
            buttons[x].textContent = buttons[x].textContent.toUpperCase();
            buttons[x].setAttribute("character", buttons[x].getAttribute("character").toUpperCase());
        }
    });
    document.body.addEventListener("keyup", e => {
        if (e.code.startsWith("Shift")) {
            buttons[x].textContent = buttons[x].textContent.toLowerCase();
            buttons[x].setAttribute("character", buttons[x].getAttribute("character").toLowerCase());
        }
    });
}
/*
<div class="jam-postit-editor-header"><p style="text-align: center;width: 100%;font-size: 20pt;margin: 0;letter-spacing: 2pt;">çéâêîôûàèìòùëïü</p></div>
*/