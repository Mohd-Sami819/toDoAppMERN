import e from 'express';
import { collectionName, connection } from './dbconfig.js';
import cors from 'cors';
import { ObjectId } from 'mongodb';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = e();
app.use(e.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());


app.post('/login', async (req, res) => {
    const userData = req.body;

    if (userData.email && userData.password) {
        const db = await connection();
        const collection = await db.collection('users');

        const result = await collection.findOne({email:userData.email.trim(),password:userData.password.trim()});
        console.log("Result from databases:",result);
        

        if (result) {
            jwt.sign(
                userData,
                'Google',
                { expiresIn: '5d' },
                (error, token) => {
                    res.send({
                        success:true,
                        msg: "Login Done",
                        token
                    })
                }
            );
        } else {
        res.send({
            success: false,
            msg: 'user not found',
        });
    } 
    } else{
        res.send({
            success:false,
            msg: "Login not done",
        })
    }
});

app.post("/signUp",async(req,res)=>{
    const userData = req.body;
    if (userData.email && userData.password) {
        const db = await connection();
        const collection = await db.collection('users');
        const result = await collection.insertOne(userData);
        if (result) {
            jwt.sign(userData, 'Google', {expiresIn: '5d'}, (error,token)=>{
                res.send({
                    success:true,
                    msg: "Signup done",
                    token
                })
            })
        } 
    }else{
        res.send({
            success:false,
            msg: "Signup not done"
        })
    }
})

app.post("/add-task",verifyJWTToken,async(req,res)=>{
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    // res.send("Working...")
    if (result) {
        res.json({
            message: "Task has been added successfully",
            success: true,
            result,
        })
    }else{
        res.json({
            message: "Task not added",
            success:  false,
        })
    }
})
app.get("/tasks", verifyJWTToken ,async(req,res)=>{
    const db = await connection();
    console.log("Cookies test",req.cookies['token']);
    const collection = await db.collection(collectionName);
    const result = await collection.find().toArray();
    if (result) {
        res.send({
            message: "Task fetched successfully",
            success: true,
            result,
        })
    }else{
        res.send({
            message: "No tasks found",
            success:  false,
        })
    }
})


app.put("/update-task",verifyJWTToken,async(req,res)=>{
    const db = await connection();
    const collection = await db.collection(collectionName);
    const {_id,...fields} =req.body;
    const update = {$set:fields}
    const result = await collection.updateOne({_id: new ObjectId(_id)},update);
    if (result) {
        res.send({
            message: "Task updated successfully",
            success: true,
            result,
        })
    }else{
        res.send({
            message: "No tasks found",
            success:  false,
        })
    }
})
app.get("/task/:id", verifyJWTToken, async(req,res)=>{
    const db = await connection();
    const id = req.params.id;
    const collection = await db.collection(collectionName);
    const result = await collection.findOne({_id: new ObjectId(id)});
    if (result) {
        res.send({
            message: "Task fetched successfully",
            success: true,
            result,
        })
    }else{
        res.send({
            message: "No tasks found",
            success:  false,
        })
    }
})
app.delete("/delete/:id", verifyJWTToken,async(req,res)=>{
    const db = await connection();
    const id = req.params.id;
    const collection = await db.collection(collectionName);
    const result = await collection.deleteOne({_id: new ObjectId(id)});
    if (result) {
        res.send({
            message: "Task Deleted successfully",
            success: true,
            result,
        })
    }else{
        res.send({
            message: "error try after some time",
            success:  false,
        })
    }
})
app.delete("/delete-multiple", verifyJWTToken,async(req,res)=>{
    const db = await connection();
    const Ids = req.body;
    const deleteTaskIds = Ids.map((item)=> new ObjectId(item));
    const collection = await db.collection(collectionName);
    const result = await collection.deleteMany({_id: {$in:deleteTaskIds}});
    if (true) {
        res.send({
            message: "Task Deleted successfully",
            success: result,
        })
    }else{
        res.send({
            message: "error try after some time",
            success:  false,
        })
    }
})

function verifyJWTToken(req,res,next){
    // console.log("VerifyJWTToken",req.cookies['token']);
    const token = req.cookies['token'];
    jwt.verify(token,"Google",(error,decoded)=>{
        if(error){
            return res.send({
               msg:"Invalid token",
               success:false
            })
        }
        next();
    })
}


app.listen(3000);