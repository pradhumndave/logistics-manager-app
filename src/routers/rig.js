const router = require('express').Router();
const RigDataSchema = require('../models/rig')
const ObjectID = require('mongodb').ObjectId

// Rig Home page where all requests are shown 
router.get('/rig/home', async (req, res)=>{
    
    try {
        const allRequests = await RigDataSchema.find({})
        res.render('current_request', {
            data: allRequests
        })
    } catch (error) {
        console.log(error)
    }

})

// Rig Single request
router.get('/rig/single/:id', async (req, res)=>{
    const _id =req.params.id

    try {
        const singleRequest = await RigDataSchema.findById(_id)
        console.log(singleRequest)
        res.render('rig_single_request', {
            data: singleRequest
        })
    } catch (error) {
        
    }
})

router.post('/rig/create', async (req, res)=>{
    const data = new RigDataSchema({
        ...req.body
    })

    try {
        const alreadyExists = await RigDataSchema.find({
            sectionName: data.sectionName
        })
        if(alreadyExists.length==0){
            res.setHeader("Access-Control-Allow-Origin", "*");
            await data.save()
            res.status(201).send(data)
            console.log("Added Data")
        } else{
            res.send("Request to this section already been made")
        }

        
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/rig/createpage', async (req, res)=>{
    res.render('create_request')
})


// BASE ROUTES
router.get('/', async (req, res)=>{
    res.render('home')
})

router.get('/base/home', async (req, res)=>{
    try {
        const allRequests = await RigDataSchema.find({})
        res.render('base_home', {
            data: allRequests
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/base/single/:id', async (req, res)=>{
    const _id =req.params.id

    try {
        const singleRequest = await RigDataSchema.findById(_id)
        res.render('base_single_request', {
            data: singleRequest
        })
    } catch (error) {
        
    }
})

router.patch('/base/update/:id', async (req, res)=>{
    let sectionID = req.params.id
    // console.log(toolToBeUpdated, "Clicked")
    console.log(req.body)

    try {
        
    const sectionToBeUpdated = await RigDataSchema.findById({ _id: sectionID})
    let newToolsList = sectionToBeUpdated.toolsList.map(tool=>{
        const id = new ObjectID(tool._id).toString()
        if(req.body.checkedValue.includes(id)){
            tool.sentDate=req.body.sentDate
            tool.sentFromShore=true
            return tool
        }
        return tool
    })
    sectionToBeUpdated.toolsList = newToolsList
    await sectionToBeUpdated.save()
    res.send(sectionToBeUpdated)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;