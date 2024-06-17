 const testController=(req,res)=>{
    const {name}=req.body;
    res.send(`Hello ${name}`).status(200);
}
module.exports={testController};