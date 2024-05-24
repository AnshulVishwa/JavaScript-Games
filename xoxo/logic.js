let all = true
    let content = document.querySelector(".content")
    let Startbtn =  document.createElement("div")

    Startbtn.setAttribute("class","startBtn")
    Startbtn.innerHTML = "<start>Start Game</start>"

    content.append(Startbtn)

    Startbtn.addEventListener("click",()=>{
        content.removeChild(Startbtn)
        selection()
    })

    function selection(){
        let choose = document.createElement("div")
        choose.setAttribute("class","choose-up")
        choose.innerHTML = `You are player 1`
    
        let choose2 = document.createElement("div")
        choose2.setAttribute("class","choose-mid")
        choose2.innerHTML = `Select your Move`

        let select = document.createElement("div")
        select.setAttribute("class","select")
        
        let but1 = document.createElement("div")
        but1.setAttribute("class","but1")
        but1.innerHTML = `<val>X</val>`
        
        let but2 = document.createElement("div")
        but2.setAttribute("class","but2")
        but2.innerHTML = `<val>O</val>`
        select.append(but1 , but2)

        content.append(choose , choose2 , select)

        but2.addEventListener("click", ()=>{
            all = false
            content.removeChild(choose)
            content.removeChild(choose2)
            content.removeChild(select)
            startGame("O" , "X" , "multi")
        } )
        but1.addEventListener("click", ()=>{
            all = false
            content.removeChild(choose)
            content.removeChild(choose2)
            content.removeChild(select)
            startGame("X" , "O" , "pc")
        } )
    }

    function startGame(player1 , player2 , mode){
        for(let i = 0 ; i < 9 ; i++){
            let create = document.createElement("div")
            create.setAttribute( "id" , `create${i}`)
            create.setAttribute( "class" , `create`)
            create.innerHTML = null
            
            content.append(create)
        }

        let allBoxes = document.querySelectorAll(".create")
        //let one = "O"
        //let two = "X"
        let val = player2
        let playGame = true

        let myArr = []

        if(playGame == true){
            allBoxes.forEach( (each)=>{
                myArr = []
                each.addEventListener( "click" ,  ()=>{
    
                    val = val == player1 ? player2 : player1
                    each.innerHTML = val
                    myArr.push(each.id)

                    function repeat( num1 , num2 , num3 ){
                        if(num1.innerHTML == "X" || num1.innerHTML == "O"){
                            if(num1.innerText == num2.innerText){
                                if(num2.innerText == num3.innerText){
                                    endGame(num1,num2,num3,num1.innerHTML)
                                }
                            }
                        }
                    }
                    let a0 = document.querySelector("#create0")
                    let a1 = document.querySelector("#create1")
                    let a2 = document.querySelector("#create2")
                    let a3 = document.querySelector("#create3")
                    let a4 = document.querySelector("#create4")
                    let a5 = document.querySelector("#create5")
                    let a6 = document.querySelector("#create6")
                    let a7 = document.querySelector("#create7")
                    let a8 = document.querySelector("#create8")
                        repeat( a0 , a1 , a2 )
                        repeat( a0 , a3 , a6 )
                        repeat( a0 , a4 , a8 )
                        repeat( a1 , a4 , a7 )
                        repeat( a2 , a5 , a8 )
                        repeat( a2 , a4 , a6 )
                        repeat( a3 , a4 , a5 )
                        repeat( a6 , a7 , a8 )
                    if( myArr.length == 9 ){
                        drawGame()
                    }
                    let body = document.querySelector(".container-fluid")
                    let drawBox = document.createElement("div")
                    drawBox.setAttribute('class','drawBox')
                    let interval = 4
                    body.appendChild(drawBox)
                    
                    function drawGame(){
                        setInterval( ()=>{
                            drawBox.innerHTML = `Match Draw . New Game Starts In <span class="interval">${interval}s</span>`
                            interval--
                        } , 1000 )
                        setTimeout(()=>window.location.reload() , 4000)
                    }

                    function endGame(a,b,c,name){
                        let body = document.querySelector(".container-fluid")
                        let drawBox = document.querySelector(".drawBox")
                        body.removeChild(drawBox)

                        a.style.backgroundColor = "#d6c0ff";
                        b.style.backgroundColor = "#d6c0ff";
                        c.style.backgroundColor = "#d6c0ff";

                        if(name == player1) value = "Player 1"
                        if(name == player2) value = "Player 2"

                        let endBox = document.createElement("div")
                        endBox.setAttribute('class','endBox')
                        let interval = 4
                        setInterval( ()=>{
                            endBox.innerHTML = `${value} Won the Game . New Game Starts In <span class="interval">${interval}s</span>`
                            interval--
                        } , 1000 )
                        body.appendChild(endBox)

                        setTimeout(()=>window.location.reload() , 4000) 
                    }
                } )
            })
        }
    }