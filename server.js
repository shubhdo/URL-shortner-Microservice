const express = require('express');
const mongoose= require('mongoose');
const body_parser = require('body-parser');

const URL = require('./models/URL');
const app = express();

let port = process.env.PORT || 3000
app.use(body_parser.json());


let url = 'mongodb://localhost:27017/url';
mongoose.connect(url, {
    useMongoClient: true
});

app.get('/new/*', (req, res) => {
    const url = req.params['0']
    console.log(url)
    URL.findOne({url: url}, (error, success) => {
        if (error) {
            console.log(error);
            res.status(400).send({"error": error})
        }
        else {
            console.log(success);
            if (success) {
                res.status(200).send({
                    responseMessage: "URL is alredy added",
                    response: success
                })
            }
            else {
                new URL({
                    url:url,
                }).save(function (failed,saved) {
                    if (failed) {
                        console.log(failed);
                        res.status(400).send({"error": failed})
                    }
                    else {
                        res.status(200).send({
                            responseMessage: "URL is Shortned",
                            response: saved
                        })
                    }
                })



            }
        }
    })

})


app.get('/:short_url',(req,res)=> {
    let short_url=req.params.short_url;
    console.log(short_url)
    URL.findOne({short_url:short_url},(error,found)=> {
        if (error) {
            console.log(error);
            res.status(400).send({"error": error})
        }
        else {
            console.log(found)
            if (found) {
                res.redirect(found.url)
            }
            else {
                res.status(400).send({
                    response:"No URL found"
                })
            }
        }
    })
})


app.listen(port, () => {
    console.log("listening on port " + port)
})