const mongoose = require('mongoose')
const validator = require('validator')

const rigDataSchema = new mongoose.Schema({
    sectionName:{
        type: String,
        required: true,
        trim: true
    },
    toolsList:[{
        toolName:{
            type: String,
            required: true,
            trim: true
        },
        quantity:{
            type: Number,
            required: true
        },
        unit:{
            type: String,
        },
        sentFromShore:{
            type: Boolean,
            required: true,
            default: false
        },
        sentDate:{
            type: Date
        }
    }],
    dateRequired:{
        type: Date,
        required: true
    },
    transitTime:{
        type: Number,
        required: true,
        default:1
    }
},{
        timestamps:true
    }
)

const RigDataSchema = mongoose.model('rigdata', rigDataSchema);

module.exports = RigDataSchema