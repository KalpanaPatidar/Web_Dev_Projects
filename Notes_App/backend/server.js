const express=require('express');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

const todoRoutes=require('./routes/todoRoutes');

app.use('/api/todos',todoRoutes);
app.get('/',(req,res)=>{
    res.send("Hello from backend");
})

app.listen(5000,()=>{
    console.log("server is listening at port 5000");
})



