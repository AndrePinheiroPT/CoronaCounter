const express = require('express')
const app = express()
const hospital = require('./routes/hospital')

// Routes
app.use('/hospital', hospital)

app.get('/', (req, res) => {
    res.redirect('/hospital/newcase')
})


// Server
app.listen(2020, () => {
    console.log(`> Running server in port 2020`)
})