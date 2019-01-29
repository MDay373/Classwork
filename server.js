// npm install express --save
// npm install hbs --save
// Express is for routing
const express = require("express")
const hbs = require('hbs');

const app = express();

app.set('view engine', hbs);

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));

function rando(){    
    return Math.random()*10 + 4;
}

hbs.registerHelper('ptag', (num, messagePassedIn)=>{
    var msg = '';
    for(let i=0; i < num; i++)
    {
        msg+=`<p>${messagePassedIn}</p>`;
    }

    return new hbs.handlebars.SafeString(msg);
})

//app.use(dateLogger)

function dateLogger(req, resp, next)
{
    let date = new Date();
    console.log(date + " New Connection made!");
    req.date = date;
    next();
}

app.get('/', dateLogger ,(req, res) =>{
    console.log("words " + req.date);
})

app.get('/form', (req,res) =>{
    res.render('form.hbs')
})

app.post('/results',(req, res) =>{
    res.render('results.hbs',{
        number:req.body.MyForm
        })
})

app.use((req,res,next)=>{
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.render('error.hbs', {
        message: `${error.status} ${error.message}`,
        num: rando()
    });
});

//app.get('*', (req, res)=>{
 //   res.render("error.hbs");
//})

app.listen(3000, () =>{
    console.log("Server is running on Port:3000");
})
