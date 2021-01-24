const postmanRequest = require('postman-request')



const foreCast = (latitude,longitude,callback)=>{
    const url1 = 'http://api.weatherstack.com/current?access_key=681e54d9cfb559b8ecc63d436bffcec4&query=' + latitude + ',' + longitude
    postmanRequest( {url : url1, json : true},(error,{body})=>{      //setting the jason parameter to true ---->it  parses the body to a javascript object
       
       
        if(error){
            callback('can not access the weatherstack api',undefined)
        }
        else if(body.error){
            callback('please enter the right location ',undefined)
        }
        else{
            const{current} = body
            const{temperature  ,feelslike,weather_descriptions,wind_speed,humidity,is_day  } = current 
       
         callback(undefined, {
             currentTemp : temperature,  
             feelsLikeTemp : feelslike ,
             weather_descriptions : weather_descriptions[0],
             wind_speed : wind_speed,
             humidity : humidity,
             is_day : is_day,

         })
     }
     

    })
}


module.exports =  foreCast


