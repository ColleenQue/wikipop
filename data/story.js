const { ObjectId } = require('mongodb');
const mongoCollections=require('../config/mongoCollections');
const story=mongoCollections.story;
const validation=require('../validation');

let exportedMethods=
{
    async createStory(owner)
    {
        owner=validation.checkOwner(owner);
        const storyCollections=await story();
        const findStory=await storyCollections.find({owner: owner}).toArray();
        if(findStory.length===0)
        {
            let story=
            {
                owner: owner,
                listOfStories: [],
                numOfSaves: 0,
                numOfLikes: 0,
            }
            const newStory=await storyCollections.insertOne(story);
            if(!newStory.acknowledged || !newStory.insertedId)
            {
                throw "Error: Could not Add Story"
            }
            return story;
        }
        else
        {
            throw "Error: Duplicate Story"
        }
    },
    async findStory(owner)
    {
        owner=validation.checkOwner(owner);
        const storyCollection=await story();
        const findStory=await storyCollection.find({owner: owner}).toArray();
        if(!findStory)
        {
            throw "Error: Story cannot be found"
        }
        else
        {
            return findStory;
        }
    },
    async addNewSubStory(owner,writer,storyCollect,storyTitle,storyText,comments,tags,numOfLikes,numOfSaves)
    {
        owner=validation.checkOwner(owner);
        writer=validation.checkWriter(writer);
        storyCollect=validation.checkStoryCollection(storyCollect);
        storyTitle=validation.checkStoryTitle(storyTitle);
        storyText=validation.checkStoryText(storyText);
        comments=validation.checkComments(comments);
        tags=validation.checkListOfTags(tags);
        numOfLikes=validation.checkNumOfLikes(numOfLikes);
        numOfSaves=validation.checkNumOfSaves(numOfSaves);
        let subStory=
        {
            _id: ObjectId(),
            writer: writer,
            storyCollect: storyCollect,
            storyTitle: storyTitle,
            storyText: storyText,
            comments: comments,
            tags: tags,
            numOfLikes: numOfLikes,
            numOfSaves: numOfSaves,
        }
        const storyCollections=await story();
        const theStory=await this.findStory(owner);
        let theListOfStories=theStory[0].listOfStories;
        theListOfStories.push(subStory);
        const updateStory=storyCollections.updateOne({_id:theStory[0]._id},{$set:{listOfStories: theListOfStories}});
        if(!updateStory.matchedCount && !updateStory.modifiedCount)
        {
            throw "Error: Update failed";
        }
        return subStory;
    },
    async addNumOfLikes(owner,numOfLikes)
    {
        owner=validation.checkOwner(owner);
        numOfLikes=validation.checkNumOfLikes(numOfLikes);
        const theStory=await this.findStory(owner);
        let theNumOfLikes=theStory.numOfLikes;
        theNumOfLikes+=numOfLikes;
        const storyCollection=await story();
        const updateStory=storyCollection.updateOne({_id:theStory[0]._id},{$set:{numOfLikes: theNumOfLikes}});
        if(!updateStory.matchedCount && !updateStory.modifiedCount)
        {
            throw "Error: Update failed";
        }
        return numOfLikes;
    },
    async addNumOfSaves(owner,numOfSaves)
    {
        owner=validation.checkOwner(owner);
        numOfSaves=validation.checkNumOfSaves(numOfSaves);
        const theStory=await this.findStory(owner);
        let theNumOfLikes=theStory.numOfLikes;
        theNumOfLikes+=numOfLikes;
        const storyCollection=await story();
        const updateStory=storyCollection.updateOne({_id:theStory[0]._id},{$set:{numOfLikes: theNumOfLikes}});
        if(!updateStory.matchedCount && !updateStory.modifiedCount)
        {
            throw "Error: Update failed";
        }
        return numOfLikes;
    }
};
module.exports=exportedMethods;