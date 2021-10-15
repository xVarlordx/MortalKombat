'use strict'

const player1 = {
    name: "Scorpion",
    hp: 30,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["minigun", "knife"],
    attack: function (name) {
        console.log(name + "Fight...")
    }
}

const player2 = {
    name: "Kitana",
    hp: 80,
    img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
    weapon: ["plasmagun", "fist"],
    attack: function (name) {
        console.log(name + "Fight...")
    }
}

const createPlayer = (player, obj) => {
    const arenas = document.querySelector('.arenas')
        const $div = document.createElement('div');
        $div.classList.add(player);
            const $progressbar = document.createElement('div')
            $progressbar.classList.add('progressbar')
                const $life = document.createElement('div')
                $life.classList.add('life')
                $life.style.width = obj.hp + "%"
                $progressbar.appendChild($life)
                const $name = document.createElement('div')
                $name.classList.add('name')
                $name.innerText = obj.name
                $progressbar.appendChild($name)
            const $character = document.createElement('div')
            $character.classList.add('character')
                const $img = document.createElement('img')
                $img.src= obj.img
                $character.appendChild($img)
            $div.appendChild($progressbar)
            $div.appendChild($character)
    arenas.appendChild($div)
}

createPlayer('player1', player1);
createPlayer('player2', player2);