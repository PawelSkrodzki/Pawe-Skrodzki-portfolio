const clockSpan = document.getElementById("time")
const dateSpan = document.getElementById("date")
const yearSpan = document.getElementById("year")

showTime = () =>{
    clockSpan.innerHTML = `${moment().format("h:mm")}`
    dateSpan.innerHTML = `${moment().format("DD.MM")}`
    yearSpan.innerHTML = `${moment().format("YYYY")}`
}
setInterval(showTime, 1000)

 var options = {
         animate: true,
         patternWidth: 100,
         patternHeight: 100,
         grainOpacity: 0.05,
         grainDensity: 1,
         grainWidth: 1,
         grainHeight: 1
 };


grained('#main', options);