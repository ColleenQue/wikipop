const express = require('express');
const router = express.Router();
const validation = require('../validation');
const groups = require('../data/groups');
const multer=require('multer');
const users=require('../data/users');
const Swal=require('sweetalert2');
const e = require('express');

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
        if(req.session.user)
        {
            res.render('posts/allGroups',{groups: allGroups, not_logged_in: false});
        }else
        {
            res.render('posts/allGroups',{groups: allGroups, not_logged_in: true});
        }

    }catch(e)
    {
        res.status(400).render('posts/allGroups',{error: e});
    }
});

router.get('/newGroup', async(req,res) =>
{
    if(req.session.user)
    {
        res.render('posts/newGroup', {not_logged_in: false});
    }
    else
    {
        res.render('posts/newGroup', {not_logged_in: true});
    }
});


router.post('/newGroup', upload.single('groupImage'), async(req,res)=>
{
    try
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
    const createGroup= await groups.createGroup(req.body.name,req.body.numOfMembers,req.body.debutDate,
        req.body.awards,req.body.greeting,req.body.fandomName,req.body.fandomColor,req.body.socialMedia,memberNamesList,imagePath);
    return res.redirect('/groups');
    }catch(e)
    {
        res.status(400).render('posts/newGroup',{error: e});
    }
});

router.get('/:id/like', async(req,res) =>
{
    if(req.session.user)
    {
        //req.session.like=true;
        const addNewGroup=await users.addNewGroup(req.session.user,req.params.id);
        const likeGroup=await groups.likeGroup(req.params.id);
        res.redirect('/groups/'+req.params.id);
    }
    else
    {
        res.sendStatus(400);
        //console.log("hi");
        //await Swal.fire(  'Good job!',  'You clicked the button!',  'success')
    }
});

router.get('/:id/unlike', async(req,res) =>
{
    if(req.session.user)
    {
        //req.session.like=false;
        const removeGroup=await users.removeGroup(req.session.user,req.params.id);
        const unlikeGroup=await groups.unlikeGroup(req.params.id);
        res.redirect('/groups/'+req.params.id);
    }
    else
    {
        res.sendStatus(400);
    }
});

router.get('/:id', async(req,res) =>
{
    try
    {
        const group=validation.checkGroupName(req.params.id);
        const findGroup=await groups.findGroup(group);
        const theGroup=findGroup[0].groupInfo;
        if(req.session.user)
        {
            const theUser=await users.findUser(req.session.user);
            const groupsLiked=theUser[0].groupsLiked;
            res.render('posts/groups',{name: theGroup.name, numOfMembers: theGroup.numOfMembers, 
            debutDate: theGroup.debutDate, awards: theGroup.awards, greeting: theGroup.greeting, 
            fandomName: theGroup.fandomName, fandomColor: theGroup.fandomColor, socialMedia: theGroup.socialMedia, memberLinks: theGroup.membersLinks, 
            groupImage: theGroup.groupImage, like: groupsLiked.includes(req.params.id), not_logged_in: false});
        }
        else
        {
            res.render('posts/groups',{name: theGroup.name, numOfMembers: theGroup.numOfMembers, 
                debutDate: theGroup.debutDate, awards: theGroup.awards, greeting: theGroup.greeting, 
                fandomName: theGroup.fandomName, fandomColor: theGroup.fandomColor, socialMedia: theGroup.socialMedia, memberLinks: theGroup.membersLinks, 
                groupImage: theGroup.groupImage, like: false, not_logged_in: true});
        }
    }
    catch(e)
    {
        res.status(400).render('posts/groups',{error: e});
    }
});

module.exports=router;

