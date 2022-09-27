const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');
const { query } = require('express');

app.use(cors())
app.use(express.json());


const hr = [
    { id: 1, name: "Abul", father: "Babul", address: "Nilpur" },
    { id: 2, name: "Kalam", father: "Alom", address: "Nilpur" },
    { id: 3, name: "Jamal", father: "Ruhan", address: "Nilpur" },
    { id: 4, name: "Romjan", father: "Rayhan", address: "Nilpur" }
]
app.get('/user', (req, res) => {
//filter By Query Paramiter
    if (req.query.name) {
        const search = req.query.name.toLowerCase();
        const match = hr.filter(user => user.name.toLowerCase().includes(search));
        res.send(match);
    }
    else {
        res.send(hr)
    }

})




app.get('/user/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = hr.find(u => u.id == id)
    res.send(user)
})



app.post('/user', (req, res) => {
    console.log('request', req.body);
    const user = req.body;
    user.id = hr.length + 1;
    hr.push(user);

    res.send(user);
})

app.listen(port, () => {
    console.log(`hello backend worked in-${port} `)
})