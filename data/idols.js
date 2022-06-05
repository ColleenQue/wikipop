const mongoCollections=require('../config/mongoCollections');
const idols=mongoCollections.idols;
const validation=require('../validation');

let exportedMethods=
{
    async createIdol(name,role,age,dob,height,weight,fandomName,fandomColor,funFacts,socialMedia,blogPage,numOfLikes)
    {
        name=validation.checkIdolName(name);
        role=validation.checkRole(role);
        age=validation.checkAge(age);
        dob=validation.checkDOB(dob);
        height=validation.checkHeight(height);
        weight=validation.checkWeight(weight);
        fandomName=validation.checkFandomName(fandomName);
        fandomColor=validation.checkFandomColor(fandomColor);
        funFacts=validation.funfacts(funFacts);
        socialMedia=validation.socialMedia(socialMedia);
        blogPage=validation.checkBlogPageLink(blogPage);
        numOfLikes=validation.numOfLikes(numOfLikes);
        const idolCollections=await idols();
        const findIdol=await idolCollections.find({name: name, blogPage: blogPage}).toArray();
        if(findIdol.length==0)
        {
            let idol=
            {
                name: name,
                role: role,
                age: age,
                dob: dob,
                height: height,
                weight: weight,
                fandomName: fandomName,
                fandomColor: fandomColor,
                funfacts: funFacts,
                socialMedia: socialMedia,
                blogPage: blogPage,
                numOfLikes: numOfLikes,
                comments: [],
            }
            const newIdol=await idolCollections.insertOne(idol);
            if(!newIdol.acknowledged || !newIdol.insertedId)
            {
                throw "Error: Could not Add Idol"
            }
            return idol;
        }
        else
        {
            throw 'Error: Duplicate Idol'
        }
    },
    async findIdol(idolID)
    {
        idolId=validation.checkIdolID(idolID);
        const idolCollections=await idols();
        const findIdol= await idolCollections.find({_id: idolID}).toArray();
        if(!findIdol)
        {
            throw "Error: Could not find idol"
        }
        else
        {
            return findIdol;
        }
    },
    async addComment(idolID,commentID)
    {
        idolID=validation.checkIdolID(idolID);
        commentID=validation.checkCommentID(commentID);
        const theIdol=await this.findIdol(idolID);
        let theComments=theIdol.comments;
        theComments.push(commentID);
        const idolCollections=await idols();
        const updateIdol=idolCollections.updateOne({_id:theIdol[0]._id},{$set:{comments: theComments}});
        if(!updateIdol.matchedCount && !updateIdol.modifiedCount)
        {
            throw "Error: Update failed";
        }
        return commentID;
    }
};

module.exports=exportedMethods;