const express  =   require("express");
const morgan = require("morgan");


const app = express(); //this is a router on which we have our routes
//using middleware for request body
//middlewares can modify req,res obj. Mostly used for request
app.use(express.json()) //parse data from body


//creating our own middle ware
    //this one applies to each and every request since we don't apply any route unlike in route handlers
    app.use((req,res,next)=>{
        console.log("Hello from the middleware bro");
        next(); //without it req/res cycle will be stuck.
})

app.use((req,res,next)=>{
    req.requestTime= new Date().toISOString();
    next();
})

//THIRD-PARTY
app.use(morgan('dev')); //return 
//route handlers: middleware function only executed for certain routes  
const getAllTours = (req,res)=>{
    console.log(`Req time: ${req.requestTime}`);
    res.status(200).json({
        status:"success",
        results:tours.length,
        reqTime: req.requestTime,
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

//USER HANDLERS
const getAllUsers = (req,res)=>{
    res.status(500).json({
        status:'Internal Server Error',
        message:"not yet implemented"
    })
}
const getUser = (req,res)=>{
    res.status(500).json({
        status:'Internal Server Error',
        message:"not yet implemented"
    })
}
const createUser = (req,res)=>{
    res.status(500).json({
        status:'Internal Server Error',
        message:"not yet implemented"
    })
}
const updateUser = (req,res)=>{
    res.status(500).json({
        status:'Internal Server Error',
        message:"not yet implemented"
    })
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

//ROUTES

const tourRouter = express.Router(); //this is a middleware
 //this creates a sub-application for each resource
 //mounting a new router on a route
const userRouter = express.Router();


tourRouter.route("/")
    .get(getAllTours)
    .post(createTour)

tourRouter.route("/:id")
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

userRouter
    .route("/users")
    .get(getAllUsers)
    .post(createUser)

userRouter
    .route("/:id")
    .get(getUser)
    .patch(updateUser)

app.use('/api/v1/tours',tourRouter)
app.use('/api/v1/users',userRouter);

const port=3000;
app.listen(port,"127.0.0.1",()=>{
    console.log("App runnning......")
 }) 