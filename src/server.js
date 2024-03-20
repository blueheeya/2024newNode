const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const {User} = require("./models/User")
const dotenv = require("dotenv");

dotenv.config();

const server = async function(){
    // const users = []
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB 연결 완료");
        app.use(express.json());

        app.get("/user", async function(req,res){
            try {
                const users = await User.find({})
                return res.send({users});
            } catch(error) {
                return res.status(500).send({error:error.message})
            }
        });
        app.get("/user/:userId",async function(req,res){
            try{
                const {userId} = req.params
                const user = await User.findOne({_id:userId});
                return res.send({user});
            } catch(error) {
                return res.status(500).send({error:error.message});
            }
        });
        app.post("/user", async function(req,res){
            try {
                const user = new User(req.body);
                await user.save();
                return res.send({user});
            } catch(error) {
                return res.status(500).send({error:error.message});
            }
            
        });

        app.delete("/user/:userId", async function(req,res){
            try{
                const {userId} = req.params;
                const user = await User.findByIdAndDelet({_id:userId});
                return res.send({user});
            } catch(error) {
                return res.status(500).send({error:error.message});
            }
        })
        app.put("/user/:userId", async function(req,res){
            try {
                let {age} = req.body;
                const {userId} = req.params;
                const user = await User.findByIdAndUpdate(
                    userID,
                    {$set : {age}},
                    {new:true}
                  );
                return res.send({user});
            } catch(error) {
                return res.status(500).send({error:error.message});
            }
        });

    app.listen(3000) //로컬 서버 포트 지정
    } catch (error) {
        // return res.send({error :error.massage})
        console.log("연결 안됨")
    }
}

server();