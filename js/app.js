const bird = {
    div: null,
    height: 30,
    width: 40,
    left: 250,
    bottom: 250,
    gravity: 2,
    iniciar: function () {
        bird.div = document.querySelector(".bird");
        bird.div.style.height = bird.height + "px";
        bird.div.style.width = bird.width + "px";
    },
    dibujar: function () {
        bird.div.style.bottom = bird.bottom + "px";
        bird.div.style.left = bird.left + "px";
    },
    control: function (e) {
        if (e.keyCode === 32) {
            bird.mover();
        }
    },
    mover: function () {
        bird.bottom += 40;
    },
    efectoGravedad: function () {
        bird.bottom -= bird.gravity;
    },
    colisionY: function () {
        var lret = false;
        if (
            (bird.bottom < obstaculo.items[0].divBot.height && bird.bottom >= obstaculo.items[0].divBot.bottom)
            ||
            (bird.bottom + bird.height > obstaculo.items[0].divTop.bottom &&
                bird.bottom + bird.height < obstaculo.items[0].divTop.bottom + obstaculo.items[0].divTop.height)
        )
        {
            lret = true;
        }
        return lret;
    },
    colisionX: function () {
        var lret = false;
        if (
            (bird.left + bird.width > obstaculo.items[0].left &&
                bird.left + bird.width <= obstaculo.items[0].left + obstaculo.items[0].width)
            ||
            (bird.left > obstaculo.items[0].left && bird.left < obstaculo.items[0].left + obstaculo.items[0].width)
        )
        {
            lret = true;
        }
        return lret;
    },
    colision: function () {
        if (bird.bottom > (game.height - bird.height) ||
            bird.bottom <= 0) {
            game.terminar();
        }
        if (bird.colisionY() && bird.colisionX()) {
            game.terminar();
        }
    }
}

const obstaculo = {
    espacio: 100,
    alturaMinima: 90,
    items: [{ width: 50, left: 0, divTop: { div: 0, bottom: 0, height: 0 }, divBot: { div: 0, bottom: 0, height: 0 } },
    { width: 50, left: 0, height: 0, bottom: 0, divTop: 0, divBot: 0 }],
    iniciar: function () {
        obstaculo.items[0].divTop.div = document.getElementById("divTop");
        obstaculo.items[0].divBot.div = document.getElementById("divBot");
        obstaculo.reset();
    },
    dibujar: function () {
        obstaculo.items[0].divTop.div.style.left = obstaculo.items[0].left + "px";
        obstaculo.items[0].divBot.div.style.left = obstaculo.items[0].left + "px";
    },
    mover: function () {
        obstaculo.items[0].left -= 2;
    },
    colision: function () {
        if (obstaculo.items[0].left < (obstaculo.items[0].width * -1)) {
            obstaculo.reset();
        }
    },
    reset: function () {
        obstaculo.items[0].left = game.width - obstaculo.items[0].width;
        obstaculo.items[0].divBot.height = obstaculo.aleatorio(obstaculo.alturaMinima, game.height - (obstaculo.alturaMinima + obstaculo.espacio));
        obstaculo.items[0].divBot.bottom = 0;
        obstaculo.items[0].divTop.height = game.height - (obstaculo.items[0].divBot.height + obstaculo.espacio);
        obstaculo.items[0].divTop.bottom = obstaculo.items[0].divBot.height + obstaculo.espacio;
        obstaculo.items[0].divBot.div.style.height = obstaculo.items[0].divBot.height + "px";
        obstaculo.items[0].divBot.div.style.width = obstaculo.items[0].width + "px";
        obstaculo.items[0].divBot.div.style.bottom = obstaculo.items[0].divBot.bottom + "px";
        obstaculo.items[0].divBot.div.style.left = obstaculo.items[0].left + "px";
        obstaculo.items[0].divTop.div.style.height = obstaculo.items[0].divTop.height + "px";
        obstaculo.items[0].divTop.div.style.width = obstaculo.items[0].width + "px";
        obstaculo.items[0].divTop.div.style.bottom = obstaculo.items[0].divTop.bottom + "px";
        obstaculo.items[0].divTop.div.style.left = obstaculo.items[0].left + "px";
    },
    aleatorio: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

const game = {
    height: 600,
    width: 600,
    groundh: 150,
    skyh: 600,
    display: 0,
    ground: 0,
    sky: 0,
    isGameOver: false,
    gap: 640,
    timerId: 0,
    iniciar: function () {
        game.display = document.querySelector(".game-container");
        game.ground = document.querySelector(".ground-moving");
        game.sky = document.querySelector(".sky");
        game.display.style.height = game.height + "px";
        game.display.style.width = game.width + "px";
        game.sky.style.width = game.width + "px";
        game.sky.style.height = game.skyh + "px";
        game.ground.style.height = game.groundh + "px"
        game.ground.style.width = game.width + "px"
        bird.iniciar();
        obstaculo.iniciar();
        document.addEventListener("keyup", bird.control);
        game.timerId = setInterval(game.loop, 20);
    },
    mover: function () {
        bird.efectoGravedad();
        obstaculo.mover();
    },
    dibujar: function () {
        bird.dibujar();
        obstaculo.dibujar();
    },
    verificaColision: function () {
        if (bird.colision()) {
            game.terminar();
        }
        obstaculo.colision();
    },
    terminar: function () {
        clearInterval(game.timerId);
        console.log(bird.bottom);
    },
    loop: function () {
        game.mover();
        game.dibujar();
        game.verificaColision();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    game.iniciar();
});
