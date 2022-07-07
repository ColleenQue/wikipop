const mongoCollections = require('../config/mongoCollections');
const blogs = mongoCollections.blogs;
const validation = require('../validation');
const comments = require('../data/comments');
const { ObjectId } = require('mongodb');
const { search } = require('../routes/blogs');


let exportedMethods =
{
    async createBlog(name, title, content) {
        name = validation.checkBlogName(name);
        title = validation.checkBlogTitle(title);
        content = validation.checkBlogContent(content);
        numOfLikes = 0;
        const blogCollections = await blogs();
        const findBlog = await blogCollections.find({ name: name, title: title, content: content, numOfLikes: numOfLikes }).toArray();
        if (findBlog.length == 0) {
            let blog =
            {
                //name would be name of user
                name: name,
                title: title,
                content: content,
                numOfLikes: numOfLikes,
                comments: [],
            }
            const newBlog = await blogCollections.insertOne(blog);
            if (!newBlog.acknowledged || !newBlog.insertedId) {
                throw "Error: Could not Add Blog"
            }
            return blog;
        }
        else {
            throw 'Error: Duplicate Blog'
        }
    },

    async getAllBlogs() {
        const blogCollection = await blogs();
        const blogList = await blogCollection.find({}, { projection: { _id: 1, name: 1, title: 1, content: 1 } }).toArray();


        for (let i = 0; i < blogList.length; i++) {
            blogList[i]._id = blogList[i]._id.toString();
        }
        if (!blogList) throw 'Could not get all bands';
        return blogList;
    },
    async findBlog(blogID) {

        blogID = validation.checkBlogID(blogID);
        const blogCollections = await blogs();
        const findBlog = await blogCollections.findOne({ _id: ObjectId(blogID) });
       
        if (!findBlog) {
            throw "Error: Could not find blog"
        }

        return findBlog;
    },

    async LastPage(){
        const blogCollection = await blogs();
        const blogList = await blogCollection.find({}, { projection: { _id: 1, name: 1, title: 1, content: 1 } }).toArray();
        
        let lastPage = (blogList.length/5);
        //returns 5.5 or something
        return lastPage;
    
    },
    async getBlogsPerPage(pageNumber){
        //gets 10 blogs per page

        //sort by number of likes
        const blogCollection = await blogs();
        const blogList = await blogCollection.find({}, { projection: { _id: 1, name: 1, title: 1, content: 1 } }).toArray();
        const list = []
        const index = (pageNumber-1) * 5;
        const end = index+5;
        for (let i=index;i<end;i++){
            if(i >= blogList.length) {return list;} 
            list.push(blogList[i]);
   
        }

        return list;

    },
    async addComment(blogID,commenter,content) {
      
        blogID = validation.checkBlogID(blogID);
        //commenter = validation.checkComments(content);
        commenter=validation.checkUserName(commenter);
    
        //add comment as subdocument
        const blogCollections = await blogs();

        const theBlog = await this.findBlog(blogID);

        //declare new comment
        let newComment =
        {
            //name would be name of user
            _id: ObjectId().toString(),
            commenter: commenter,
            content: content,
            numOfLikes: 0,
            comments: []
        }


        console.log(theBlog);
        let theComments = theBlog.comments;
        theComments.push(newComment);


        const updateBlog = blogCollections.updateOne({ _id: theBlog._id }, { $set: { comments: theComments } });
        if (!updateBlog ||updateBlog.modifiedCount === 0 ) {
            throw "Error: Update failed";
        }

        return newComment;
    },
    //for searching
    async searchBlogs(searchTerm) {

        //check error
        if(!searchTerm){
          throw "search term must exist";
        }

        if (typeof searchTerm !== 'string') throw "search term must be a string";
        //find array 
        if (searchTerm.trim().length === 0) throw "Error: search term must not be all empty spaces"
    

        const blogCollections = await blogs();
        //find array
        const blogs2 = await blogCollections.find ({ $or: [ { title: searchTerm }, { name:searchTerm },{content:searchTerm}] }).toArray();
 
        console.log(blogs2);
        return blogs2;
    }
    //   },    
    //   async BlogsPerPageList(pageNumber,list){
    //     //gets 5 blogs per page

    //     //sort by number of likes
        
    //     const index = (pageNumber-1) * 5;
    //     const end = index+5;
    //     for (let i=index;i<end;i++){
    //         if(i >= blogList.length) {return list;} 
    //         list.push(blogList[i]);
    //     }
    //     return list;
    // },
    // async LastPageList(list){
    //     const blogList = list;
    //     let lastPage = (blogList.length/5);
    //     //returns 5.5 or something
    //     return lastPage;
    // }
};

module.exports = exportedMethods;