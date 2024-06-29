
let cities = [
    {
        arabicName: "غزة",
        name: "PS-GAZ"
    },
    {
        arabicName: "اليمن",
        name: "YE"
    },
    {
        arabicName: "مكة",
        name: "SA"
    },
    {
        arabicName: "القاهرة",
        name: "EG-CAI"
    },
    {
        arabicName: "الرباط",
        name: "MA-RAB"
    },
    {
        arabicName: "الدوحة",
        name: "QA-DOH"
    },
    {
        arabicName: "عمان",
        name: "JO-AMM"
    },
    {
        arabicName: "بغداد",
        name: "IQ-BGW"
    },
    {
        arabicName: "دمشق",
        name: "SY-DAM"
    },
    {
        arabicName: "الرياض",
        name: "SA-RYD"
    }
];

for(let city of cities ){
    const content = `
    <option value="${city.arabicName}">${city.arabicName}</option>
    `
    document.getElementById("cityselcted").innerHTML += content
}


    document.getElementById("cityselcted").addEventListener("change", function() {
      document.getElementById("city-name").innerHTML =this.value
        let cityName = ""
        for(let city of cities ){
        if(city.arabicName === this.value ){
            cityName = city.name
        }
    }
    console.log("sd")
    getPrayersOfCity(cityName)
    });



function getPrayersOfCity(cityName){
    let params = {
        country: "PS",
        city: cityName //"PS-GAZ",
    }
    
    axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: params
      })
      .then(function (response) {
          // let fajer = 
        // document.getElementById("fajer-time").innerHTML= timings.Fajr
        const timings = response.data.data.timings
        fillTimeforpray("fajer-time",timings.Fajr)
        fillTimeforpray("shroq-time",timings.Sunrise)
        fillTimeforpray("doher-time",timings.Dhuhr)
        fillTimeforpray("aser-time",timings.Asr)
        fillTimeforpray("maghreb-time",timings.Maghrib)
        fillTimeforpray("asha-time",timings.Isha)
    
    
        const readableDate = response.data.data.date.readable;
        const weekDay = response.data.data.date.hijri.weekday.ar;
        
        const date =   weekDay + "" + readableDate
        document.getElementById("time-now").innerHTML = date
        // طباعة التاريخ القابل للقراءة للتحقق منه
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });  
}




function fillTimeforpray(id ,time){
    document.getElementById(id).innerHTML= time
}


