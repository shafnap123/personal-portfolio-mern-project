import { contactmodel } from "../model/contactmodel";


export const formfill = async (req, res) => {
  
    try {
        const { name, email, message } = req.body;

        await contactmodel.insertOne({
            name,
            email,
            message
        })


        console.log("user created succcesfully")
        res.json({ data: req.body });
    }
    catch (error) {
        console.log("error", error)
        res.json({ error: error.message });
    }
}