const moment = require("moment");
const { ObjectId } = require("mongodb");

module.exports = {
  checkUserName(username) {
    if (!username) throw "must provide username"
    if (typeof username !== "string")
        throw "Error: username should be a string";
    if (username.indexOf(" ") >= 0)
        throw "Error: username should not have any spaces";
    username = username.trim();
    if (username.length < 4)
        throw "Error: username must have at least four characters";
    //check for alphnumeric 
    //https://stackoverflow.com/questions/4434076/best-way-to-alphanumeric-check-in-javascript

    for (let i = 0; i < username.length; i++) {
        let code = username.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) { // lower alpha (a-z)
            throw "username must have only alphanumeric characters"
        }
    }

    return username;
  },

  checkPassWord(password) {
    if (!password) throw "must provide password"
    if (typeof password !== "string")
        throw "Error: password should be a string";
    if (password.indexOf(" ") >= 0)
        throw "Error: password should not have any spaces";
    password = password.trim();
    if (password.length < 6)
        throw "Error: password must have at least eight characters";
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
        numOfMembers=parseInt(numOfMembers,10);
        if(typeof numOfMembers!= "number")
        {
            throw "Error: Number of Members is not a valid number"
        }
        return numOfMembers;
    },
    checkDebutDate(debutDate)
    {
        //check if date is in right format: format is YYYY-MM-DD
        /*
        const date = /^\d{4}\/\d{4}\/\d{2}$/;
        console.log(date);
        if(!debutDate.match(date))
        {
            throw "Error: Debut Date is not in the right format"
        }
        return debutDate;
        */
       if(!moment(debutDate,"YYYY-MM-DD",true).isValid())
       {
           throw "Error: Debut Date is not in the right format"
       }
       return debutDate;
    },
    checkAwards(awards)
    {
        awards=parseInt(awards);
        if(typeof awards!= "number")
        {
            throw "Error: Number of Awards is not a valid number"
        }
        return awards;
    },
    checkGreeting(greeting)
    {
        if(greeting=="")
        {
            return greeting;
        }
        if(typeof greeting!="string" || greeting.trim()==="")
        {
            throw "Error: Greeting is not valid"
        }
        return greeting;
    },
    checkFandomName(fandomName)
    {
        if(fandomName=="")
        {
            return fandomName;
        }
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
            if(typeof socialMedia[i] != "object")
            {
                throw "Error: Social Media Accounts is not valid"
            }
            /*
            if(!socialMedia[i].hasOwnProperty('type') || !socialMedia[i].hasOwnProperty('handle'))
            {
                throw "Error: Social Media Accounts is not valid"
            }
            */
           if(!("type" in socialMedia[i]) || !("handle" in socialMedia[i]))
           {
            throw "Error: Social Media Accounts is not valid"
           }
            if(typeof socialMedia[i].type !="string" || typeof socialMedia[i].handle != "string")
            {
                throw "Error: Social Media Accounts is not valid"
            }
        }
        return socialMedia;
    },
    checkMemberNames(memberNames)
    {
        if(typeof memberNames!="string" || memberNames.trim()=="")
        {
            throw "Error: Member Names are not valid"
        }
        return memberNames;
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
    //Idol Validation
    checkIdolName(name)
    {
        if(typeof name!="string" || name.trim()==="")
        {
            throw "Error: Idol Name is not valid"
        }
        return name;
    },
    checkRole(role)
    {
        if(typeof role!="string" || role.trim()==="")
        {
            throw "Error: Idol Role is not valid"
        }
        return role;
    },
    checkAge(age)
    {
        age=parseInt(age);
        if(typeof age!="number")
        {
            throw "Error: Idol Age is not valid"
        }
        return age;
    },
    checkDOB(dob)
    {
        //check if dob is in right format: format is YYYY-MM-DD
        if(!moment(dob,"YYYY-MM-DD",true).isValid())
        {
            throw "Error: Date of Birth is not in the right format"
        }
        return dob;
    },
    checkHeight(height)
    {
        if(typeof height!="string" || height.trim()==="")
        {
            throw "Error: Idol Height is not valid"
        }
        return height;
    },
    checkWeight(weight)
    {
        weight=parseInt(weight);
        if(typeof weight!="number")
        {
            throw "Error: Idol Age is not valid"
        }
        return weight;
    },
    checkfunFacts(funFacts)
    {
        if(!Array.isArray(funFacts))
        {
            throw "Error: Idol Fun Facts Are Not Valid"
        }
        for(let i=0;i<funFacts.length;i++)
        {
            if(typeof funFacts[i]!="string")
            {
                throw "Error: Idol Fun Facts Are Not Valid"
            }
        }
        return funFacts;
    },
    //idk how to check if links are valid
    checkBlogPageLink(blogLink)
    {
        if(typeof blogLink!="string" || blogLink.trim()==="")
        {
            throw "Error: Blog Link is not valid"
        }
        return blogLink;
    },
    checkIdolID(idolID)
    {
        if(!ObjectId.isValid(idolID))
        {
            throw "Error: IdolID is not valid"
        }
        return idolID;
    },
    //Blogs Validation
    checkBlogName(name)
    {
        if(typeof name!="string" || name.trim()==="")
        {
            throw "Error: Blog Name is not valid"
        }
        return name;
    },
    checkBlogTitle(title)
    {
        if(typeof title!="string" || title.trim()==="")
        {
            throw "Error: Blog Name is not valid"
        }
        return title;
    },
    checkBlogContent(content)
    {
        if(typeof content!="string" || content.trim()==="")
        {
            throw "Error: Blog Content is not valid"
        }
        return content;
    },
    //Story Validation
    checkOwner(owner)
    {
        if(typeof owner!="string" || owner.trim()==="")
        {
            throw "Error: Story Owner is not valid"
        }
        return owner;
    },
    checkWriter(writer)
    {
        if(typeof writer!="string" || writer.trim()==="")
        {
            throw "Error: Story Writer is not valid"
        }
        return writer;
    },
    checkStoryCollection(storyCollection)
    {
        if(typeof storyCollection!= "object")
        {
            if(typeof storyCollection!="null")
            {
                throw "Error: storyCollection is not valid"
            }
        }
        return storyCollection;
    },
    checkStoryTitle(title)
    {
        if(typeof title!="string" || title.trim()==="")
        {
            throw "Error: Story Title is not valid"
        }
        return title;
    },
    checkStoryText(text)
    {
        if(typeof text!="string" || text.trim()==="")
        {
            throw "Error: Story Text is not valid"
        }
        return text;
    },
    checkComments(comments)
    {
        if(!Array.isArray(comments))
        {
            throw "Error: Story Comments Are Not Valid"
        }
        for(let i=0;i>comments.length;i++)
        {
            if(!ObjectId.isValid(comments[i]))
            {
                throw "Error: Story Comments Are Not Valid"
            }
        }
        return comments;
    },
    checkContent(content)
    {
        if(!content){
            throw "must provide content"
        }
        if(typeof content!= "string"){
            throw "content must be a string"
        }
        return content;

    },
    checkListOfTags(tagsList)
    {
        if(!Array.isArray(tagsList))
        {
            throw "Error: Story Tags Are Not Valid"
        }
        for(let i=0;i>tagsList.length;i++)
        {
            if(typeof tagsList[i]!="string")
            {
                throw "Error: Story Tags Are Not Valid"
            }
        }
        return tagsList;
    },
    checkNumOfSaves(numOfSaves)
    {
        if(typeof numOfSaves!= "number" || numOfSaves.trim()==="")
        {
            throw "Error: Number of Saves is not a valid number"
        }
        return numOfSaves;
    }
}