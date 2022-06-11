const mongoCollections=require('../config/mongoCollections');
const blogs=mongoCollections.blogs;
const validation=require('../validation');

let exportedMethods=
{
    async createBlog(name,title,content)
    {
        name=validation.checkBlogName(name);
        title=validation.checkBlogTitle(title);
        content=validation.checkBlogContent(content);
        numOfLikes=0;
        const blogCollections=await blogs();
        const findBlog=await blogCollections.find({name: name, title: title, content: content, numOfLikes: numOfLikes}).toArray();
        if(findBlog.length==0)
        {
            let blog=
            {
                //name would be name of user
                name: name,
                title: title,
                content: content,
                numOfLikes: numOfLikes,
                comments: [],
            }
            const newBlog=await blogCollections.insertOne(blog);
            if(!newBlog.acknowledged || !newBlog.insertedId)
            {
                throw "Error: Could not Add Blog"
            }
            return blog;
        }
        else
        {
            throw 'Error: Duplicate Blog'
        }
    },
    
    async getAllBlogs() {
        const blogCollection = await blogs();
        const blogList = await blogCollection.find({}, { projection: { _id: 1, name: 1,title:1,content:1} }).toArray();


        for (let i = 0; i < blogList.length; i++) {
            blogList[i]._id = blogList[i]._id.toString();
        }

        console.log(blogList);
        if (!blogList) throw 'Could not get all bands';
        return blogList;
    },
    async findBlog(blogID)
    {
        blogID=validation.checkBlogID(blogID);
        const blogCollections=await blogs();
        const findBlog= await blogCollections.find({_id: blogID}).toArray();
        if(!findBlog)
        {
            throw "Error: Could not find blog"
        }
        else
        {
            return findBlog;
        }
    },
    async addComment(blogID,commentID)
    {
        blogID=validation.checkBlogID(blogID);
        commentID=validation.checkCommentID(commentID);
        const theBlog=await this.findBlog(blogID);
        let theComments=theBlog[0].comments;
        theComments.push(commentID);
        const blogCollections=await blogs();
        const updateBlog=blogCollections.updateOne({_id:theBlog[0]._id},{$set:{comments: theComments}});
        if(!updateBlog.matchedCount && !updateBlog.modifiedCount)
        {
            throw "Error: Update failed";
        }
        return commentID;
    }
};

module.exports=exportedMethods;