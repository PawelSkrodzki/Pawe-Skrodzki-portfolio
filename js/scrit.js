const clockSpan = document.getElementById("time")
const dateSpan = document.getElementById("date")
const yearSpan = document.getElementById("year")

showTime = () =>{
    clockSpan.innerHTML = `${moment().format("h:mm")}`
    dateSpan.innerHTML = `${moment().format("DD.MM")}`
    yearSpan.innerHTML = `${moment().format("YYYY")}`
}
setInterval(showTime, 1000)