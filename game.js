let boxes = document.querySelectorAll(".boxes");
let h2 = document.querySelector("h2");
let reset = document.querySelector("#reset");
let newBtn = document.querySelector("#new");

let winner = false;

let draw = false;

let countX = 0;
let countO = 0;

let turnX = true;

let winnerPatterns = [[0,1,2],[0,3,6],[0,4,8],[3,4,5],[6,7,8],[1,4,7],[2,5,8],[2,4,6]]

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX){
            box.innerText = "X";
            box.classList.add("red");
            turnX = false;
        }else{
            box.innerText = "O"; 
            box.classList.add("blue");
            turnX = true;
        }
        box.disabled = true;
        if(!checkWinner()){
            checkDraw();
        }
    });
})

function checkWinner(){
        for(let pattern of winnerPatterns){
            let pos1 = boxes[pattern[0]].innerText;
            let pos2 = boxes[pattern[1]].innerText;
            let pos3 = boxes[pattern[2]].innerText;
            
            if(pos1 != "" && pos2 != "" && pos3 != ""){
                if(pos1 === pos2 && pos2 === pos3){
                    for(box of boxes){
                        box.disabled = true;
                    }
                    let h2 = document.querySelector("h2");
                    h2.innerText = `Winner Is Player : ${pos1}`;  

                    let X = document.querySelector("#X");
                    let O = document.querySelector("#O");

                    if(pos1 === "X"){
                        X.innerText = `X score : ${++countX}`;
                    } else{
                        O.innerText = `O score: ${++countO}`;
                    }   

                    return winner = true;
            }
        }
    }
}

function checkDraw(){
    let btns = [...boxes];  // we are converting the NodeList (boxes) to an array (btns)
    let bool = btns.every( (btn) => {
        if(btn.innerText != ""){
            return true;
        }
    });

    if(bool){
        h2.innerText = "It's a draw!";
        return draw = true;
    }
}

reset.addEventListener("click", () => {
    if(!(winner || draw)){
        turnX = true;
        for(let box of boxes){
            box.innerText = "";
            box.disabled = false;
            h2.innerText = "";
            box.classList.remove("red","blue");
        }
    }
});

newBtn.addEventListener("click", () => {
    if(winner || draw){
        turnX = true;
        winner = false;
        draw = false;
        for(let box of boxes){
            box.innerText = "";
            box.disabled = false;
            h2.innerText = "";
            box.classList.remove("red","blue");
        }
    }
});





