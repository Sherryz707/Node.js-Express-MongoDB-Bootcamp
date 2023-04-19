const express  =   require("express");
const fs = require("fs");


const app = express();
//using middleware for request body
app.use(express.json())

//route handlers
const getAllTours = (req,res)=>{
    res.status(200).json({
        status:"success",
        results:tours.length,
        data:{
            tours:tours
        }
     })
}
const createTour = (req,res)=>{
    const newId = tours[tours.length-1].id+1;
    const newTour = Object.assign({id:newId},req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
            status:"success",
            data:{
                tour:newTour
            }
        })
    });
    //console.log(req.body); checking middleware
    //res.send("Done"); cannot set set headers after they're sent to the client: cannot send two responses.
}
const getTour = (req,res)=>{
    console.log(req.params);
    const id = req.params.id*1;

    //if(!tour)
    if(id>tours.length-1){
        res.status(404).json({
            status:"fail",
            message:"inavlid id"
        });
    }
    else{
        const tour = tours.find(el=>el.id === id);
        res.status(200).json({
            status:"success",
            data:{
                tour:tour
            }
        });
    }
}
const updateTour = (req,res)=>{
    if(req.params.id*1>tours.length-1){
        res.status(202).json({
            status:"fail",
            message:"invalid id 😒"
        })
    }
    else{
        res.status(200).json({
            status:"success",
            tour:"updated tour here bro 👍"
        })
    }
}
const deleteTour = (req,res)=>{
    if(req.params.id*1>tours.length-1){
        res.status(202).json({
            status:"fail",
            message:"invalid id 😒"
        })
    }
    else{
        res.status(204).json({
            status:"success",
            data:null
        })
    }
}
// //GET
//     //getting data of tours.json(JSON object) using top-level code
//     //JSON.parse -> JS object array
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//     //resource -> tours
// app.get("/api/v1/tours",getAllTours);


// //POST: send data from client to server. available on req.
//     //express foes not give req body. we need middleware -> express.json()
//     //save data in file
//     //201->created
// app.post("/api/v1/tours",createTour);

// //Params:Have tp specify as many var in url unless we do this: /:y?
// app.get("/api/v1/tours/:id",getTour);

// app.patch("/api/v1/tours/:id",updateTour)

// //status is 204 meaning we aren't sending any content so data is null
// app.delete("/api/v1/tours/:id",deleteTour);



//REFACTOR no.2==================================================================================================================================
app.route("/api/v1/tours")
    .get(getAllTours)
    .post(createTour)

app.route("api/v1/tours/:id")
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)


const port=3000;
app.listen(port,"127.0.0.1",()=>{
    console.log("App runnning......")
 })