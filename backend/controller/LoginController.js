import usermodel from "../model/LoginModel.js";


export const usersignup = async (req, res) => {
    try {
        const { email, password } = req.body;
         const existingUser = await usermodel.findOne({ email });

    if (existingUser) {
      return res.json({ 
        success: false, 
        message: "Email already registered. Please login instead." 
      });
    }
        
        
      
        const existinguser = await usermodel.insertOne({
          email,
          password
        })
      
        console.log("user created succesfully")
        return res.json({ message: "user created succesful" })
    }
    catch (error) {
        console.log("failed to create user")
        return res.json({ message: "internal server error" })

    }
}


export const userlogin = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        console.log(req.body)
        const deatils = await usermodel.findOne({
               $and: [
                { email: email },
                { password: password }
            ]
            
        })
        console.log(deatils,'deatilsdeatilsdeatilsdeatilsdeatils')

        if (deatils !== null) {
            res.json({status:true,data:deatils})
           
        }
        else{
            res.json({status:false})
           
        }
       

    }

    catch (error) {
        console.log(error)

    }
}