import anime from '../../node_modules/animejs/lib/anime.es.js';

export const display = (type, element, button = null, callback = null) => {
    if (button) {
        button.addEventListener('click', () => {
            if (type === 'open') {
                anime({
                    targets: element,
                    opacity: [0, 1],
                    duration: 200,
                    easing: 'easeOutQuad',
                    begin: () => element.classList.remove('hidden'),
                });
            } else if (type === 'close') {
                anime({
                    targets: element,
                    opacity: [1, 0],
                    duration: 200,
                    easing: 'easeInQuad',
                    complete: () => element.classList.add('hidden'),
                });
            }
            if (callback) callback();
        });
    } else {
        if (type === 'open') {
            anime({
                targets: element,
                opacity: [0, 1],
                duration: 200,
                easing: 'easeOutQuad',
                begin: () => element.classList.remove('hidden'),
            });
        } else if (type === 'close') {
            anime({
                targets: element,
                opacity: [1, 0],
                duration: 200,
                easing: 'easeInQuad',
                complete: () => element.classList.add('hidden'),
            });
        }
    }
};
