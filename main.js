'use strict'
const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: "Scorpion",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["minigun", "knife"],
    attack: function (name) {
        console.log(name + "Fight...")
    },
    isWiner: true
}

const player2 = {
    player: 2,
    name: "Kitana",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
    weapon: ["plasmagun", "fist"],
    attack: function (name) {
        console.log(name + "Fight...")
    },
    isWiner: true
}

function getRandomNuber() {
    return Math.floor(Math.random() * 20)
}

function changeHP(player) {
    const $playerLife = document.querySelector('.player'+ player.player +' .life');
    const rundomNumber = getRandomNuber();

    // if (player1.hp <= 0 || player2.hp <= 0) {
    //     $randomButton.disabled = true;
    //     $arenas.appendChild(playerWin(player.name))
    // } else {
    //     player.hp -= rundomNumber;
    //     $playerLife.style.width = player.hp + "%";
    // }

    if (player1.hp <= 0) {
        $randomButton.disabled = true;
        $arenas.appendChild(playerWin(player2.name))
    } else if (player2.hp <= 0) {
        $randomButton.disabled = true;
        $arenas.appendChild(playerWin(player1.name))
    } else {
        player.hp -= rundomNumber;
        $playerLife.style.width = player.hp + "%";
    }

}

function playerWin(name) {
    const $winTitle = createElement('div', 'winTitle');
    $winTitle.innerText = name + ' win';

    return $winTitle;
}

function createElement (tag, className) {
   const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }


    return $tag;

}

const createPlayer = (playerobj) => {

    const $player = createElement('div', 'player'+playerobj.player);
    const $progressbar = createElement('div', 'progressbar')
    const $life = createElement('div','life' )
    const $name = createElement('div', 'name')
    const $character = createElement('div', 'character')
    const $img = createElement('img')

    $life.style.width = playerobj.hp + "%"
    $name.innerText = playerobj.name
    $img.src= playerobj.img

    $character.appendChild($img)
    $player.appendChild($progressbar)
    $player.appendChild($character)
    $progressbar.appendChild($life)
    $progressbar.appendChild($name)
    return $player
}

$randomButton.addEventListener('click', function () {
    changeHP(player2);
    changeHP(player1);
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));