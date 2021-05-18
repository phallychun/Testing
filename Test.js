const express = require('express');
const app = express();

app.listen(process.env.PORT || 5000, () => console.log('Running .....'));
app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Node JS");
})

let users = [
    {id: 1, name: "phally", password: 23467},
    {id: 2, name: "phearak", password: 23467},
    {id: 3, name: "phally", password: 23467},
    {id: 4, name: "phally", password: 23467},
    {id: 5, name: "phally", password: 23467}

]

app.get('/api/users',(req,res)=>{
    res.send(users);
})

app.get('/api/users/:id',(req,res)=>{
    let id = req.params.id;
    // function method use (findIndex());
    let userIdex = users.findIndex(user => user.id === parseInt(id));
    
    // normal method
    // let index = -1 ;
    // for(let user of users){
    //     if(user.id === parseInt(id)){
    //         index = user.id - 1;
    //     }
    // }

    if( userIdex >= 0){
        let user = users[userIdex];
        res.send([user]);
    }
    else{
        res.status(404);
        res.send('User request error');
    }
    // let userId = users[index];
    // res.send(userIdex);
})
app.post('/api/users',(req,res)=>{
    if(!req.body.password){
        res.status(505);
        return res.send({error : 'Password Require'});
    };
    let user = {
        id: users.length + 1,
        name: req.body.name,
        password: req.body.password
    }
    console.log(user);
    users.push(user);
    res.send(users);
})

app.put('/api/users/:id',(req,res)=>{
    let id = req.params.id;
    // function method use (findIndex());
    let index = users.findIndex(user => user.id === parseInt(id));
    let username = req.body.name;
    let pwd = req.body.password;
    if( index >= 0){
        let user = users[index];
        user.name = username;
        user.password = pwd;
        res.send(user);
    }
    else{
        res.status(404);
        res.send({error:'User request error'});
    }
});

app.put('/api/users/:id',(req,res)=>{
    let id = req.params.id;
    // function method use (findIndex());
    let index = users.findIndex(user => user.id === parseInt(id));
    
    if( index >= 0){
        users.splice(index,1)
        res.send('successfuly');
    }
    else{
        res.status(404);
        res.send({error:'User request error'});
    }
});

// get view
// post create
// put update
// delete for delete


