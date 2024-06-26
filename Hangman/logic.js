const que = document.querySelector(".question")
const ansBox = document.querySelector(".answerBox")
const upper = document.querySelector(".upper")
const lower = document.querySelector(".lower")
let click = true
let question_number = 0
async function getData( num = 0 , score = 0 , prev = false , inc = 0 ){
    try{
        console.log( num , score , prev )
        if(num == 5){
            ansBox.style.display = "none"
            que.textContent = ""
            if( inc == 5 ) upper.textContent = "He Died !!!!"
            else upper.textContent = "You saved the Life"
            lower.textContent = "Game is restarting Soon..."
            setTimeout( ()=>{
                window.location.reload()
            } , 2000 )
            return inc;
        }
        ansBox.style.display = "grid"
        let url = await fetch("./api.json")
        let data = await url.json()
        let rand = Math.floor(Math.random() * data.length)
        que.textContent = data[rand].question
        let totalQuestionsAttemped = document.createElement("div")
        let YourScore = document.createElement("div")
        let previous = document.createElement("div")
        totalQuestionsAttemped.classList.add("totalQuestions")
        YourScore.classList.add("yourScore")
        previous.classList.add("prev")
        num = num+1
        totalQuestionsAttemped.textContent = `Question ${num}.`
        YourScore.textContent = `Score ~ ${score}`


        if( num == 1 ) ""
        else previous.textContent = ( prev ) ? "Your Previous Answer in Correct" : "Your Previous Answer in Incorrect"
        upper.insertBefore( totalQuestionsAttemped , document.querySelector(".question") )
        lower.append( previous , YourScore)

        for( let i = 0 ; i < 4 ; i++ ){
            const create = document.createElement("div")
            create.classList.add(`answer${i}`)
            create.classList.add(`answer`)
            let text = ""
            let a = ""
            switch(i){
                case 0 : text = data[rand].A
                            a = "A"
                break;
                case 1 : text = data[rand].B
                            a = "B"
                break;
                case 2 : text = data[rand].C
                            a = "C"
                break;
                case 3 : text = data[rand].D
                            a = "D"
                break;
            }
            create.textContent = `${a}.${text}`
            ansBox.appendChild(create)
            create.addEventListener( "click" , ()=>{
                if( click ){
                    if( (create.textContent).split(".")[0] == data[rand].answer ) {
                        create.style.color = "green"
                        totalQuestionsAttemped.textContent = `Question ${num+1}.`
                        score = score+1
                        YourScore.textContent = `Score ~ ${score}`
                        document.querySelectorAll(".answer").forEach( ( each ) => ansBox.removeChild(each) )
                        upper.removeChild(totalQuestionsAttemped)
                        lower.removeChild(YourScore)
                        lower.removeChild(previous)
                        getData( num , score , true , inc)
                    }
                    else {
                        create.style.color = "red"
                        inc++
                        totalQuestionsAttemped.textContent = `Question ${num+1}.`
                        YourScore.textContent = `Score ~ ${score}`
                        document.querySelectorAll(".answer").forEach( ( each ) => ansBox.removeChild(each) )

                        switch(inc){
                            case 1 : document.querySelector(".rope").style.display = "block"
                                break;
                            case 2 : document.querySelector(".head").style.display = "block"
                                break;
                            case 3 : document.querySelector(".body").style.display = "block"
                                break;
                            case 4 : document.querySelector(".hands").style.display = "block"
                                break;
                            case 5 : document.querySelector(".legs").style.display = "block"
                                break;
                        }

                        upper.removeChild(totalQuestionsAttemped)
                        lower.removeChild(YourScore)
                        lower.removeChild(previous)
                        getData( num , score , false , inc)
                    }
                }
            } )
        }
    }
    catch( error ){
        console.log(error)
    }
}

const btn = document.createElement("button")
btn.classList.add("btn")
btn.textContent = "Start Game"
upper.appendChild(btn)
btn.addEventListener( "click" , ()=>{
    upper.removeChild(btn)
    getData()
} )
