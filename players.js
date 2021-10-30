import {createElement} from "./utils.js";

export class Player {
    constructor(props) {
        this.player = props.player;
        this.name =  props.name;
        this.hp = props.hp;
        this.img = props.img;
    }

     changeHP =  (numberHP) => {
        this.hp -= numberHP;

        if (this.hp <= 0) {
            this.hp = 0;
        }
    }

     elHP = () => document.querySelector(`.player${this.player} .life`);

     renderHP = () => {this.elHP().style.width = this.hp + '%';}
}

//Создание игрока
export const createPlayer = ({player, hp, name, img}) => {

    const $player = createElement('div', `player${player}`);
    const $progressbar = createElement('div', 'progressbar')
    const $life = createElement('div','life' )
    const $name = createElement('div', 'name')
    const $character = createElement('div', 'character')
    const $img = createElement('img')

    $life.style.width = hp + "%"
    $name.innerText = name
    $img.src= img

    $character.appendChild($img)
    $player.appendChild($progressbar)
    $player.appendChild($character)
    $progressbar.appendChild($life)
    $progressbar.appendChild($name)
    return $player
}


