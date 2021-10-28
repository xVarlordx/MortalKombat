export const player1 = {
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
export const player2 = {
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

function changeHP (numberHP) {
    this.hp -= numberHP;

    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function elHP () {
    return document.querySelector('.player'+ this.player +' .life');
}

function renderHP (player) {
    player.elHP().style.width = this.hp + '%';
}
