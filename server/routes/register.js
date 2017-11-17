var express=require('express');
var router=express.Router();
var user=require('../model/user.js');
var jwt=require('jsonwebtoken');

router.post('/signup',function(req,res){




console.log("value pf password "+ req.body.password);

var user1=new user();
user1.Email=req.body.email,
user1.Password=user1.generateHash(req.body.password),
user1.Name=req.body.name,
user1.MobileNo=req.body.phone,
user1.Usertype=req.body.type,
user1.Address=req.body.address

user1.save(function(err){

if(err)
{
  
  res.json(err);
}
else {
  res.json({
    success:true
  });
  console.log('singup api calleds');
}

})

});
router.post('/login',function(req,res){
console.log(req.body);
user.findOne({Email:req.body.email},
function(err,data)
{
  if(err)
  {
    res.json({
      emailinvalid:true
    });
    console.log("error coming");
  }
  else if(data.validPassword(req.body.password)){
    var token=jwt.sign(data,"thisismykey",{
      expiresIn: 1400
    });

    res.json({
      success:true,
      token:token,
      isLoggedIn: true,
      udata:data
    });
    console.log(token);
    console.log("token created");
    console.log(data);
  }
  else
  {
      res.json({invalid:true})
    console.log("invalid user123");
  }
}
)

});


router.get('/singup/:email', function (req, res) {
  console.log("REACHED GET DATA ON SERVER");

  user.findOne({Email:req.params.email},
  function(err,docs)
  {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
     console.log(docs);
  });


});

var user12=new user();
//user12.Password=user

router.put('/signup/:data', function (req, res) {
  console.log("enter in put"+req.body.npassword);

  user.update({Email:req.params.data},{$set:{Password:user12.generateHash(req.body.npassword)}}, function (err, docs) {
    if (err)
    {
        res.json(err);console.log('Error at get ' + err);
    }

    else
    {
     res.json(docs);
     }
    //  console.log(docs);
  });
});



router.delete('/singup/:id', function (req, res) {
  //console.log("REACHED GET DATA ON SERVER");
  user.remove({Email:req.params.id}, function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
    //  console.log(docs);
  });
});



module.exports = router;
