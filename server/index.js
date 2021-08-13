import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app=express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use('/posts',postRoutes);
const CONNECTION_URL='mongodb+srv://new:@Freen1997@cluster0.jidwl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let port = process.env.PORT || 5000;
let a = 'aa';
 mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true,useUnifiedTopology: true}).then(()=>app.listen(port,()=>console.log('Server Running on Port :'+ port)))
 .catch((error)=> console.log(error.message));

 mongoose.set('useFindAndModify',false);
