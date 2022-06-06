//I pledge my honor that I have abided by the Stevens Honor System.
//Colleen Que

const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const validation = require('../validation');


module.exports = {
    async createUser(username, password) {
        //partially copied from group member's code for final project

        username = validation.checkUsername(username);
        password = validation.checkPassword(password);

        //case insensitive
        //username = username.toLowerCase();
        const userCollection = await users();
        const user = await userCollection.findOne({ username: username.toLowerCase() });
        if (user != null) throw "Error: username is already taken";

        //encrypt the password
        const hash = await bcrypt.hash(password, saltRounds);

        let newUser = {
            username: username,
            password: hash
        }

        const insertInfo = await userCollection.insertOne(newUser);
        if (!insertInfo.acknowledged || !insertInfo.insertedId)
            throw "Could not add user";

        return {userInserted:true};

    },

    async checkUser(username,password){

        
        username = validation.checkUsername(username);
        password = validation.checkPassword(password);

        //username = username.toLowerCase();

        const userCollection = await users();
        const user = await userCollection.findOne({ username: username.toLowerCase() });
       // console.log(user);
        if (user==null) throw "Either Password or Username is invalid";


        
        let compare = false;
        compare = await bcrypt.compare(password,user.password);

        if(compare){
            
            return {authenticated:true};
        }
        else throw "Either Username or Password is invalid"

    }
}