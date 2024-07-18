let Boxes = document.querySelectorAll(".box");
let ResetBtn = document.getElementById("reset_btn");
let newBtn = document.getElementById("newBtn");
let msgContainer = document.querySelector(".msg-Container");
let msg = document.querySelector(".msg");

let turnO = true; //PlayerX, PlayerO
let count = 0; //To track Draw

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8], 
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

Boxes.forEach(box => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
       if(turnO){ //PlayerO
        box.innerText = "O";
        turnO = false; // This means now next turn is of X , means X will print not O
       }
       else { //PlayerX
        box.innerText = "X";
        turnO = true; // This means now after X now its the turn of O  
       }
       box.disabled = true;
       count++;
       
       let isWinner =  CheckWinner();

       if(count == 9 && !isWinner){
        GameDraw();
       }
    })  
});

const GameDraw = () => {
    msg.innerText = "Its a Draw";
    msgContainer.classList.remove("hide");
    DisableBoxes();
}

const ResetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};
const enableBoxes = () => {
    for(box of Boxes){
        box.disabled = false;
        box.innerText = "";
       }
};

const DisableBoxes = () => {
   for(box of Boxes){
    box.disabled = true;
   }
} ;

const ShowWinner = (winner) => {
     msg.innerText = `Congratulations! Winner is : ${winner}`;
     msgContainer.classList.remove("hide");
     DisableBoxes();

};



let CheckWinner = () => {
    for(patterns of winPatterns ) {

        let Pos1Val = Boxes[patterns[0]].innerText;
        let Pos2Val = Boxes[patterns[1]].innerText;
        let Pos3Val = Boxes[patterns[2]].innerText;

        if(Pos1Val != "" && Pos2Val != ""  && Pos3Val != ""  ){
            if(Pos1Val == Pos2Val && Pos2Val == Pos3Val){
               ShowWinner(Pos1Val);
              
        }
    }
}
};

newBtn.addEventListener("click", ResetGame);
ResetBtn.addEventListener("click",ResetGame);
