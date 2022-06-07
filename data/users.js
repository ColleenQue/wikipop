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
                blogsPosted: [],
                commentsPosted: [],
                pagesCreated: [],
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
   },
   async findUser(username)
   {
       username=validation.checkUserName(username);
       const usersCollection=await users();
       const findUser=await usersCollection.find({username: username}).toArray();
       if(!findUser)
       {
           throw "Error: User cannot be found"
       }
       else
       {
           return findUser;
       }
   },
   async addNewTag(username,tag)
   {
       username=validation.checkUserName(username);
       tag=validation.checkTag(tag);
       const oldUser=await this.findUser(username);
       let theTags=oldUser[0].followingTags;
       theTags.push(tag);
       const usersCollection=await users();
       const updateInfo=await usersCollection.updateOne({_id:oldUser[0]._id},{$set:{followingTags: theTags}});
       if(!updateInfo.matchedCount && !updateInfo.modifiedCount)
       {
           throw "Error: Update failed";
       }
       return tag;
   },
   async addNewBlog(username,blogID)
   {
       username=validation.checkUserName(username);
       blogID=validation.checkBlogID(blogID);
       const oldUser=await this.findUser(username);
       let theBlogs=oldUser[0].blogsPosted;
       theBlogs.push(blogID);
       const usersCollection=await users();
       const updateInfo=await usersCollection.updateOne({_id:oldUser[0]._id},{$set:{blogsPosted: theBlogs}});
       if(!updateInfo.matchedCount && !updateInfo.modifiedCount)
       {
           throw "Error: Update failed";
       }
       return blogID;
   },
   async addNewComment(username,commentID)
   {
       username=validation.checkUserName(username);
       commentID=validation.checkCommentID(commentID);
       const oldUser=await this.findUser(username);
       let theComments=oldUser[0].commentsPosted;
       theComments.push(commentID);
       const usersCollection=await users();
       const updateInfo=await usersCollection.updateOne({_id:oldUser[0]._id},{$set:{commentsPosted: theComments}});
       if(!updateInfo.matchedCount && !updateInfo.modifiedCount)
       {
           throw "Error: Update failed";
       }
       return commentID;
   },
   async addNewPage(username,pageID)
   {
    username=validation.checkUserName(username);
    pageID=validation.checkpageID(pageID);
    const oldUser=await this.findUser(username);
    let thePages=oldUser[0].pagesCreated;
    thePages.push(pageID);
    const usersCollection=await users();
    const updateInfo=await usersCollection.updateOne({_id:oldUser[0]._id},{$set:{pagesCreated: thePages}});
    if(!updateInfo.matchedCount && !updateInfo.modifiedCount)
    {
        throw "Error: Update failed";
    }
    return pageID;
   }
};

module.exports=exportedMethods;