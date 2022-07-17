const mongoCollections=require('../config/mongoCollections');
const idols=mongoCollections.idols;
const validation=require('../validation');

let exportedMethods=
{
    async createIdol(name,role,group,age,dob,height,weight,fandomName,fandomColor,funFacts,socialMedia,idolImage)
    {
        name=validation.checkIdolName(name);
        role=validation.checkRole(role);
        group=validation.checkGroupName(group);
        age=validation.checkAge(age);
        dob=validation.checkDOB(dob);
        height=validation.checkHeight(height);
        weight=validation.checkWeight(weight);
        fandomName=validation.checkFandomName(fandomName);
        fandomColor=validation.checkFandomColor(fandomColor);
        funFacts=validation.checkfunFacts(funFacts);
        socialMedia=validation.checkSocialMedia(socialMedia);
        const idolCollections=await idols();
        const findIdol=await idolCollections.find({name: name, group: group}).toArray();
        if(findIdol.length==0)
        {
            let idol=
            {
                name: name,
                group: group,
                role: role,
                age: age,
                dob: dob,
                height: height,
                weight: weight,
                fandomName: fandomName,
                fandomColor: fandomColor,
                funfacts: funFacts,
                socialMedia: socialMedia,
                idolImage: idolImage,
                blogPages: [],
                numOfLikes: 0,
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
    async findIdolBasedOnName(idolName,groupName)
    {
        idolName=validation.checkIdolName(idolName);
        const idolCollections=await idols();
        const findIdol=await idolCollections.find({name: idolName}).toArray();
        if(!findIdol)
        {
            throw "Error: Could not find Idol"
        }
        if(findIdol.length==0)
        {
            throw "Error: Could not find Idol"
        }
        if(findIdol.length>1)
        {
            for(let i=0;i<findIdol.length;i++)
            {
                if(findIdol[i].groupName===groupName)
                {
                    return findIdol[i];
                }
            }
            throw "Error: could not find Idol"
        }
        else
        {
            return findIdol[0];
        }
    },
    async getAllIdols()
    {
        let idolList=[];
        const idolCollections=await idols();
        const allIdols=await idolCollections.find().toArray();
        for(let i=0;i<allIdols.length;i++)
        {
            let theIdol={
                name: allIdols[i].name,
                group: allIdols[i].group,
            }
            idolList.push(theIdol);
        }
        if(!idolList || idolList.length==0)
        {
            throw "Error: Could not find all idols"
        }
        else
        {
            return idolList.sort(function (a,b) {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            });
        }
    },
    async addComment(idolID,commentID)
    {
        idolID=validation.checkIdolID(idolID);
        commentID=validation.checkCommentID(commentID);
        const theIdol=await this.findIdol(idolID);
        let theComments=theIdol[0].comments;
        theComments.push(commentID);
        const idolCollections=await idols();
        const updateIdol=idolCollections.updateOne({_id:theIdol[0]._id},{$set:{comments: theComments}});
        if(!updateIdol.matchedCount && !updateIdol.modifiedCount)
        {
            throw "Error: Update failed";
        }
        return commentID;
    },
    async likeIdol(name,group)
    {
        name=validation.checkIdolName(name);
        group=validation.checkGroupName(group);
        const theIdol=await this.findIdolBasedOnName(name,group);
        let numOfLikes=theIdol.numOfLikes;
        numOfLikes++;
        const idolCollections=await idols();
        const updateIdol=await idolCollections.updateOne({_id:theIdol._id},{$set:{numOfLikes: numOfLikes}});
        if(!updateIdol.matchedCount && !updateIdol.modifiedCount)
        {
            throw "Error: Update failed";
        }
        return name;
    },
    async unlikeIdol(name,group)
    {
        name=validation.checkIdolName(name);
        group=validation.checkGroupName(group);
        const theIdol=await this.findIdolBasedOnName(name,group);
        let numOfLikes=theIdol.numOfLikes;
        numOfLikes=numOfLikes-1;
        const idolCollections=await idols();
        const updateIdol=await idolCollections.updateOne({_id:theIdol._id},{$set:{numOfLikes: numOfLikes}});
        if(!updateIdol.matchedCount && !updateIdol.modifiedCount)
        {
            throw "Error: Update failed";
        }
        return name;
    }
};

module.exports=exportedMethods;