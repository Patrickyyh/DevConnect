const express = require('express'); 
const router = express.Router(); 
const {check,validationResult} = require('express-validator/check'); 

const gravatar = require('gravatar'); 
//Bring in the user model
const User = require('../../models/User'); 

const bcrypt = require('bcryptjs'); 


//@route  POST api/users
//@desc   Register the User
//@access Public 
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min: 6}),

],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const {name, email, password} = req.body; 
    
    try {
      // See if the user exists (find them by the email); 
        let user = await User.findOne({email});
        if(user){
           return res.status(400).json({errors: [{msg: 'User already exists'}]}); 
        }

      // Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        }); 

        // Create the new User instance
        /* Since we only  create an instance of the user, and we 
            still need to save in the data base , we also need to encrypt the password
            for the safe reason 
        */
        user = new User({
            name,
            email,
            avatar,
            password
        });


      //Encrypt password
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(password, salt); 
        await user.save()

      // Return Jsonwebtoken 
        res.send('User registered');
        
    }catch(err){
        // server reason 
        console.log(err.message);
        res.status(500).send('Server error'); 
    }

    




    res.send('User Route')
}); 

module.exports  = router; 
