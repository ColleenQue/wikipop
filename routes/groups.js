const express = require('express');
const router = express.Router();
const validation = require('../validation');
const groups = require('../data/groups');

router.get('/:id', async(req,res) =>
{
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
});

router.get('/allGroups', async(req,res) =>
{
    const allGroups=groups.getAllGroups();
    res.render('/posts/allGroups', {groups: allGroups});
});

router.post('/newgroup', async(req,res)=>
{
    req.body.name=validation.checkGroupName(req.body.name);
    req.body.numOfMembers=validation.checkNumOfMembers(req.body.numOfMembers);
    req.body.debutDate=validation.checkDebutDate(req.body.debutDate);
    req.body.awards=validation.checkAwards(req.body.awards);
    req.body.greeting=validation.checkGreeting(req.body.greeting);
    req.body.fandomName=validation.checkFandomName(req.body.fandomName);
    req.body.fandomColor=validation.checkFandomColor(req.body.fandomColor);
    req.body.socialMedia=validation.checkSocialMedia(req.body.socialMedia);
    req.body.memberLinks=validation.checkMemberLinks(req.body.memberLinks);
    const createGroup=groups.createGroup(req.body.name,req.body.numOfMembers,req.body.debutDate,
        req.body.awards,req.body.greeting,req.body.fandomName,req.body.fandomColor,req.body.socialMedia,req.body.memberLinks);
    return res.redirect('/allGroups');

});

module.exports=router;

