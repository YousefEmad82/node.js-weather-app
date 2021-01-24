const express = require('express')       //npm module
const path = require('path')     //node js module
const hbs = require('hbs')       // requiring handlebars npm module
const app = express()     //express is treated as a function 
const port = process.env.PORT || 3000


const postmanRequest = require('postman-request')
const geoCode = require('./utitlities/geoCode.js')
const foreCast = require('./utitlities/foreCast.js')




//handlebars is a npm module    node i hbs
const publicPath = path.join(__dirname,"../public")           //it contains all the static files
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handlebars and vies location 
app.set('view engine','hbs')   //used to set the  vie engine and the hbs files for dynamic templates using "handlebar"
app.set('views',viewsPath)    //to set the path of the folder which contains the templates using "hanldlebar"
hbs.registerPartials(partialsPath)



//setup static directory to serve
app.use(express.static(publicPath))    //to set the directory of the folder that contains the static  files of html,css,photos,js.... etc
//if you want to use a file from the public folder to appear in the browser then type that url : "localhost:3000/filename.html"


/////////////////////////////////////////////////////////////
/////////////////     ROUTING     //////////////////////////
////////////////////////////////////////////////////////////

app.get('',(req,res)=>{
    res.render('index',{           //res.render takes 2 attributes the first one is the name of the hbs file ,the other one is the object that contain the dynamic text used in the html file (optional)
        title : 'Weather',
        name : 'Yousef Emad'
    })
})



app.get('/about',(req,res)=>{
    res.render('about',{
        title : "About Me",
        name : 'Yousef Emad'
    })
})
app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send('please check that there is a valid address ')
    }
    
    geoCode(req.query.address, (error, geoData) => {
        
        if (error) {
            return res.send({
                error : error
            });
        }
        const{latitude,longitude, placeName } = geoData
        foreCast(latitude, longitude, (error, froecastData) => {
            const{currentTemp,feelsLikeTemp, weather_descriptions,wind_speed,humidity,is_day } = froecastData
            if (error) {
                return res.send({
                    error : error
                })
            }
            res.send({
                address : placeName,
                currentTemp :  currentTemp,
                feelsLikeTemp :   feelsLikeTemp,
                weather_descriptions : weather_descriptions,
                wind_speed : wind_speed,
                humidity : humidity,
                is_day : is_day,
            })
           
        })
    })


    
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        helpText : 'this is  some help ',
        name : 'Yousef Emad'

    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage : 'help article is not found',
        name : 'yousef emad' ,
        title : '404'

    })
})

app.get('*',(req,res)=>{   // '*' means if the route in the url in the browser didnt match any of the public folder or any of the routs up there, then do that function 
    res.render('404',{

            errorMessage : 'page not found',
            name : 'yousef emad' ,
            title : '404'           
        })

})


/////////////////////////////////////////////////////////////
/////////////////    RUNNING THE SERVER     /////////////////
////////////////////////////////////////////////////////////


app.listen(port,()=>{

    console.log('server is runing sucessfully on port ' + port )
})