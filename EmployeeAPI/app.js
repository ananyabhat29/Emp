const fs = require("fs");
const express = require('express');

const app = express();
app.use(express.json);


const emp = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));


app.get("/api/v1/employees", (req, res)=>{
    // res.status(200).json({
    //     status:"success",
    //     results: emp.length,
    //     data:{
    //         employees: emp
    //     }
    // });
    console.log("Hello from the server!");
});

app.post("/api/v1/employees", (req, res)=>{
    console.log(req.body);
    res.send("Done");
})

const port = 3000;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
}) 