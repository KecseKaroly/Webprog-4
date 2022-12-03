const express = require('express');
const fs = require('fs');
const app = express();
var cors = require('cors')
const bodyParser = require('body-parser');
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(cors());

// BOOKS

app.get('/books', (req, res) => {
    
    fs.readFile(`${__dirname}/books.json`,'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }
        const objectArr = JSON.parse(data);
        let resultArr = objectArr; 
        res.setHeader('Content-type', 'application/json');
        res.status(200);
        resultArr.sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
          });
        res.send(JSON.stringify(resultArr));
    });
});
app.get('/books/:bid', (req, res) => {
    fs.readFile(`${__dirname}/books.json`,'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }
        const konyvArr = JSON.parse(data);
        if(req.params.bid === undefined) {
            console.log("404");
            res.sendStatus(404);
            return;
        }

        for(let konyv of konyvArr) {
            if(konyv.id == req.params.bid) {
                res.status(200);
                res.setHeader('Content-type', 'application/json');
                res.send(JSON.stringify(konyv));
                return;
            }
        }
        res.sendStatus(400);
    });
});
app.delete('/books/:bid',(req, res) => {
    if(req.params.bid === undefined) {
        console.log("404");
        res.sendStatus(404);
        return;
    }
    fs.readFile(`${__dirname}/books.json`, 'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }

        let array = JSON.parse(data);
        let newArray = array.filter((value, index, arr) => {
            return value.id != req.params.bid;
        });
        if(array.length === newArray.length)
        {
            res.sendStatus(400);
            return;
        }
        fs.writeFile(`${__dirname}/books.json`, JSON.stringify(newArray), (error) => {
            if(error) 
            {
                res.sendStatus(500);
                return;
            }
            res.status(204);
            res.send(JSON.stringify(newArray));
        });
        
    });
});
app.put('/books/:bid', (req, res) => {
    if(req.body.id === undefined || req.body.title === undefined || req.body.author_id === undefined) {
        console.log("404");
        res.sendStatus(404);
        return;
    }
    fs.readFile(`${__dirname}/books.json`, 'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }
        let array = JSON.parse(data);
        let newArray = [];
        array.forEach(element => {
            if(element.id != req.body.id) {
                newArray.push(element);
            }
            else {
                let updatedElement = `{
                    "id": ${req.body.id},
                    "title": "${req.body.title}",
                    "author_id" : ${req.body.author_id}
                }`;
                newArray.push(JSON.parse(updatedElement));
            }
        });
        fs.writeFile(`${__dirname}/books.json`, JSON.stringify(newArray), (error) => {
            if(error) 
            {
                res.sendStatus(500);
                return;
            }
            res.status(200);
            res.send();
        });
    });
});
app.post('/books', (req, res) => {
    console.log("\n\n");
    if(req.body.id === undefined || req.body.title === undefined || req.body.author_id === undefined) {
        console.log("404");
        res.sendStatus(404);
        return;
    }
    fs.readFile(`${__dirname}/books.json`, 'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }
        let array = JSON.parse(data);
       
        let createdElement = `{
            "id": ${req.body.id},
            "title": "${req.body.title}",
            "author_id" : ${req.body.author_id}
        }`;
        array.push(JSON.parse(createdElement));
        fs.writeFile(`${__dirname}/books.json`, JSON.stringify(array), (error) => {
            if(error) 
            {
                res.sendStatus(500);
                return;
            }
            res.status(200);
            res.send();
        });
    });
});

// AUTHORS
app.get('/authors', (req, res) => {
    fs.readFile(`${__dirname}/authors.json`,'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }
        const objectArr = JSON.parse(data);
        let resultArr = objectArr; 
        res.setHeader('Content-type', 'application/json');
        res.status(200);
        resultArr.sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
          });
        res.send(JSON.stringify(resultArr));
    });
});
app.get('/authors/:aid', (req, res) => {
    fs.readFile(`${__dirname}/authors.json`,'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }
        const iroArr = JSON.parse(data);
        if(req.params.aid === undefined) {
            console.log("404");
            res.sendStatus(404);
            return;
        }

        for(let iro of iroArr) {
            if(iro.id == req.params.aid) {
                res.status(200);
                res.setHeader('Content-type', 'application/json');
                res.send(JSON.stringify(iro));
                return;
            }
        }
        res.sendStatus(400);
    });
});
app.delete('/authors/:aid',(req, res) => {
    if(req.params.aid === undefined) {
        console.log("404");
        res.sendStatus(404);
        return;
    }
    fs.readFile(`${__dirname}/authors.json`, 'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }

        let array = JSON.parse(data);
        let newArray = array.filter((value, index, arr) => {
            return value.id != req.params.aid;
        });
        if(array.length === newArray.length)
        {
            res.sendStatus(400);
            return;
        }
        fs.writeFile(`${__dirname}/authors.json`, JSON.stringify(newArray), (error) => {
            if(error) 
            {
                res.sendStatus(500);
                return;
            }
            res.status(204);
            res.send(JSON.stringify(newArray));
        });
        
    });
});
app.put('/authors/:aid', (req, res) => {
    if(req.body.id === undefined || req.body.name === undefined) {
        console.log("404");
        res.sendStatus(404);
        return;
    }
    fs.readFile(`${__dirname}/authors.json`, 'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }
        let array = JSON.parse(data);
        let newArray = [];
        array.forEach(element => {
            if(element.id != req.body.id) {
                newArray.push(element);
            }
            else {
                let updatedElement = `{
                    "id": ${req.body.id},
                    "name": "${req.body.name}"
                }`;
                newArray.push(JSON.parse(updatedElement));
            }
        });
        fs.writeFile(`${__dirname}/authors.json`, JSON.stringify(newArray), (error) => {
            if(error) 
            {
                res.sendStatus(500);
                return;
            }
            res.status(200);
            res.send();
        });
    });
});
app.post('/authors', (req, res) => {
    if(req.body.id === undefined || req.body.name === undefined) {
        console.log("404");
        res.sendStatus(404);
        return;
    }
    fs.readFile(`${__dirname}/authors.json`, 'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }
        let array = JSON.parse(data);
       
        let createdElement = `{
            "id": ${req.body.id},
            "name": "${req.body.name}"
        }`;
        array.push(JSON.parse(createdElement));
        fs.writeFile(`${__dirname}/authors.json`, JSON.stringify(array), (error) => {
            if(error) 
            {
                res.sendStatus(500);
                return;
            }
            res.status(200);
            res.send();
        });
    });
});

// USERS
app.get('/users', (req, res) => {
    
    fs.readFile(`${__dirname}/users.json`,'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }
        const objectArr = JSON.parse(data);
        let resultArr = objectArr; 
        res.setHeader('Content-type', 'application/json');
        res.status(200);
        resultArr.sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
          });
        res.send(JSON.stringify(resultArr));
    });
});
app.get('/users/:uid', (req, res) => {
    fs.readFile(`${__dirname}/users.json`,'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }
        const userArr = JSON.parse(data);
        if(req.params.uid === undefined) {
            console.log("404");
            res.sendStatus(404);
            return;
        }

        for(let user of userArr) {
            if(user.id == req.params.uid) {
                res.status(200);
                res.setHeader('Content-type', 'application/json');
                res.send(JSON.stringify(user));
                return;
            }
        }
        res.sendStatus(400);
    });
});
app.delete('/users/:uid',(req, res) => {
    if(req.params.uid === undefined) {
        console.log("404");
        res.sendStatus(404);
        return;
    }
    fs.readFile(`${__dirname}/users.json`, 'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }

        let array = JSON.parse(data);
        let newArray = array.filter((value, index, arr) => {
            return value.id != req.params.uid;
        });
        if(array.length === newArray.length)
        {
            res.sendStatus(400);
            return;
        }
        fs.writeFile(`${__dirname}/users.json`, JSON.stringify(newArray), (error) => {
            if(error) 
            {
                res.sendStatus(500);
                return;
            }
            res.status(204);
            res.send(JSON.stringify(newArray));
        });
        
    });
});
app.put('/users/:uid', (req, res) => {
    if(req.body.id === undefined || req.body.name === undefined) {
        console.log("404");
        res.sendStatus(404);
        return;
    }
    fs.readFile(`${__dirname}/users.json`, 'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }
        let array = JSON.parse(data);
        let newArray = [];
        array.forEach(element => {
            if(element.id != req.body.id) {
                newArray.push(element);
            }
            else {
                let updatedElement = `{
                    "id": ${req.body.id},
                    "name": "${req.body.name}"
                }`;
                newArray.push(JSON.parse(updatedElement));
            }
        });
        fs.writeFile(`${__dirname}/users.json`, JSON.stringify(newArray), (error) => {
            if(error) 
            {
                res.sendStatus(500);
                return;
            }
            res.status(200);
            res.send();
        });
    });
});
app.post('/users', (req, res) => {
    if(req.body.id === undefined || req.body.name === undefined) {
        console.log("404");
        res.sendStatus(404);
        return;
    }
    fs.readFile(`${__dirname}/users.json`, 'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }
        let array = JSON.parse(data);
       
        let createdElement = `{
            "id": ${req.body.id},
            "name": "${req.body.name}"
        }`;
        array.push(JSON.parse(createdElement));
        fs.writeFile(`${__dirname}/users.json`, JSON.stringify(array), (error) => {
            if(error) 
            {
                res.sendStatus(500);
                return;
            }
            res.status(200);
            res.send();
        });
    });
});

// RENTALS
app.get('/rentals', (req, res) => {
    fs.readFile(`${__dirname}/rentals.json`,'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }
        const objectArr = JSON.parse(data);
        let resultArr = objectArr; 
        res.setHeader('Content-type', 'application/json');
        res.status(200);
        resultArr.sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
          });
        res.send(JSON.stringify(resultArr));
    });
});
app.get('/rentals/:rid', (req, res) => {
    fs.readFile(`${__dirname}/rentals.json`,'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }
        const rentalArr = JSON.parse(data);
        if(req.params.rid === undefined) {
            console.log("404");
            res.sendStatus(404);
            return;
        }

        for(let rental of rentalArr) {
            if(rental.id == req.params.rid) {
                res.status(200);
                res.setHeader('Content-type', 'application/json');
                res.send(JSON.stringify(rental));
                return;
            }
        }
        res.sendStatus(400);
    });
});
app.delete('/rentals/:rid',(req, res) => {
    if(req.params.rid === undefined) {
        console.log("404");
        res.sendStatus(404);
        return;
    }
    fs.readFile(`${__dirname}/rentals.json`, 'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }

        let array = JSON.parse(data);
        let newArray = array.filter((value, index, arr) => {
            return value.id != req.params.rid;
        });
        if(array.length === newArray.length)
        {
            res.sendStatus(400);
            return;
        }
        fs.writeFile(`${__dirname}/rentals.json`, JSON.stringify(newArray), (error) => {
            if(error) 
            {
                res.sendStatus(500);
                return;
            }
            res.status(204);
            res.send(JSON.stringify(newArray));
        });
        
    });
});
app.put('/rentals/:rid', (req, res) => {
    if(req.body.id === undefined) {
        console.log("404");
        res.sendStatus(404);
        return;
    }
    fs.readFile(`${__dirname}/rentals.json`, 'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }
        let array = JSON.parse(data);
        let newArray = [];
        array.forEach(element => {
            if(element.id != req.body.id) {
                newArray.push(element);
            }
            else {
                let updatedElement = `{
                    "id": ${req.body.id},
                    "book_id": "${req.body.book_id}",
                    "renter_id" : "${req.body.renter_id}"
                }`;
                newArray.push(JSON.parse(updatedElement));
            }
        });
        fs.writeFile(`${__dirname}/rentals.json`, JSON.stringify(newArray), (error) => {
            if(error) 
            {
                res.sendStatus(500);
                return;
            }
            res.status(200);
            res.send();
        });
    });
});
app.post('/rentals', (req, res) => {
    if(req.body.id === undefined || req.body.book_id === undefined || req.body.renter_id === undefined) {
        console.log("404");
        res.sendStatus(404);
        return;
    }
    fs.readFile(`${__dirname}/rentals.json`, 'utf-8', (error, data) => {
        if(error) {
            res.sendStatus(500);
            return;
        }
        let array = JSON.parse(data);
       
        let createdElement = `{
            "id": ${req.body.id},
            "book_id": "${req.body.book_id}",
            "renter_id" : "${req.body.renter_id}"
        }`;
        array.push(JSON.parse(createdElement));
        fs.writeFile(`${__dirname}/rentals.json`, JSON.stringify(array), (error) => {
            if(error) 
            {
                res.sendStatus(500);
                return;
            }
            res.status(200);
            res.send();
        });
    });
});




app.listen(8081, () => {
    console.log("A szerver elindult...");
});