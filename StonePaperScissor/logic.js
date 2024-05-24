const allChoice = document.querySelectorAll(".choice")
const uScore = document.querySelector(".uScore")
const compScore = document.querySelector(".compScore")
const play = document.querySelector(".play")
const time = document.querySelector(".time")

time.textContent = ""

allChoice.forEach( (each)=>{
    each.addEventListener("click" , (e)=>{
        let userChoice = e.target.id
        let compSelect = e.target.id
        const random = Math.floor( Math.random() * 3 )
        switch( random ){
            case 0 : compSelect = "stone";
                break;
            case 1 : compSelect = "paper";
                break;
            case 2 : compSelect = "scissor";
                break;
        }
        e.target.parentElement.style.boxShadow = "0 0 1em blue"
        document.querySelector(`#${compSelect}`).parentElement.style.boxShadow = " 0 0 1em red "
        if( userChoice == compSelect ) {
            play.textContent = "Match Draw";
            e.target.parentElement.style.boxShadow = " 0 0 1em green "
        }

        function win (who) {
            play.textContent = `${who} win the game`
            if( who == "Computer" ) compScore.textContent = parseInt(compScore.textContent) + 1
            if( who == "You" ) uScore.textContent = parseInt(uScore.textContent) + 1
        }

        if( userChoice == "stone" && compSelect == "paper" ) win( "Computer" );
        if( userChoice == "paper" && compSelect == "scissor" ) win( "Computer" );
        if( userChoice == "scissor" && compSelect == "stone" ) win( "Computer" );

        if( compSelect == "stone" && userChoice == "paper" ) win( "You" );
        if( compSelect == "paper" && userChoice == "scissor" ) win( "You" );
        if( compSelect == "scissor" && userChoice == "stone" ) win( "You" );

        let count = 4
        let interval = setInterval( ()=>{
            count--
            time.textContent = `Wait new game starts in ${count}`
            if( count == 0 ){
                clearInterval(interval)
                time.textContent = ""
                e.target.parentElement.style.boxShadow = "none"
                document.querySelector(`#${compSelect}`).parentElement.style.boxShadow = "none"
                play.textContent = "Play the Game"
            }
        } , 1000 )
    })
} )