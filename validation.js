const { ObjectId } = require("mongodb");

module.exports=
{
    //Users Validation
    checkUserName(username)
    {
        if(username.length < 4 || !(/^[A-Za-z0-9]*$/.test(username)) || username.indexOf(" ")>-1)
        {
            throw 'Error: The Username is not in the correct format'
        }
        return username;
    },
    checkPassWord(password)
    {
        if(password.length<6 || password.indexOf(" ")>-1)
        {
           throw "Error: The Password is not in the correct format"
        }
        return password;
    },
    checkTag(tag)
    {
        if(typeof tag != "string" || tag.indexOf(" ")>-1)
        {
            throw "Error: The Tag is not in the correct format"
        }
        return tag;
    },
    checkBlogID(blogID)
    {
        if(!ObjectId.isValid(blogID))
        {
            throw "Error: BlogID is not valid"
        }
        return blogID;
    },
    checkCommentID(commentID)
    {
        if(!ObjectId.isValid(commentID))
        {
            throw "Error: CommentID is not valid"
        }
        return commentID;
    },
    checkpageID(pageID)
    {
        if(!ObjectId.isValid(pageID))
        {
            throw "Error: PageID is not valid"
        }
        return pageID;
    },
    //Groups/Solo Validation
    checkGroupName(name)
    {
        if(typeof name!="string" || name.trim()==="")
        {
            throw "Error: Group Name is not valid"
        }
        return name;
    },
    checkNumOfMembers(numOfMembers)
    {
        if(typeof numOfMembers!= "number" || numOfMembers.trim()==="")
        {
            throw "Error: Number of Members is not a valid number"
        }
        return numOfMembers;
    },
    checkDebutDate(debutDate)
    {
        //check if date is in right format: format is MM/DD/YYYY
        const date = /^\d{2}\/\d{2}\/\d{4}$/;
        if(!debutDate.match(date))
        {
            throw "Error: Debut Date is not in the right format"
        }
        return debutDate;
    },
    checkAwards(awards)
    {
        if(typeof awards!= "number" || awards.trim()==="")
        {
            throw "Error: Number of Awards is not a valid number"
        }
        return awards;
    },
    checkGreeting(greeting)
    {
        if(typeof greeting!="string" || greeting.trim()==="")
        {
            throw "Error: Greeting is not valid"
        }
        return greeting;
    },
    checkFandomName(fandomName)
    {
        if(typeof fandomName!="string" || fandomName.trim()==="")
        {
            throw "Error: Fandom Name is not valid"
        }
        return fandomName;
    },
    checkFandomColor(color)
    {
        if(typeof color!="string" || color.trim()==="")
        {
            throw "Error: Color is not valid"
        }
        return color;
    },
    //idk how to check if links are valid
    checkSocialMedia(socialMedia)
    {
        if(!Array.isArray(socialMedia))
        {
            throw "Error: Social Media Accounts is not valid"
        }
        //checking if array is array of tuples as in [[Social Media Type, Social Media Link]]
        for(let i=0;i<socialMedia.length;i++)
        {
            if(!Array.isArray(socialMedia[i]) || socialMedia[i].length!=2)
            {
                throw "Error: Social Media Accounts is not valid"
            }
            if(typeof socialMedia[i][0]!="string")
            {
                throw "Error: Social Media Accounts is not valid"
            }
        }
        return socialMedia;
    },
    checkMemberLinks(membersLinks)
    {
        if(!Array.isArray(membersLinks))
        {
            throw "Error: Member Links is not valid"
        }
        return membersLinks;
    },
    checkNumOfLikes(numOfLikes)
    {
        if(typeof numOfLikes!= "number" || numOfLikes.trim()==="")
        {
            throw "Error: Number of Likes is not a valid number"
        }
        return numOfLikes;
    },
}