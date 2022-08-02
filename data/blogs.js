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

    async LastPage() {
        const blogCollection = await blogs();
        const blogList = await blogCollection.find({}, { projection: { _id: 1, name: 1, title: 1, content: 1 } }).toArray();

        let lastPage = (blogList.length / 5);
        //returns 5.5 or something
        return lastPage;

    },
    async getBlogsPerPage(pageNumber) {
        //gets 10 blogs per page

        //sort by number of likes
        const blogCollection = await blogs();
        const blogList = await blogCollection.find({}, { projection: { _id: 1, name: 1, title: 1, content: 1 } }).toArray();
        const list = []
        const index = (pageNumber - 1) * 5;
        const end = index + 5;
        for (let i = index; i < end; i++) {
            if (i >= blogList.length) { return list; }
            list.push(blogList[i]);

        }

        return list;


    },

    //comment


    async addComment(blogID, commenter, content) {

        blogID = validation.checkBlogID(blogID);
        //commenter = validation.checkComments(content);
        commenter = validation.checkUserName(commenter);

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

        let theComments = theBlog.comments;
        theComments.push(newComment);


        const updateBlog = blogCollections.updateOne({ _id: theBlog._id }, { $set: { comments: theComments } });
        if (!updateBlog || updateBlog.modifiedCount === 0) {
            throw "Error: Update failed";
        }

        newComment._id = newComment._id.toString();
        return newComment;
    },
    //for searching
    async searchBlogs(searchTerm) {

        //check error
        if (!searchTerm) {
            throw "search term must exist";
        }

        if (typeof searchTerm !== 'string') throw "search term must be a string";
        //find array 
        if (searchTerm.trim().length === 0) throw "Error: search term must not be all empty spaces"


        const blogCollections = await blogs();
        //find array
        const blogs2 = await blogCollections.find({ $or: [{ title: searchTerm }, { name: searchTerm }, { content: searchTerm }] }).toArray();

        console.log(blogs2);
        return blogs2;
    },

    //helper function for comments
    //find blog
    async getComment(commentId) {
        commentId = validation.checkCommentID(commentId);
        commentId = commentId.trim();
        if (!ObjectId.isValid(commentId)) throw 'invalid object commentId';


        const blogCollection = await blogs();
        const blog = await blogCollection.findOne({ "comments": { $elemMatch: { "_id": ObjectId(commentId) } } });


        console.log(blog);
        if (blog == null)
            throw "comment does not exist";

        const comments = blog.comments;
        if (comments.length === 0)
            throw "comment does not exist"

        return blog;
    },



    async addSubComment(commentId, content, user) {

        commentId = commentId.trim();

        if (!ObjectId.isValid(commentId)) throw 'invalid object commentId';

        const blogCollection = await blogs();
        //unable to find blog this way
        const blog = await blogCollection.findOne({ "comments": { $elemMatch: { "_id": commentId } } });

        //found blog
        console.log(commentId,content,user);
        commentId = validation.checkCommentID(commentId);
        content = validation.checkContent(content);
        user = validation.checkUserName(user);
        

        if (!ObjectId.isValid(commentId)) throw 'invalid object commentId';


    
        let newComment =
        {
            //name would be name of user
            _id: ObjectId().toString(),
            commenter: user,
            content: content,
            numOfLikes: 0,
            comments: []
        }

        let commentList = blog.comments;

        //add sub comment 
        for (let i = 0; i < commentList.length; i++) {
            if (commentList[i]._id == commentId) {
                //When given a albumId, this function will return an album from the band. 
                commentList[i].comments.push(newComment);
                
                break;
            }
        }

        blog.comments = commentList;
        console.log(commentList);

        const updateBlog = blogCollection.updateOne({ _id: blog._id }, { $set: { comments: blog.comments } });
        if (!updateBlog || updateBlog.modifiedCount === 0) {
            throw "Error: Update failed";
        }

        return newComment;

    },

    async editComment(blogId, commentId, newContent) {

        blogId = validation.checkBlogID(blogId);
        commentId = validation.checkId(commentId);
        newContent = validation.checkContent(newContent);

        const blogCollection = await blogs();
        const commentCollection = await comments();


        const findComment = await commentCollection.findOne({ _id: ObjectId(commentId) });
        const findBlog = await blogCollection.findOne({ _id: ObjectId(findBlog) });

        let newComment =
        {
            //name would be name of user
            _id: findComment._id,
            commenter: findComment.commenter,
            content: newContent,
            numOfLikes: findComment.numOfLikes,
            comments: findComment.comments
        }

        let commentList = findBlog.comments;

        for (let i = 0; i < commentList.length; i++) {
            if (commentList[i]._id == findComment._id) {
                commentList[i] = newComment;
            }
        }

        let updateInfo = await blogCollection.updateOne(
            { _id: ObjectId(blogId) },
            //not sure if this is how you update...
            { $set: findBlog }
        );

        if (updateInfo.modifiedCount === 0) {
            throw 'could not update dog successfully';
        }

        const blog = await this.get(blogId);
        blog._id = blogId.toString();
        return blog;


    },

    async get(blogId) {
        blogId = validation.checkBlogID(blogId);

        const blogCollection = await blogs();
        const blog = await blogCollection.findOne({ _id: ObjectId(blogId) });

        if (!blog) {
            throw "Error: Could not find comment"
        }

        return blog;
    },


    async deleteComment(commentId) {
        commentId = validation.checkCommentID(commentId);
        if (!ObjectId.isValid(commentId)) throw 'invalid object commentId';


        const blogCollection = await blogs();
        const blog = await blogCollection.findOne({ "comments": { $elemMatch: { "_id": ObjectId(commentId) } } });


        if (blog == null)
            throw "comment does not exist";

        const comments = blog.comments;
        if (comments.length === 0)
            throw "comment does not exist"

        for (let i = 0; i < comments.length; i++) {
            if (comments[i]._id == commentId) {
                //When given a albumId, this function will return an album from the band. 
                let removedComment = comments.splice(i, i + 1);
                return { removedComment: removedComment, comments: comments };
            }
        }

    },


};

module.exports = exportedMethods;