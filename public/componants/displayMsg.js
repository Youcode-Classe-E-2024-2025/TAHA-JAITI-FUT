import { display } from "./displayHandler.js";

const msgContainer = document.getElementById('msgContainer');
const msgText = msgContainer.querySelector('#msgDisplay');
const closeMsg = msgContainer.querySelector('#closeMsg');
const proceedBtn = msgContainer.querySelector('#proceedMsg');

//dynamic msg display using callback
export const displayMsg = (msg, color, confirm = null, callback) => {
    display('open',msgContainer.parentElement); //displaying the msg
    msgText.textContent = msg;
    msgText.classList = `text-center text-${color}-400`; //color depending on the color sent

    if (confirm) { //if there is a confirm we show the confirm button
        proceedBtn.classList.remove('hidden');
        proceedBtn.onclick = (e) => {
            e.stopPropagation();
            msgContainer.parentElement.classList.add('hidden');//closing the container
            callback('confirmed');//returning the callback
        };
    } else {
        proceedBtn.classList.add('hidden'); //if there is no confirm we dont show confrim btn
    }

    closeMsg.onclick = (e) => { //here its for the close btn
        e.stopPropagation();
        display('close',msgContainer.parentElement);
    };
};