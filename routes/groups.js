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

module.exports=router;

