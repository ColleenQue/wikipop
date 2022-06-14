const express = require('express');
const router = express.Router();
const validation = require('../validation');
const groups = require('../data/groups');

router.get('', async(req,res) =>
{
    const allGroups=await groups.getAllGroups();
    res.render('posts/allGroups', {groups: allGroups});
});

router.get('/newGroup', async(req,res) =>
{
    res.render('posts/newGroup');
});

router.post('/newGroup', async(req,res)=>
{
    /*
    req.body.name=validation.checkGroupName(req.body.name);
    req.body.numOfMembers=validation.checkNumOfMembers(req.body.numOfMembers);
    req.body.debutDate=validation.checkDebutDate(req.body.debutDate);
    req.body.awards=validation.checkAwards(req.body.awards);
    req.body.greeting=validation.checkGreeting(req.body.greeting);
    req.body.fandomName=validation.checkFandomName(req.body.fandomName);
    req.body.fandomColor=validation.checkFandomColor(req.body.fandomColor);
    req.body.socialMedia=validation.checkSocialMedia(req.body.socialMedia);
    req.body.memberLinks=validation.checkMemberLinks(req.body.memberLinks);
    */
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
    const createGroup=groups.createGroup(req.body.name,req.body.numOfMembers,req.body.debutDate,
        req.body.awards,req.body.greeting,req.body.fandomName,req.body.fandomColor,req.body.socialMedia,memberNamesList);
    return res.redirect('/groups');

});

router.get('/:id', async(req,res) =>
{
    /*
    try
    {
        const group=validation.checkGroupName(req.params.id);
        const findGroup=groups.findGroup(group);
        res.render('/posts/groups',{name: findGroup.name, numOfMembers: findGroup.numOfMembers, 
        debutDate: findGroup.debutDate, awards: findGroup.awards, greeting: findGroup.greeting, 
        fandomName: findGroup.fandomName, fandomColor: findGroup.fandomColor, socialMedia: findGroup.socialMedia,
        memberLinks: findGroup.memberLinks});
    }
    catch(e)
    {
        res.status(400).render('posts/groups',{error: e});
    }
    */
   res.render('posts/groups');
});

module.exports=router;

