<<<<<<< HEAD

module.exports = {
  checkUsername(username) {
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

  checkPassword(password) {
    if (!password) throw "must provide password"
    if (typeof password !== "string")
        throw "Error: password should be a string";
    if (password.indexOf(" ") >= 0)
        throw "Error: password should not have any spaces";
    password = password.trim();
    if (password.length < 6)
        throw "Error: password must have at least eight characters";
    return password;
  }
};
=======
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
        if(typeof age!="number" || age.trim()==="")
        {
            throw "Error: Idol Age is not valid"
        }
        return age;
    },
    checkDOB(dob)
    {
        //check if dob is in right format: format is MM/DD/YYYY
        const birth = /^\d{2}\/\d{2}\/\d{4}$/;
        if(!dob.match(birth))
        {
            throw "Error: Date of Birth is not in the right format"
        }
        return dob;
    },
    checkHeight(height)
    {
        if(typeof height!="number" || height.trim()==="")
        {
            throw "Error: Idol Height is not valid"
        }
        return height;
    },
    checkWeight(weight)
    {
        if(typeof weight!="number" || weight.trim()==="")
        {
            throw "Error: Idol Weight is not valid"
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
>>>>>>> main
