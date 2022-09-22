import express, { ErrorRequestHandler } from "express";
import createHttpError from "http-errors";
const app = express();

app.get("/", (req, res)=>{
    res.json({
        message:"Hiiiiii",
        new:"This is new message."
    })
});
app.use(()=>{
    throw createHttpError(404, "Route not found.")
})
const errorHandler:ErrorRequestHandler = (err, req, res, next)=>{
    console.log(err.message, err.statusCode);
    if(err.headersSent){
        return next(err);
    }
    res.status(err.statusCode || 500)
    .json({message:err.message || "An Unknown Error."})
}
app.use(errorHandler)

app.listen(9000, ()=>{
    console.log("Server Started on Port 9000");
})