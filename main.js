'use strict'
import {player1, player2} from "./players.js";
import {createElement, $arenas, $formFight} from "./utils.js";
import {generateLogs,enemyAttack, playerAttack, showResult} from "./fight.js";


//создание игрока
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

//рендер игроков
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

//показ сообщения о старте файте
generateLogs('start', player1, player2);

//кнопка боя
$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    enemyAttack();
    const enemy = enemyAttack();
    const player = playerAttack();

    if (enemy.hit === player.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP(player1);
        generateLogs('hit', player2, player1, enemy.value, player1.hp);
    } else {
        generateLogs('defence', player2, player1);
    }

    if (player.hit === enemy.defence) {
        player2.changeHP(player.value);
        player2.renderHP(player2);
        generateLogs('hit', player1, player2, player.value, player2.hp);
    } else {
        generateLogs('defence', player1, player2);
    }

    showResult();
});
