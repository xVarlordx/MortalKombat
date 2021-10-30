import {$arenas, $formFight} from "./utils.js";
import {enemyAttack, generateLogs, playerAttack, showResult} from "./fight.js";
import {player1, player2, createPlayer} from "./players.js";

export class Game {
    constructor() {

    }

    start = () => {
        $arenas.appendChild(createPlayer(player1));
        $arenas.appendChild(createPlayer(player2));
        generateLogs('start', player1, player2);
        this.fight();
    }

    fight = ()  => {
        $formFight.addEventListener('submit', function (e) {
            e.preventDefault();
            enemyAttack();
            const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = enemyAttack();
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
