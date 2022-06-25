const mongoCollections = require('../config/mongoCollections');
const comments = mongoCollections.comments;
const validation = require('../validation');
const { ObjectId } = require('mongodb');


let exportedMethods =
{

    async createComment(username, content) {
        username = validation.checkUserName(username);
        content = validation.checkcommentContent(content);
        numOfLikes = 0;
        const commentCollections = await comments();
        let comment =
        {
            //name would be name of user
            commenter: username,
            content: content,
            numOfLikes: 0,
            comments: []
        }

        const newcomment = await commentCollections.insertOne(comment);
        if (!newcomment.acknowledged || !newcomment.insertedId) {
            throw "Error: Could not Add comment"
        }
        return comment;

    }
    ,
    async getAllComments() {
        const commentCollection = await comments();
        const commentList = await commentCollection.find({}, { projection: { _id: 1, name: 1, title: 1, content: 1 } }).toArray();


        for (let i = 0; i < commentList.length; i++) {
            commentList[i]._id = commentList[i]._id.toString();
        }
        if (!commentList) throw 'Could not get all comments';
        return commentList;
    },
    async findcomment(commentID) {
        commentID = validation.checkComments(commentID);
        const commentCollections = await comments();
        const findcomment = await commentCollections.findOne({ _id: ObjectId(commentID) });

        if (!findcomment) {
            throw "Error: Could not find comment"
        }

        return findcomment;

    },

    async deleteComment(commentId) {
     
    }
};

module.exports = exportedMethods;