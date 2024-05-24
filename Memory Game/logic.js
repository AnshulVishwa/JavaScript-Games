const grid = document.querySelector(".grid")
let myArr = [];
let count = 0;
let button = document.querySelector("button")
let input = document.querySelector("input")
let val;
button.addEventListener("click",()=>{
    input.setAttribute("disabled" , "")
    if( input.value == null || input.value == undefined || input.value == 0 || isNaN(input.value) ){
        val = 24
        pooraGame(val)
    }
    else{
        val = input.value
        pooraGame(val)
    }
})
function pooraGame(val){
    for( let k = 0 ; k < grid.childElementCount ; k ++ ){
        grid.removeChild( grid.childNodes[k] )
    }
    for( let i = 0 ; i < val ; i++ ){
        let create = document.createElement("div")
        create.setAttribute( "class" , "boxes" )
        create.setAttribute( "id" , `create${i}` )
    
        let random = Math.floor( Math.random() * 5 )
    
        create.setAttribute( "value" , random )
        grid.appendChild(create)
        
        let card = document.createElement("div")
        card.setAttribute("class" , "cards")
        card.setAttribute("id" , `card${i}`)
        const img = document.createElement("img")
        if( random == 0 ) img.src = "https://logowik.com/content/uploads/images/king33645.logowik.com.webp"
        if( random == 1 ) img.src = "https://cdn.dribbble.com/userupload/10367118/file/original-627d4d26957b94399e5b02fe95b34dcd.jpg"
        if( random == 2 ) img.src = "https://t3.ftcdn.net/jpg/01/96/57/98/360_F_196579818_qyxFSIuWUPsuC9mUo6HjuVGmdnpTlHuS.jpg"
        if( random == 3 ) img.src = "https://i.pinimg.com/originals/c5/19/39/c5193937db0f1e2bf813d6c4d1c28f09.jpg"
        if( random == 4 ) img.src = "https://static.vecteezy.com/system/resources/previews/007/165/335/non_2x/butterfly-icons-butterfly-icon-design-illustration-butterfly-icon-simple-sign-butterfly-icon-isolated-on-white-background-from-landscaping-equipment-collection-free-vector.jpg"
        card.appendChild(img)
        create.appendChild(card)
    }
    
    const allBoxes = document.querySelectorAll(".boxes")
    allBoxes.forEach( (each)=>{
        each.style.transform = "rotate3d(0,0,0 ,90deg)"
        each.childNodes[0].style.visibility= "visible"
        setTimeout( ()=>{
            each.childNodes[0].style.transform = "rotate3d(10,0,0 ,90deg)"
            each.childNodes[0].style.visibility= "hidden"
        } , 3000 )
        each.addEventListener( "click" , (e)=>{
            each.childNodes[0].style.transform = "rotate3d(0,0,0 ,90deg)"
            let element = document.querySelector(`#${e.target.id}`)
            if( e.target.id[1] != "r" ){
                element = element.parentElement
                element.childNodes[0].style.visibility= "hidden"
            }
            (myArr.includes(element.id)) ? "  " : myArr.push(element.id)
            each.setAttribute("disabled","")
            element.setAttribute("disabled","")
            element.style.transform = "rotate3d(0,10,0 ,90deg)"
            setTimeout( ()=>{
                element.style.transform = "rotate3d(0,0,0 ,90deg)"
            } , 500 )
            element.childNodes[0].style.visibility= "visible"
            
    
            if( myArr.length == 3 ){
                    let closeCard1 = parseInt(document.getElementById(`${myArr[0]}`).getAttribute("value"))
                    let closeCard2 = parseInt(document.getElementById(`${myArr[1]}`).getAttribute("value"))
                    let closeCard3 = parseInt(document.getElementById(`${myArr[2]}`).getAttribute("value"))
                    if( closeCard1 == closeCard2 && closeCard2 == closeCard3 && closeCard1 == closeCard3 ){
                        count = count+1
                        for( let i = 0 ; i < 3 ; i ++ ){
                            myArr.pop()
                        }
                        if( count == 3 ){
                            setInterval( ()=>{
                                count--
                                if( count == 0 ){
                                    window.location.reload()
                                }
                                document.querySelector(".user").textContent = null
                                document.querySelector(".instr").textContent = null
                                document.querySelector(".winText").textContent = "You Win the game"
                            } , 1000 )
                        }    
                    }
                    else{
                        setTimeout( ()=>{
                            for( let i = 0 ; i < 3 ; i++ ){
                                let closeCard = document.getElementById(`${myArr[i]}`)
                                closeCard.childNodes[0].setAttribute("abled","")
                                closeCard.style.transform = "rotate3d(0,0,0 ,90deg)"
                                closeCard.childNodes[0].style.visibility= "hidden"
                                closeCard.style.transform="rotate3d(0,10,0 ,90deg)"
                                setTimeout( ()=>{
                                    closeCard.style.transform = "rotate3d(0,0,0 ,90deg)"
                                    for( let i = 0 ; i < 3 ; i ++ ){
                                        myArr.pop()
                                    }    
                                } , 500 )
                            }
                        } , 1000 )
                    }
            }
        } )
    } )     
}