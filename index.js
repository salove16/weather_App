let key ="eae36450b309591aecc5d13a5d0dc169"

// let array;
let cityname;

let iframe=document.querySelector("#gmap_canvas")


async function searchWeather(){
  
  cityname=document.querySelector("#cityName").value
  let res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}&units=metric`)
  let data=await res.json()
  
let lat=data.coord.lat;
let lon=data.coord.lon;
 let newres=await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,current,minutely,hourly&appid=${key}&units=metric`)
let newData=await newres.json()
// console.log(newData
console.log(newData.daily)
get7Weather(newData.daily)
displayWeather(newData.daily[0])
}




function displayWeather(data){
// console.log("data:",data)
var left=document.querySelector(".left")
left.textContent=""

// let right=document.querySelector(".right")

let div=document.createElement("div")
div.style.boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px";
let name=document.createElement("h3")
name.textContent=cityname;
let Icon = document.createElement("img")
Icon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)


let cloud;

let mintemp=document.createElement("h4")
mintemp.textContent=`Min-Temp:${data.temp.min} °C`
let maxtemp=document.createElement("h4")
maxtemp.textContent=`Max-Temp:${data.temp.max} °C`
var rise=new Date(data.sunrise*1000)
// rise=rise.toUTCString()

var set=new Date(data.sunset*1000)
// set=set.toUTCString();

let sunrise=document.createElement("h5")
sunrise.textContent=`Sunrise:${rise}`

let sunset=document.createElement("h5")
sunset.textContent=`Sunset:${set}`

let wind=document.createElement("h6")
wind.textContent=`Wind speed:${data.wind_speed}km/hr`
div.append(name,Icon,mintemp,maxtemp,sunrise,sunset,wind)
left.append(div)

iframe.src=`https://maps.google.com/maps?q=${cityname}&t=&z=13&ie=UTF8&iwloc=&output=embed`
right.append(iframe)
}

function get7Weather(data)//newdata.daily
{
  document.querySelector(".last").textContent=""

  // let n=document.querySelector(".last")
  // n.style.backgroundColor="black"
  data.map(function(el,index){

    if (index>0){
      let div=document.createElement("div")
      div.style.boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px";
     
      let a = el.dt
      let date = new Date(a * 1000)
      let refreh = date.toUTCString()
      let arr = refreh.split(",")
      
let day=document.createElement("h3")
day.textContent=arr[0]
let logo=document.createElement("img")
logo.setAttribute("src", `http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`)
let max=document.createElement("h4")
max.textContent=`${el.temp.max} °`


let min=document.createElement("h5")
min.textContent=`${el.temp.min} °`

div.append(day,logo,max,min)
document.querySelector(".last").append(div)

    }
    
  })

}






