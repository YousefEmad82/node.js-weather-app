console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#p1')
const messageTwo = document.querySelector('#p2')
const messageThree = document.querySelector('#p3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
      messageOne.textContent = "loading..."
      messageTwo.textContent = ''
      messageThree.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent=data.error

            } else {
                messageOne.textContent = "the location is : " + data.address
                messageTwo.textContent = "the current temperature is : " + data.currentTemp
                messageThree.textContent = "the apparent temperature is : " + data.feelsLikeTemp

            }
        })
    })
})