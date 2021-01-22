const postmanRequest = require('postman-request')


const geoCode = (place,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(place)+'.json?access_token=pk.eyJ1IjoieW91c2VmZW1hZCIsImEiOiJja2syd2NocHQwMHluMndxbnc3enk2enVpIn0.w5jWsIqgmy6wS57_whQVCA'
    postmanRequest({url : url,json : true},(error,{body})=>{
      
        if(error){
            callback('can not access the geocode api',undefined)
        }
        

        else if(body.features.length  === 0 ){
            callback("can't find that address ",undefined)
        }
        else{
            const{features} = body
            callback(undefined,{
                latitude : features[0].center[1],
                longitude : features[0].center[0],
                placeName : features[0].place_name,
            })    
        }
    })
}


module.exports = geoCode