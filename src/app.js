const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const e = require('express')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Karandeep Multani'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Karandeep Multani'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Karandeep Multani'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return console.log(error)
        }
        forecast(latitude, longitude, (error, forecastdata) => {
                  if(error){
                    return console.log(error)
                  }
                  
                  res.send({
                      forecast: forecastdata,
                      location,
                      address: req.query.address,
                      
                })
            
              })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Karandeep Multani',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Karandeep Multani',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

// const address = process.argv[2]
  
//   if(!address){
//     console.log('Provide an address!')
//   }else {
//   geocode(address, (error, {latitude, longitude, location}= {}) => {
//     if(error){
//       return console.log(error)
//     } 
   

//     forecast(latitude, longitude, (error, forecastdata) => {
//       if(error){
//         return console.log(error)
//       }
//       console.log(latitude, longitude, location)
//       console.log(forecastdata)
//     })
//   })
// }