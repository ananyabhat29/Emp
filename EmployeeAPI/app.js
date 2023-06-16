const fs = require("fs");
const express = require('express');

const app = express();
app.use(express.json()).add;


let emps = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));



//GET ALL EMPLOYEES
app.get("/api/v1/employees", (req, res)=>{
    res.status(200).json({
        status:"success",
        results: emps.length,
        data:{
            employees: emps
        }
    });
    
});



//GET EMPLOYEE
app.get("/api/v1/employees/:id", (req, res)=>{
   
    
    const id = req.params.id * 1;
    if (id > emps.length){
        return res.status(404).json({
            status:"fail",
            message:"Invalid ID"
        });
    }

    const emp = emps.find(el =>el.id === id);
    res.status(200).json({
        status:"success",
        data:{
            employees: emp
        }
    });
});



//CREATE NEW EMPLOYEE
app.post("/api/v1/employees", (req, res)=>{
    const newId = emps[emps.length-1].id + 1;
    const newEmp = Object.assign({id: newId}, req.body);

    emps.push(newEmp);
    fs.writeFile(`${__dirname}/data.json`, JSON.stringify(emps), err=>{
        res.status(201).json({
            status:"success",
            data:{
                employees: newEmp
            }
        });
    });
});



//UPDATE EMPLOYEE
app.patch("/api/v1/employees/:id", (req, res)=>{
    
    const id = req.params.id * 1;
    if (id > emps.length){
        return res.status(404).json({
            status:"fail",
            message:"Invalid ID"
        });
    }

    const emp = emps.find(el =>el.id === id);
    if (emp){
        idx = emps.indexOf(emp);
        for (const key in req.body){
            emps[idx][key] = req.body[key];
        }
        
    }

    fs.writeFile(`${__dirname}/data.json`, JSON.stringify(emps), err=>{
        res.status(200).json({
            status:"success",
            data:
            {
                employees:emp
            }
        });
    });
    
});



//DELETE EMPLOYEE
app.delete("/api/v1/employees/:id", (req, res)=>{

    const id = req.params.id * 1;
    if (id > emps.length){
        return res.status(404).json({
            status:"fail",
            message:"Invalid ID"
        });
    }

    const emp = emps.find(el =>el.id === id);
    if(emp){
        idx = emps.indexOf(emp);
        delete emps[idx];
    }
    emps = emps.filter(ele =>{
        return ele!=null  && ele!=undefined
    });

    fs.writeFile(`${__dirname}/data.json`, JSON.stringify(emps), err=>{
        res.status(201).json({
            status:"success",
            data:null
        });
    });

});



const port = 3000;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
}) 