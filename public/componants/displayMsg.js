const msgContainer = document.getElementById('msgContainer');
const msgText = msgContainer.querySelector('#msgDisplay');
const closeMsg = msgContainer.querySelector('#closeMsg');
const proceedBtn = msgContainer.querySelector('#proceedMsg');

//dynamic msg display using callback
export const displayMsg = (msg, color, confirm, callback) => {
    msgContainer.parentElement.classList.remove('hidden');
    msgText.textContent = msg;
    msgText.classList = `text-center text-${color}-400`;

    if (confirm) {
        proceedBtn.classList.remove('hidden');
        proceedBtn.onclick = (e) => {
            e.stopPropagation();
            msgContainer.parentElement.classList.add('hidden');
            callback('confirmed');
        };
    } else {
        proceedBtn.classList.add('hidden');
    }

    closeMsg.onclick = (e) => {
        e.stopPropagation();
        msgContainer.parentElement.classList.add('hidden');
    };
};