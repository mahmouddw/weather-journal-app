/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=cda5aeadfe9ec283590ebb7fc7de0461&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Create event listener on click on generate button to perform action
document.getElementById('generate').addEventListener('click', performAction);

// performAction to Acquire API credentials from OpenWeatherMap
function performAction(e){
// user input zipCode and his feeling
const zipCode = document.getElementById('zip').value;
const feeling = document.getElementById('feelings').value;
getWeather(baseURL,zipCode, apiKey)
.then(function(data){
	console.log(data);
	//specify only the temperature from the entire object API , variable newDate , user input feeling.
	postData('/addData', {Temperature:data.main.temp, Date:newDate, Feeling:feeling});
	updateUI()
})
}

// Callback function GET Route - Fetch API
const getWeather = async (baseURL, zipInput, key)=>{

  const res = await fetch(baseURL+zipInput+key)
  try {
    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

// Callback function POST Route to send data to the app endpoint
const postData = async ( url = '', data = {})=>{

      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }


// Callback function GET Route to update the UI dynamically
const updateUI = async () => {
  const request = await fetch('/getData');
  try{
    const appData = await request.json();
	console.log(appData);
    document.getElementById('temp').innerHTML = `Temperature Is: ${appData.Temperature} °C`;
    document.getElementById('date').innerHTML = `Date Is: ${appData.Date}`;
    document.getElementById('content').innerHTML = `Your Feeling Is: ${appData.Feeling}`;

  }catch(error){
    console.log("error", error);
  }
}