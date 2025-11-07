function getId(a){
    return document.getElementById(a)
}

async function time() 
{
    numToWord = ["ZERO","ONE","TWO","THREE","FOUR","FIVE","SIX","SEVEN","EIGHT","NINE","TEN","ELEVEN","TWELVE","THIRTEEN","FOURTEEN","FIFTEEN","SIXTEEN","SEVENTEEN","EIGHTEEN","NINETEEN","TWENTY","TWENTY ONE","TWENTY TWO","TWENTY THREE","TWENTY FOUR","TWENTY FIVE","TWENTY SIX","TWENTY SEVEN","TWENTY EIGHT","TWENTY NINE","THIRTY","THIRTY ONE","THIRTY TWO","THIRTY THREE","THIRTY FOUR","THIRTY FIVE","THIRTY SIX","THIRTY SEVEN","THIRTY EIGHT","THIRTY NINE","FORTY","FORTY ONE","FORTY TWO","FORTY THREE","FORTY FOUR","FORTY FIVE","FORTY SIX","FORTY SEVEN","FORTY EIGHT","FORTY NINE","FIFTY","FIFTY ONE","FIFTY TWO","FIFTY THREE","FIFTY FOUR","FIFTY FIVE","FIFTY SIX","FIFTY SEVEN","FIFTY EIGHT","FIFTY NINE"]
    while (true){
        const today = new Date();
        let hour = twelveHour(today.getHours());
        let minute = today.getMinutes();
        getId("hour").innerHTML = numToWord[parseInt(hour)];
        getId("min").innerHTML = numToWord[parseInt(minute)];
        await delay(1000);
    }
}

function delay(time) 
{
    return new Promise(resolve => setTimeout(resolve, time));
}


function twelveHour(a){ // a is 0-23
    if (a === 0) {        // Midnight
        return 12;
    } else if (a > 12) {  // 1 PM (13) to 11 PM (23)
        return a - 12;
    } else {              // 1 AM (1) to 12 PM (12)
        return a;
    }
}

function wordDay(int) {
    switch (int) {
        case 0: return "SUN";
        case 1: return "MON";
        case 2: return "TUE";
        case 3: return "WED";
        case 4: return "THU";
        case 5: return "FRI";
        case 6: return "SAT";
    }
}

function date()
{
    const today = new Date();
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    let day = today.getUTCDate();
    let month = months[today.getMonth()];
    getId("month").innerHTML = month.toUpperCase();
    getId("monthDay").innerHTML = ("+" + day).slice(-3);
    getId("day").innerHTML = wordDay(today.getDay())
}

function welcomeMessage() {
    var today = new Date();
    var h = today.getHours(); // <-- Removed the "+ 1"
    var userName = "Adib";
    var message = String();

    // h is 0 (midnight) to 23 (11 PM)
    if (h >= 5 && h < 12) {         // 5:00 AM - 11:59 AM
        message = "Good Morning, ";
    } else if (h >= 12 && h < 18) { // 12:00 PM - 5:59 PM
        message = "Good Afternoon, ";
    } else if (h >= 18 && h < 22) { // 6:00 PM - 9:59 PM
        message = "Good Evening, ";
    } else {                        // 10:00 PM - 4:59 AM
        message = "Go to sleep, ";
    }

    message = message + "<span class='name'>" + userName + "</span>";
    document.getElementById("welcome").innerHTML = message;
}

function weatherBalloon( cityID ) {
    var key = '4d8fb5b93d4af21d66a2948710284366';
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)  
    .then(function(resp) { return resp.json() })
    .then(function(data) {
        let celcius = Math.round(parseFloat(data.main.temp)-273.15);
        
        // Use the specific IDs from your HTML
               getId("weather").innerHTML = "Todays weather in " + data.name + " is " + data.weather[0].description + " with a temp of " + celcius + "&deg C"; 
    });
}

function main(){
    time();
    date();
    welcomeMessage()
    weatherBalloon(1185191)
}
