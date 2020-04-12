const express = require('express')
const app = express()
const hospital = require('./routes/hospital')
const handlebars = require('express-handlebars')
const path = require('path')

// Configurations
    // Handlebars
    app.engine('handlebars', handlebars({
        defaultLayout: 'main'
    }))
    app.set('view engine', 'handlebars')
    // Static Files
    app.use(express.static(path.join(__dirname, 'public')))
    
// Routes
app.use('/hospital', hospital)

app.get('/', (req, res) => {
    res.redirect('/hospital')
})


// Server
app.listen(2020, () => {
    console.log(`> Running server in port 2020`)
})