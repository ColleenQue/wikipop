const express = require('express');
const router = express.Router();
const validation = require('../validation');
const groups = require('../data/groups');
const multer=require('multer');

var storage=multer.diskStorage({
    destination: function(req,file,cb)
    {
        cb(null,"./public/img");
    },
    filename: function(req,file,cb)
    {
        cb(null,file.originalname);
    }
});

var upload=multer({storage: storage});

router.get('', async(req,res) =>
{
    try{
        const allGroups=await groups.getAllGroups();
        res.render('posts/allGroups',{groups: allGroups});

    }catch(e)
    {
        res.render('posts/allGroups');
    }
});

router.get('/newGroup', async(req,res) =>
{
    res.render('posts/newGroup');
});

router.post('/newGroup', upload.single('groupImage'), async(req,res)=>
{
    req.body.name=validation.checkGroupName(req.body.name);
    req.body.numOfMembers=validation.checkNumOfMembers(req.body.numOfMembers);
    req.body.debutDate=validation.checkDebutDate(req.body.debutDate);
    req.body.awards=validation.checkAwards(req.body.awards);
    req.body.greeting=validation.checkGreeting(req.body.greeting);
    req.body.fandomName=validation.checkFandomName(req.body.fandomName);
    req.body.fandomColor=validation.checkFandomColor(req.body.fandomColor);
    req.body.socialMedia=validation.checkSocialMedia(req.body.socialMedia);
    req.body.memberNames=validation.checkMemberNames(req.body.memberNames);
    let name="";
    const memberNamesList=[];
    const memberNames=req.body.memberNames;
    for(let i=0;i<memberNames.length;i++)
    {
        if(memberNames[i]===",")
        {
            name=validation.checkIdolName(name);
            memberNamesList.push(name);
            name="";
        }
        else
        {
            name+=memberNames[i];
        }
    }
    memberNamesList.push(name);
    let imagePath=req.file.path.replaceAll("\\","/");
    imagePath=imagePath.replace("public","");
    const createGroup=groups.createGroup(req.body.name,req.body.numOfMembers,req.body.debutDate,
        req.body.awards,req.body.greeting,req.body.fandomName,req.body.fandomColor,req.body.socialMedia,memberNamesList,imagePath);
    return res.redirect('/groups');

});

router.get('/:id', async(req,res) =>
{
    try
    {
        const group=validation.checkGroupName(req.params.id);
        const findGroup=await groups.findGroup(group);
        const theGroup=findGroup[0].groupInfo;
        res.render('posts/groups',{name: theGroup.name, numOfMembers: theGroup.numOfMembers, 
        debutDate: theGroup.debutDate, awards: theGroup.awards, greeting: theGroup.greeting, 
        fandomName: theGroup.fandomName, fandomColor: theGroup.fandomColor, socialMedia: theGroup.socialMedia, memberLinks: theGroup.membersLinks, groupImage: theGroup.groupImage});
    }
    catch(e)
    {
        res.status(400).render('posts/groups',{error: e});
    }
});

module.exports=router;

