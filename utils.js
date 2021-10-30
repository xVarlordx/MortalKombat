export const $formFight = document.querySelector('.control');
export const $arenas = document.querySelector('.arenas');
export const date = new Date();

export const getRandomNumber = (num) => Math.floor(Math.random() * num);

export function createElement (tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

export const showTime = () => date.toLocaleString('en-US', { hour: 'numeric', hour12: false, minute: 'numeric' });


