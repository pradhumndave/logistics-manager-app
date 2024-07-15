const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ddave2001:7GNeGhlADuvhUzWK@rig-data.q1iom11.mongodb.net/?retryWrites=true&w=majority&appName=rig-data').then(()=>{
    console.log('connected to database')
})
