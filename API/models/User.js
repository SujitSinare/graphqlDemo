import mongoose from 'mongoose'

export const User = mongoose.model('User', 
{
    fname: String,
    lname: String,
    phone: String,
    email: String
})
