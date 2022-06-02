const mongoCollections=require('../config/mongoCollections');
const users=mongoCollections.users;
const bcrypt=require('bcrypt');
const validation=require('../validation');

let exportedMethods=
{
    async createUser(username,password)
    {
        username=validation.checkUserName(username);
        password=validation.checkPassWord(password);
        const usersCollection=await users();
        const findUser=await usersCollection.find({username: username}).toArray();
        if(findUser.length==0)
        {
            const saltRounds=16;
            const hash=await bcrypt.hash(password,saltRounds);
            const user=
            {
                username: username,
                password: hash,
                followingTags: [],
                blogsPosted: NaN,
                commentsPosted: NaN,
                pagesCreated: NaN,
            }
            const newUser=await usersCollection.insertOne(user);
            if(!newUser.acknowledged || !newUser.insertedId)
            {
                throw "Error: Could not Add User"
            }
            return user;
        }
        else
        {
            throw "Error: There is Already A User With That UserName"
        }
   }
};

module.exports=exportedMethods;