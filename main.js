'use strict'
const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: "Scorpion",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["minigun", "knife"],
    attack: function (name) {
        console.log(name + "Fight...")
    },
    elHP,
    changeHP,
    renderHP,
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
    elHP,
    changeHP,
    renderHP,
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

function missMassege (name)  {
    console.log(name + "MISS")
}

function createElement (tag, className) {
   const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag;

}

function createReloadButton () {
    const reloadBtn = createElement('div', 'reloadWrap');
    const btn = createElement('button', 'button');
    btn.innerText = 'Restart';
    reloadBtn.appendChild(btn);
    $arenas.appendChild(reloadBtn)

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

// $randomButton.addEventListener('click', function () {
//     player1.changeHP(getRandomNuber(20))
//     player2.changeHP(getRandomNuber(20))
//     player1.renderHP(player1)
//     player2.renderHP(player2)
//
//     if (player1.hp === 0 || player2.hp === 0) {
//         $randomButton.disabled = true
//         createReloadButton()
//     }
//
//     if (player1.hp === 0 && player1.hp < player2.hp) {
//         $arenas.appendChild(playerWin(player2.name))
//     } else if (player2.hp === 0 && player2.hp < player1.hp) {
//         $arenas.appendChild(playerWin(player1.name))
//     } else if (player1.hp === 0 && player2.hp === 0) {
//         $arenas.appendChild(playerWin())
//     }
// })

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
    const hit = ATTACK[getRandomNuber(3)];
    const defence = ATTACK[getRandomNuber(3)];

    return {
        value: getRandomNuber(HIT[hit]),
        hit,
        defence,
    }

}

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    enemyAttack();
    const enemy = enemyAttack();
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandomNuber(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }

    if (enemy.hit === attack.defence) {
        player1.changeHP(enemy.value)
        player1.renderHP(player1)
    } else {
        (missMassege(player2.name))
    }

    if (attack.hit === enemy.defence) {
        player2.changeHP(attack.value)
        player2.renderHP(player2)
    } else {
        (missMassege(player1.name))
    }


    if (player1.hp === 0 || player2.hp === 0) {
        $fightButton.disabled = true
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