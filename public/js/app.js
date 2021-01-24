console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#p1')
const messageTwo = document.querySelector('#p2')
const messageThree = document.querySelector('#p3')
const messageFour = document.querySelector('#p4')
const messageFive = document.querySelector('#p5')
const messageSix = document.querySelector('#p6')
const messageSeven = document.querySelector('#p7')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
      messageOne.textContent = "loading..."
      messageTwo.textContent = ''
      messageThree.textContent = ''
      messageFour.textContent = ''
      messageFive.textContent = ''
      messageSix.textContent = ''
      messageSeven.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent=data.error

            } else {
                messageOne.textContent = "the location is : " + data.address
                messageTwo.textContent = "the current temperature is : " + data.currentTemp
                messageThree.textContent = "the apparent temperature is : " + data.feelsLikeTemp
                messageFour.textContent = "the weather description is : " + data.weather_descriptions 
                messageFive.textContent = "the  wind speed is : " +  data.wind_speed 
                messageSix.textContent = "the humidity is : " + data.humidity 
                messageSeven.textContent = "is it day  ? : " +  data.is_day

            }
        })
    })
})