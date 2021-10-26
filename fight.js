import {player1, player2} from "./players.js";
import {createElement, getRandomNumber, showTime} from "./utils.js";
import {$formFight, $arenas} from "./utils.js";

const $fightButton = document.querySelector('.button');
const $chat = document.querySelector('.chat');
const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    death: '[playerKick] нанес ФАТАЛЬНЫЙ удар [playerDefence] - результат СМЭРТЬ',
    draw: 'Ничья - это тоже победа!'
};
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

function playerWin(name) {
    const $winTitle = createElement('div', 'winTitle');

    if (name) {
        $winTitle.innerText = name + ' win';
    } else {
        $winTitle.innerText = 'draw';
    }

    return $winTitle;
}

export function generateLogs (type, player1=null, player2=null, value=null, hp=null) {
    let text;
    let el;
    switch (type) {
        case 'hit':
            text = logs[type][getRandomNumber(18)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            el = `<p>${showTime()} - ${text} -${value} [${hp}/100]</p>`;
            break;
        case 'start':
            text = logs[type].replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', showTime());
            el = `<p>${text}</p>`;
            break;
        case 'defence':
            text = logs[type][getRandomNumber(8)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            el = `<p>${showTime()} - ${text}</p>`;
            break;
        case 'draw':
            text = logs[type];
            el = `<p>${showTime()} - ${text}</p>`;
            break;
        case 'death':
            text = logs[type].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            el = `<p>${showTime()} - ${text}</p>`;
            break;
    }

    $chat.insertAdjacentHTML('afterbegin', el);
}

export function enemyAttack() {
    const hit = ATTACK[getRandomNumber(3)];
    const defence = ATTACK[getRandomNumber(3)];

    return {
        value: getRandomNumber(HIT[hit]),
        hit,
        defence,
    }
}

export function playerAttack () {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandomNumber(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }
    return attack;
}

export function showResult () {
    if (player1.hp === 0 || player2.hp === 0) {
        $fightButton.disabled = true;
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWin(player2.name));
        generateLogs('death', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWin(player1.name));
        generateLogs('death', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWin());
        generateLogs('draw',player1, player2);
    }
}

 export function createReloadButton () {
    const reloadBtn = createElement('div', 'reloadWrap');
    const btn = createElement('button', 'button');
    btn.innerText = 'Restart';
    reloadBtn.appendChild(btn);
    $arenas.appendChild(reloadBtn);

    btn.addEventListener('click', () => {
        window.location.reload();
    })
}