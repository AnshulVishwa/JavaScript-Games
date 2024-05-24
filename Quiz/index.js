    async function getData(url, data) {
        try {
            url = await fetch("questions.json")
            data = await url.json()
            data = data.results.filter((v, i) => v.type == "multiple")
            let playGame = true
            let totalQue = []
            let crr = []
            function PlayQuiz() {
                for (let i = 0; i < data.length; i++) {
                    data[i].incorrect_answers.push(data[i].correct_answer)
                }
                let arr = []
                for (let j = 0; j < 10; j++) {
                    let random = Math.floor(Math.random() * 4)
                    if (arr.includes(random)) {
                        random = Math.floor(Math.random() * 4)
                    }
                    else {
                        arr.push(random)
                    }
                }
                if (arr.length < 5) {
                    for (let j = 0; j < 10; j++) {
                        let random = Math.floor(Math.random() * 4)
                        if (arr.includes(random)) {
                            random = Math.floor(Math.random() * 4)
                        }
                        else {
                            arr.push(random)
                        }
                    }
                }

                //////////////////////////////////////

                let ques25 = Math.floor(Math.random() * data.length)
                const question = document.createElement("h3")
                question.textContent = `Q.  ${data[ques25].question}`
                document.querySelector(".que").appendChild(question)

                let ans = document.createElement("div")
                ans.setAttribute("class","answer")
                document.querySelector(".que").appendChild(ans)

                for (let i = 0; i < 4; i++) {
                    const answers = document.createElement("button")
                    answers.textContent = data[ques25].incorrect_answers[arr[i]]
                    answers.setAttribute("class", `ans`)

                    ans.appendChild(answers)
                }

                const allAns = document.querySelectorAll(".ans")
                allAns.forEach((each) => {
                    each.addEventListener('click', handleClick)
                })

                function handleClick(e) {
                    const selectedAnswer = e.target;
                    if (selectedAnswer.outerText == data[ques25].correct_answer) {
                        selectedAnswer.style.backgroundColor = "#67ff6785"
                        selectedAnswer.style.color = "white"
                        totalQue.push(selectedAnswer)
                        crr.push(selectedAnswer)
                        if (totalQue.length == 4) {
                            console.log("Done")
                            endGame()
                        } else {
                            selectedAnswer.removeEventListener('click', handleClick);
                            PlayQuiz()
                        }

                    } else {
                        selectedAnswer.style.backgroundColor = "rgba(255,0,0,0.5)"
                        selectedAnswer.style.color = "white"
                        selectedAnswer.setAttribute("disabled", "")
                        totalQue.push(selectedAnswer)
                        if (totalQue.length == 4) {
                            console.log("Done")
                            endGame()
                        } else {
                            selectedAnswer.removeEventListener('click', handleClick);
                            PlayQuiz()
                        }
                    }
                    playGame = false
                }
            }
            if (playGame == true) {

                PlayQuiz()
            } else {
                setTimeout(() => {
                    PlayQuiz()
                }, 500)
            }

            const btn = document.createElement("button")
            document.querySelector(".sub").appendChild(btn)
            btn.textContent = "Submit"
            btn.setAttribute("class", "submit")
 
            function endGame() {
                setTimeout(() => {
                    window.location.reload()
                }, 4000)

                const para = document.createElement("p")
                para.setAttribute("id", "result")
                para.textContent = `You total score is ${crr.length}...Total Questions Attempt are ${totalQue.length}`
                document.querySelector(".sub").appendChild(para)
                let a = 4
                const y = document.createElement("span")

                document.querySelector("#result").appendChild(y)
                setInterval(() => {
                    a--
                    y.textContent = a
                }, 1000)
            }


            btn.addEventListener("click", (e) => {
                e.preventDefault()
                endGame()
            })
        } catch (error) {
            console.log(error)
        }
    }
    getData()