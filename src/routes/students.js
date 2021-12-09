const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../helpers/auth')
const passport = require('passport') 
const User = require('../models/User')


router.get('/students/signin-students', (req, res)=>{
    res.render('students/signin-students')
})


router.post('/students/signin-students', passport.authenticate('local', {
    successRedirect: '',
    failureRedirect: '/students/signin-students', 
    failureFlash: true
}))




router.get('/students/add', isAuthenticated, (req, res)=>{
    res.render('students/new-students')
})
router.post('/students/new-students', isAuthenticated, async(req, res)=>{
    const { name, email, password, confirm_password } = req.body
    const errors = []

    if(name.length == 0 || email.length == 0 || password.length == 0 || confirm_password.length == 0){
        errors.push({text: 'Please Complete All the fields'})
    }
    if(password !== confirm_password){
        errors.push({text: 'Password do not match'})
    }
    if(password.length < 4){
        errors.push({text: 'Password must be at least 4 characters'})
    }
    if(errors.length>0){
        res.render('students/new-students', {errors, name, email, password, confirm_password})
    } else {
        const emailExist = await User.findOne({email: email})

        if(emailExist){
            req.flash('error_msg', 'The Email exist')
            errors.push({text: 'The Email exist'})
        }

        const newUser = new User({ 
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        newUser.password = await newUser.encryptPassword(password)
        newUser.save()

        req.flash('success_msg', 'You are registered')
        res.redirect('/students')
    }
})
// router.post('/students/new-students', isAuthenticated, async(req, res)=>{
//     const { name, email, password } = req.body
//     const errors = []

//     if(name === '' || email === ''|| password === ''){
//         errors.push({text: 'please write name or email'})
//         res.render('students/new-students', {
//             errors,
//             name,
//             email,
//             password
//         })
//     } else {
//         const newStudent = new Student({ 
//             name: req.body.name, 
//             email: req.body.email,
//             password:req.body.password
//         })
//         await newStudent.save()
//         req.flash('success_msg', 'student Added Succesfully')
//         res.redirect('/students')
//     }
// })



// 
router.get('/students', isAuthenticated, async(req, res)=>{
    await User.find().sort({date: 'desc'})
      .then(items => {
        const contexto = {
            users: items.map(user => {
                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    
                }
            })
        }
        res.render('students/all-students', { users: contexto.users }) 
      })     
})
router.get('/students/edit/:id', isAuthenticated, async(req, res)=>{
    const user = await User.findById(req.params.id)
    .then(data =>{
        return {
            name: data.name,
            email: data.email,
            password: data.password,
            _id: data._id
        }
    })

    res.render('students/edit-students', {user})
})

router.put('/students/edit-student/:id', isAuthenticated,  async(req, res) => {
    const { name, email,password } = req.body
    await User.findByIdAndUpdate(req.params.id, {name, email,password})
    req.flash('success_msg', 'student edited Succesfully')
    res.redirect('/students')
})

router.delete('/students/delete/:id', isAuthenticated, async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'student deleted Succesfully')
    res.redirect('/students')
})
module.exports = router