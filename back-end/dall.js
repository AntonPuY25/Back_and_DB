const mongoose = require("mongoose");

const {addUsersUtils} = require("./utils/usersUtils");
const {readUsersUtils} = require("./utils/usersUtils");
const userSchema = new mongoose.Schema({
    name: String
});

const UsersDB = mongoose.model('Users', userSchema);

const Users = {
    getUsers() {
        return UsersDB.find()
        // return readUsersUtils("fileSystem/users.json")
    },
     addUser(name) {
        let user = new UsersDB({name})
            user.save()
        //     let users = await this.getUsers()
    //     users.push({id: 7, name})
    // return addUsersUtils("fileSystem/users.json",users)
    },
    deleteUSer(id){
        return UsersDB.deleteOne({_id:id})
    },
    updateUser(id,name){
      return   UsersDB.update({_id:id},{name})
    }


}
exports.Users = Users