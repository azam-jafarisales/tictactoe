
const tasks = document.querySelectorAll('.maincontent div');
const turn = document.querySelector('.turn');
const countDown = document.querySelector('.countdown');
const round = document.querySelector('.round span');
const modal = document.querySelector('#modal');
const closeModal = document.querySelector('#modal i');
const modalContent = document.querySelector('#modal-content');
let roundCount = 6;
const refreshBtn = document.querySelector('button');
const oRecord = document.querySelector('.record span:nth-of-type(1)');
let x = 0;
const xRecord = document.querySelector('.record span:nth-of-type(2)');
let o = 0;
const player1 = "x";
const player2 = "o";
let clickCount = 0;
let winner = "";
let remaining_time = 30;
let circle = document.querySelector('circle');
let playing = false;
let interval = null;
// --------homesclick to put x or o

tasks.forEach((task, index) => {
    task.addEventListener('click', () => {

        if (!playing) {
            playing = true;
            interval = setInterval(() => { timerFunc() }, 1000);
        }
        circle.style.animationName = 'countdown'
        if (task.innerHTML == "") {
            clickCount++;

            xo(task, clickCount);
            let homes012 = win(tasks[0], tasks[1], tasks[2]);
            let homes036 = win(tasks[0], tasks[3], tasks[6]);
            let homes048 = win(tasks[0], tasks[4], tasks[8]);
            let homes147 = win(tasks[1], tasks[4], tasks[7]);
            let homes258 = win(tasks[2], tasks[5], tasks[8]);
            let homes246 = win(tasks[2], tasks[4], tasks[6]);
            let homes345 = win(tasks[3], tasks[4], tasks[5]);
            let homes678 = win(tasks[6], tasks[7], tasks[8]);

            if (clickCount == 9 && !homes012 && !homes036 && !homes048 && !homes147 && !homes258 && !homes246 && !homes345 && !homes678) {
                setTimeout(function () {
                    alert('Game ended in draw');
                    clearHomes();
                    restartAnimation();
                    roundCount--;
                    round.innerHTML = `${"round = "}${roundCount}`;
                    winner=""
                    turn.innerHTML=`${"X turn"}`;
                }, 30)
            }

        }
    });
})

// close modal

closeModal.addEventListener('click', function () {
    modal.style.visibility = 'hidden';
})

// ----------refresh btn

refreshBtn.addEventListener('click', refreshGame);

// --------homesclick to put x or o function

function xo(a, b) {

    if ( winner=="" || winner == "x") {

        if (((b) % 2) == 0) {
            a.innerHTML = `<span style = "color :red">${player2}</span>`;
            turn.innerHTML = `${'X turn'}`;

        } else if (((b) % 2) != 0) {
            a.innerHTML = `<span style = "color :green">${player1}</span>`;
            turn.innerHTML = `${'O turn'}`;
        }
    } else if (winner == "o") {
        if (((b) % 2) == 0) {
            a.innerHTML = `<span style = "color : red">${player1}</span>`;
            turn.innerHTML = `${'O turn'}`;

        } else if (((b) % 2) != 0) {
            a.innerHTML = `<span style = "color :green">${player2}</span>`;
            turn.innerHTML = `${'X turn'}`;
        }
    }
}

// ------- to recognize winner function

function win(a, b, c) {
    if (a.textContent == b.textContent && b.textContent == c.textContent) {
        if (a.textContent != "" && b.textContent != "" && c.textContent != "") {
            a.style.backgroundColor = ' rgba(201, 136, 136, 0.445)';
            b.style.backgroundColor = ' rgba(201, 136, 136, 0.445)';
            c.style.backgroundColor = ' rgba(201, 136, 136, 0.445)';

            if (a.textContent == player1) {
                x++;
                xRecord.innerHTML = `${"X="}${x}`;
                turn.innerHTML = `${'X turn'}`;
                winner = "x";
            } else {
                o++;
                oRecord.innerHTML = `${"O="}${o}`;
                turn.innerHTML = `${'O turn'}`;
                winner = "o";
            }
            setTimeout(() => {
                alert("the winner of this round is " + " " + a.textContent);
                clearHomes();
                roundCount--;
                if (roundCount == 0) {
                    modal.style.visibility = 'visible';
                    if (o > x) {
                        modalContent.innerHTML = `<li>${"congratulations to O"}</li><li>${"O="}${o}</li><li>${"X="}${x}</li>`;
                    } else if (x > o) {
                        modalContent.innerHTML = `<li>${"congratulations to X"}</li><li>${"O="}${o}</li><li>${"X="}${x}</li>`;
                    } else {
                        modalContent.innerHTML = `<li>${"equal"}</li><li>${"O="}${o}</li><li>${"X="}${x}</li>`;
                    }
                    refreshGame();
                }
                round.innerHTML = `${"round = "}${roundCount}`;
            }, 100);
        }
        return true;
    } else {
        return false;

    }
}

// -------refresh game functions

function refreshGame() {
    clearHomes();
    turn.innerHTML = `${'X turn'}`;
    xRecord.innerHTML = `${"X="}${0}`;
    oRecord.innerHTML = `${"O="}${0}`;
    o = 0;
    x = 0;
    roundCount = 6;
    round.innerHTML = `${"round = "}${roundCount}`;
    winner = "";
}

function clearHomes() {
    restartAnimation();
    clearInterval(interval);
    playing = false;
    tasks.forEach(function (t) {
        t.innerHTML = "";
        t.style.backgroundColor = 'inherit';
    })
    clickCount = 0;

}

function restartAnimation() {
    circle.style.animationName = 'none';
    remaining_time = 30;
    countDown.innerHTML = `30`;
}

function timerFunc() {
    remaining_time--;
    countDown.innerHTML = `${remaining_time}`;
    if (remaining_time == 0) {
        alert('your time ended');
        remaining_time = 30;
        countDown.innerHTML = `30`;
        clearHomes();
        roundCount--;
        round.innerHTML = `${"round = "}${roundCount}`;
    }
}