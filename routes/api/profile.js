const express = require('express'); 
const router = express.Router(); 
const auth = require('../../middleware/auth');

// import mongoose model 
const Profile = require('../../models/Profile');
const User  = require('../../models/User'); 
const {check,validationResult} = require('express-validator');



//@route  GET api/profile/me
//@desc   Gget current User's profile
//@access Private
router.get('/me',auth, async (req,res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user',
        ['name', 'avatar']); 
        
        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'}); 
        }
        res.json(profile); 
    
    }catch(err){
        console.log(err);
        res.status(500).send('Server error'); 
    }


}); 


//@route Post api/Profile 
// @desc Create or update user profile
// @access Private 
 router.post('/' ,[ auth ,
    [
     check('status', 'Status is required').not().isEmpty(),
     check('skills', 'Skills is required').not().isEmpty()
    ]
], async (req,res)=> {
    // Deal with the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    //
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
      } = req.body;

      // Build Profile object
      const profileFields = {};
      profileFields.user = req.user.id;
      if(company){ profileFields.company = company;}
      if(website){ profileFields.website = website;}
      if(location){ profileFields.location = location;}
      if(bio){ profileFields.bio= bio; }
      if(status){ profileFields.status = status;}
      if(githubusername){ profileFields.githubusername = githubusername;}
      if(skills){
          // Using trim to remove space from the string
          profileFields.skills = skills.split(',').map((skill) => skill.trim());
      }

      // Build social Object
      // initialize the social object
      profileFields.social = {};
      if(youtube){ profileFields.social.youtube = youtube;}
      if(twitter){ profileFields.social. twitter =  twitter;}
      if(facebook){ profileFields.social.facebook = facebook;}
      if(linkedin){ profileFields.social.linkedin = linkedin;}
      if(instagram){ profileFields.social.instagram = instagram;}

      try{

        let profile = await Profile.findOne({user: req.user.id}); 
        // Update the existing profile
        if(profile){
            // update
            profile = await Profile.findOneAndUpdate(
            {user: req.user.id}, 
            {$set: profileFields},
            {new: true}); 

            return res.json(profile); 

        }

        // Create the profile 
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile); 

      }catch(err){
          console.error(err.message);
          res.status(500).send('Server error'); 
      }

      console.log(profileFields.skills);
      res.send('hello'); 
})




//@route  GET api/profile/
//@desc   Gget All profile
//@access Public 
router.get('/' , async (req,res) =>{
    try{
        const profiles = await Profile.find().populate('user', ['name','avatar']); 
        res.json(profiles); 

    }catch(error){

        consol.log(error.message);
        res.status(500).send('Server error'); 


    }

})


//@route  GET api/profile/user/user_id
//@desc   Get profile by user ID 
//@access Public 
router.get('/user/:user_id' , async (req,res) =>{
    try{
        
        const profiles = await Profile.findOne({user: req.params.user_id}).populate('user', ['name','avatar']); 
        
        
        // if there is no profile for the user
        if(!profiles){
            return res.status(400).json({msg: 'Profile not found !'}); 
        }

        res.json(profiles);

    }catch(error){

        console.log(error.message);

        //To check if the user_id is in id format
        if(error.kind === 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found !'});
        }
        res.status(500).send('Server error'); 


    }

})



//@route Delete api/profile/
//@desc  Delete profile, user & post
//@access Private
router.delete('/' , auth , async (req,res) =>{
    try{

        // @to do later remove users posts
        
        // remove the profile (remove the profile and User at the same time)
        await Profile.findOneAndRemove({user: req.user.id}); 

        // remove the user 
        await User.findOneAndRemove({ _id: req.user.id }); 
    
        res.json({msg: 'User deleted'}); 
    }catch(error){
        consol.log(error.message);
        res.status(500).send('Server error'); 
    }

})

// @route PUT  api/profile/experience
// @desc  Add Profile experience
// @access Private
router.put('/experience',[auth,
    [
     check('title' ,'Title is required').not().isEmpty(),
     check('company' ,'Company is required').not().isEmpty(),
     check('from' ,'From date is required').not().isEmpty(),    
    ]
  ], async (req,res) =>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}); 
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body; 

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try{
        const profile = await Profile.findOne({user: req.user.id}); 
        // To put elements in the front.
        profile.experience.unshift(newExp); 
        await profile.save(); 
        res.json(profile); 
        
    }catch(err){
        console.error(err.message);
        return res.status(500).send('Server Error');  
    }


})





// @route Delete api/profile/experience/:exp_id
// @desc  Delete experience from profile
// @access Private
router.delete('/experience/:exp_id', auth, async(req,res)=>{
    try{
        const profile = await Profile.findOne({user: req.user.id}); 
        
        // Get remove index 
        const removeIndex = profile.experience.map(element => element.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex,1); 

        //save the profile 
        await profile.save(); 

        res.json(profile); 
        

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }





})


module.exports  = router; 
