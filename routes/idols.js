const express = require('express');
const router = express.Router();
const validation = require('../validation');
const groups=require('../data/groups');
const idols = require('../data/idols');
const multer=require('multer');
const users=require('../data/users');
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


let savedGroup="";

router.get('', async(req,res)=>
{
    try
    {
        const allIdols=await idols.getAllIdols();
        console.log(allIdols);
        res.render('posts/allIdols',{idols: allIdols});
    }catch(e)
    {
        res.status(400).render('posts/allIdols',{error: e});
    }
});

router.post('/newIdol', upload.single('idolImage'), async(req,res)=>
{
    try
    {
        req.body.idolName=validation.checkIdolName(req.body.idolName);
        req.body.role=validation.checkRole(req.body.role);
        req.body.groupName=validation.checkGroupName(req.body.groupName);
        req.body.age=validation.checkAge(req.body.age);
        req.body.dob=validation.checkDOB(req.body.dob);
        req.body.height=validation.checkHeight(req.body.height);
        req.body.weight=validation.checkWeight(req.body.weight);
        req.body.fandomName=validation.checkFandomName(req.body.fandomName);
        req.body.fandomColor=validation.checkFandomColor(req.body.fandomColor);
        req.body.funFacts=validation.checkfunFacts(req.body.funFacts);
        req.body.socialMedia=validation.checkSocialMedia(req.body.socialMedia);
        let imagePath=req.file.path.replaceAll("\\","/");
        const createIdol=idols.createIdol(req.body.idolName,req.body.role,req.body.groupName,req.body.age,req.body.dob,req.body.height,
            req.body.weight,req.body.fandomName,req.body.fandomColor,req.body.funFacts,req.body.socialMedia,imagePath);
        if(req.body.groupName==="solo")
        {
            return res.redirect('/idols');
        }
        else
        {
            return res.redirect('/groups/'+req.body.groupName);
        }
    }catch(e)
    {
        res.status(400).render('posts/newIdol',{error: e});
    }

});

router.get('/newIdol', async(req,res) =>
{
    res.render('posts/newIdol',{groupName: savedGroup});
});

router.get('/:id/like',async(req,res) => 
{
    if(req.session.user)
    {
        let idolGroup=req.params.id.split("-");
        const addNewIdol=await users.addNewIdol(req.session.user,idolGroup[0],idolGroup[1]);
        const likeIdol=await idols.likeIdol(idolGroup[1],idolGroup[0]);
        res.redirect('/idols/'+req.params.id);
    }
    else
    {
        res.sendStatus(400);
    }
});

router.get('/:id/unlike',async(req,res) =>
{
    if(req.session.user)
    {
        let idolGroup=req.params.id.split("-");
        const removeIdol=await users.removeIdol(req.session.user,idolGroup[0],idolGroup[1]);
        const unlikeIdol=await idols.unlikeIdol(idolGroup[1],idolGroup[0]);
        res.redirect('/idols/'+req.params.id);
    }
    else
    {
        res.sendStatus(400);
    }
});

router.get('/:id',async(req,res) =>
{
    let idolGroup=req.params.id.split("-");
    //savedGroup=idolGroup[0];
    try
    {
        if(idolGroup[0]!="solo")
        {
            const theGroup=await groups.findGroup(idolGroup[0]);
            const theMembers=theGroup[0].groupInfo.membersLinks;
            let match=false;
            for(let i=0;i<theMembers.length;i++)
            {
                if(theMembers[i]===idolGroup[1])
                {
                    match=true;
                    break;
                }
            }
            if(match===false)
            {
                res.status(400).render('posts/idol',{error: "Cannot find Idol"});
            }
        }
        const theIdol=await idols.findIdolBasedOnName(idolGroup[1],idolGroup[0]);
        if(req.session.user)
        {
            const theUser=await users.findUser(req.session.user);
            const idolsLiked=theUser[0].idolsLiked;
            const theGroup=idolGroup[0];
            const getIdol=idolGroup[1];
            let idolLiked=false;
            for(let i=0;i<idolsLiked.length;i++)
            {
                if(idolsLiked[i].groupName===theGroup && idolsLiked[i].idolName===getIdol)
                {
                    idolLiked=true;
                    break;
                }
            }
            res.render('posts/idol',{name: theIdol.name, role: theIdol.role, group: theIdol.group, age: theIdol.age, dob: theIdol.dob, height: theIdol.height,
            weight: theIdol.weight, fandomName: theIdol.fandomName, fandomColor: theIdol.fandomColor, funFacts: theIdol.funfacts, socialMedia: theIdol.socialMedia,
            idolImage: theIdol.idolImage, like: idolLiked});
        }
        else
        {
            res.render('posts/idol',{name: theIdol.name, role: theIdol.role, group: theIdol.group, age: theIdol.age, dob: theIdol.dob, height: theIdol.height,
            weight: theIdol.weight, fandomName: theIdol.fandomName, fandomColor: theIdol.fandomColor, funFacts: theIdol.funfacts, socialMedia: theIdol.socialMedia,
            idolImage: theIdol.idolImage, like: false});
        }
    }catch(e)
    {
        if(e==="Error: Could not find Idol")
        {
            res.render('posts/idol',{error: "No information about idol. Create One Below", create: "Input Idol Information Here"});
        }
        else
        {
            res.status(400).render('posts/idol',{error: e});
        }
    }
});

module.exports=router;