import {$arenas, $formFight, getRandomNumber} from "./utils.js";
import {generateLogs, playerAttack, showResult, getFight} from "./fight.js";
import {createPlayer, Player} from "./players.js";

export let player1 = JSON.parse(localStorage.getItem('player1'));
export let player2;

export class Game {

    getRandomEnemy = async () => {
        const enemyPlayer = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
        return enemyPlayer;
    }

    start = async () => {
        const enemyP = await this.getRandomEnemy();
        player1 = new Player({
            ...player1,
            player: 1,
            rootSelector: 'arenas',
        });
        player2 = new Player({
            ...enemyP,
            player: 2,
            rootSelector: 'arenas',
        });

        $arenas.appendChild(createPlayer(player1));
        $arenas.appendChild(createPlayer(player2));
        generateLogs('start', player1, player2);
        this.fight();
    }

    fight = async () => {
        const q = await getFight();
        $formFight.addEventListener('submit', function (e) {
            e.preventDefault();

            const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = q.player2
            const {hit, defence,  value} = playerAttack();


            if (hitEnemy === defence) {
                player1.changeHP(valueEnemy);
                player1.renderHP(player1);
                generateLogs('hit', player2, player1, valueEnemy, player1.hp);
            } else {
                generateLogs('defence', player2, player1);
            }

            if (hit === defenceEnemy) {
                player2.changeHP(value);
                player2.renderHP(player2);
                generateLogs('hit', player1, player2, value, player2.hp);
            } else {
                generateLogs('defence', player1, player2);
            }

            showResult();
        });
    }
}
