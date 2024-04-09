const mongoose = require('mongoose');

//schema
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    trailPeriod: {
        type: Number,
        default:3,

    },
    trailActive:{
        type: Boolean,
        required: false,
    },
    trailExpires:{
        type: Date,
    },
    subscription:{
        type: String,
        enum: ['Trail','Free','Basic','Premium']
    },
    apiRequestCount:{
        type: Number,
        default: 0,
    },
    monthlyRequestCount:{
        type: Number,
        default: 0,
    }, 
    nextBillingDate: Date,
    payments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
        }
    ],
    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "History",
        }
    ],
},
{
    timestamps: true,
}
);

//! compile to form the model
const User = mongoose.model('User', userSchema);

module.exports = User;
