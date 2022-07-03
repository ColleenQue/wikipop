const mongoCollections=require('../config/mongoCollections');
const groups=mongoCollections.groups;
const validation=require('../validation');
const { ObjectId }=require('mongodb');

let exportedMethods=
{
    async createGroup(name,numOfMembers,debutDate,awards,greeting,fandomName,fandomColor,socialMedia,membersLinks,groupImage)
    {
        name=validation.checkGroupName(name);
        numOfMembers=validation.checkNumOfMembers(numOfMembers);
        debutDate=validation.checkDebutDate(debutDate);
        awards=validation.checkAwards(awards);
        greeting=validation.checkGreeting(greeting);
        fandomName=validation.checkFandomName(fandomName);
        fandomColor=validation.checkFandomColor(fandomColor);
        socialMedia=validation.checkSocialMedia(socialMedia);
        membersLinks=validation.checkMemberLinks(membersLinks);
        const groupsCollection=await groups();
        const findGroup= await groupsCollection.find({"groupInfo.name": name}).toArray();
        if(findGroup.length==0)
        {
            const groupInfo=
            {
                _id: ObjectId(),
                name: name,
                numOfMembers: numOfMembers,
                debutDate: debutDate,
                awards:awards,
                greeting: greeting,
                fandomName: fandomName,
                fandomColor: fandomColor,
                socialMedia: socialMedia,
                membersLinks: membersLinks,
                groupImage: groupImage,
            }
            const groupPage=
            {
                groupInfo: groupInfo,
                relatedBlogPages: [],
                comments: [],
                numOfLikes: 0,
            }
            const newGroup=await groupsCollection.insertOne(groupPage);
            if(!newGroup.acknowledged || !newGroup.insertedId)
            {
                throw "Error: Could not Add Group"
            }
            return groupPage;
        }
        else
        {
            throw 'Error: Duplicate Group Page'
        }
    },
    async findGroup(name)
    {
        name=validation.checkGroupName(name);
        const groupsCollection=await groups();
        const findGroup= await groupsCollection.find({"groupInfo.name": name}).toArray();
        if(!findGroup)
        {
            throw "Error: Could not find group"
        }
        else
        {
            return findGroup;
        }
    },
    async getAllGroups()
    {
        const groupsCollection=await groups();
        //const findAllGroups= await groupsCollection.find().toArray();
        const findAllGroups=await groupsCollection.distinct("groupInfo.name");
        if(!findAllGroups || findAllGroups.length==0)
        {
            throw "Error: Could not find all groups"
        }
        else
        {
            //console.log(findAllGroups.sort());
            return findAllGroups.sort(function (a,b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
        }
    },
    async addRelatedBlogPage(name,blogID)
    {
        name=validation.checkGroupName(name);
        blogID=validation.checkBlogID(blogID);
        const theGroup=await this.findGroup(name);
        let theBlogs=theGroup.relatedBlogPages;
        theBlogs.push(blogID);
        const groupsCollection=await groups();
        const updateGroup=groupcollection.updateOne({_id:theGroup[0]._id},{$set:{relatedBlogPages: theBlogs}});
        if(!updateGroup.matchedCount && !updateGroup.modifiedCount)
        {
            throw "Error: Update failed";
        }
        return blogID;
    },
    async addComment(name,commentID)
    {
        name=validation.checkGroupName(name);
        commentID=validation.checkCommentID(commentID);
        const theGroup=await this.findGroup(name);
        let theComments=theGroup[0].comments;
        theComments.push(commentID);
        const groupsCollection=await groups();
        const updateGroup=groupsCollection.updateOne({_id:theGroup[0]._id},{$set:{comments: theComments}});
        if(!updateGroup.matchedCount && !updateGroup.modifiedCount)
        {
            throw "Error: Update failed";
        }
        return commentID;
    },
    async likeGroup(name)
    {
        name=validation.checkGroupName(name);
        const theGroup=await this.findGroup(name);
        let numOfLikes=theGroup[0].numOfLikes;
        numOfLikes++;
        const groupsCollection=await groups();
        const updateGroup=await groupsCollection.updateOne({_id:theGroup[0]._id},{$set:{numOfLikes: numOfLikes}});
        if(!updateGroup.matchedCount && !updateGroup.modifiedCount)
        {
            throw "Error: Update failed";
        }
        return name;
    },
    async unlikeGroup(name)
    {
        name=validation.checkGroupName(name);
        const theGroup=await this.findGroup(name);
        let numOfLikes=theGroup[0].numOfLikes;
        numOfLikes=numOfLikes-1;
        const groupsCollection=await groups();
        const updateGroup=await groupsCollection.updateOne({_id:theGroup[0]._id},{$set:{numOfLikes: numOfLikes}});
        if(!updateGroup.matchedCount && !updateGroup.modifiedCount)
        {
            throw "Error: Update failed";
        }
        return name;
    }
};

module.exports=exportedMethods;