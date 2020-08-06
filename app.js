let express=require('express');
let path=require('path');
let solver=require('./sudokuSolver');

let app=express();


app.use(express.static(path.join(__dirname,'public')));


app.get('/',(req,res)=>{
    res.status(200);
    res.sendFile(path.join(__dirname,'public','index.html'));
})




app.get('/string',(req,res)=>{
    res.status(200);
    // console.log(req.query.board);
    res.json(solver(req.query.board));
})

app.listen(process.env.PORT || 8080,()=>{
    console.log('we are listening at port: 8080');
})