const express = require('express'); 
const router = express.Router(); 

// middleware to auth the token 
const auth  = require('../../middleware/auth');

const User = require('../../models/User'); 
const {check,validationResult} = require('express-validator'); 
const config = require('config'); 
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken'); 

//@route  GET api/auth
//@desc   Test rout  
//@access Public 
router.get('/',auth, async (req,res) => {
    try{
        
        
        const user = await User.findById(req.user.id).select('-password'); 
        res.json(user);

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server error'); 
    }
}); 



//@route  POST api/auth
//@desc   Authenticate User and get token 
//@access Public 
router.post('/',[
    check('email','Please include a valid email').isEmail(),
    check('password','Password is required').exists(),

],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const {email, password} = req.body; 
    
    try {
      // See if the user exists (find them by the email); 
        let user = await User.findOne({email});
        if(!user){
           return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]}); 
        }

        // makesure the password match 
        const isMatch = await bcrypt.compare(password, user.password); 

        if(!isMatch) {
            return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]}); 
        }

        // make the payload （id）
        const payload = {
          user: {
            id: user.id
          }
        }

        // Dealing with JWT
        jwt.sign(payload , config.get('jwtSecret'),{expiresIn: 3600} , (err, token)=>{
          if(err) throw err;
          res.json({token}); 
        });

        

      // Return Jsonwebtoken 
        // return res.send('User registered');
        
    }catch(err){
        // server reason 
        console.log(err.message);
        res.status(500).send('Server error'); 
    }

  
   
}); 









module.exports  = router; 
