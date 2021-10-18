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
    elHP: elHP,
    changeHP: changeHP,
    renderHP: renderHP
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
    elHP: elHP,
    changeHP: changeHP,
    renderHP: renderHP
}

function getRandomNuber(num) {
    return Math.floor(Math.random() * num)
}

function changeHP (numberHP) {
    this.hp -= numberHP

    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function elHP () {
    return document.querySelector('.player'+ this.player +' .life');
}

function renderHP (player) {
    player.elHP().style.width = this.hp + '%'
}

function playerWin(name) {
    const $winTitle = createElement('div', 'winTitle');

    if (name) {
        $winTitle.innerText = name + ' win';
    } else {
        $winTitle.innerText = 'draw'
    }


    return $winTitle;
}

function createElement (tag, className) {
   const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag;

}

function createReloadButton () {
    const $control = document.querySelector('.control')
    const reloadBtn = createElement('div', 'reloadWrap');
    const btn = createElement('button', 'button');
    btn.innerText = 'Restart';
    reloadBtn.appendChild(btn);
    $control.appendChild(reloadBtn)

    btn.addEventListener('click', () => {
        window.location.reload()
    })
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
    player1.changeHP(getRandomNuber(20))
    player2.changeHP(getRandomNuber(20))
    player1.renderHP(player1)
    player2.renderHP(player2)

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true
        createReloadButton()
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWin(player2.name))
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWin(player1.name))
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWin())
    }
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));