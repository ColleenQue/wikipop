const { ObjectId } = require("mongodb");

module.exports=
{
    checkUserName(username)
    {
        if(username.length < 4 || !(/^[A-Za-z0-9]*$/.test(username)) || username.indexOf(" ")>-1)
        {
            throw 'Error: The Username is not in the correct format'
        }
        return username;
    },
    checkPassWord(password)
    {
        if(password.length<6 || password.indexOf(" ")>-1)
        {
           throw "Error: The Password is not in the correct format"
        }
        return password;
    },
    checkTag(tag)
    {
        if(typeof tag != "string" || tag.indexOf(" ")>-1)
        {
            throw "Error: The Tag is not in the correct format"
        }
        return tag;
    },
    checkBlogID(blogID)
    {
        if(!ObjectId.isValid(blogID))
        {
            throw "Error: BlogID is not valid"
        }
        return blogID;
    },
    checkCommentID(commentID)
    {
        if(!ObjectId.isValid(commentID))
        {
            throw "Error: CommentID is not valid"
        }
        return commentID;
    },
    checkpageID(pageID)
    {
        if(!ObjectId.isValid(pageID))
        {
            throw "Error: PageID is not valid"
        }
        return pageID;
    }
}