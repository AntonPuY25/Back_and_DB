const express = require('express')
const {Users} = require("../dall");
const router = express.Router();


router.use(function timeLog(req
    , res
    , next) {
    console.log('Time: ', Date.now());
    next()
})

router.get('/', async (req, res) => {
    let users = await Users.getUsers();


    if (req.query.search) {
        users = users.filter(u => u.name.match(req.query.search))
    }


    res.send(users)
})
router.get('/:id', async (req,
                          res) => {
    let users = await Users.getUsers();
    const userId = req.params.id
    debugger
    let user = users.find(u => u.id == userId)
    if (user) {
        res.send(user)
    } else {
        res.send("User  not found")
    }

})
router.delete('/:id', async (req,
                             res) => {
    const userId = req.params.id
    await Users.deleteUSer(userId);
    res.send(204)
})
router.post('/', async (req
    , res) => {
    let name = req.body.name
    await Users.addUser(name)
    res.send({success: true})

})
router.put('/', async (req
    , res) => {
    let name = req.body.name
    let id = req.body.id
    await Users.updateUser(id,name)
    res.send({success: true})

})

module.exports = router

// exports.userController = async (req,res)=>{
//
//     if (req.method === 'POST') {
//        let result = await Users.addUser()
//         res.write(JSON.stringify({success: true}))
//         res.end()
//
//     } else {
//         let users = await  Users.getUsers();
//         res.write(JSON.stringify(users))
//         res.end()
//     }
// }