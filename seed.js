const dbConnection=require('./config/mongoConnection');
const data=require('./data');

const users=data.users;
const blogs = data.blogs;
const groups=data.groups;
const idols=data.idols;

async function main()
{
    const db=await dbConnection.connectToDb();
    await db.dropDatabase();

    try
    {
        let username="albertchen546";
        let password="albertchenthebest";
        await users.createUser(username,password);
    }
    catch(e)
    {
        console.log("Got error "+e);
    }
    try
    {
        let name1="albertchen546";
        let title1="albertchenthebest";
        let content1 ="blahblahblah"
        await blogs.createBlog(name1,title1,content1);

        let name2="albertchen546";
        let title2="albertchennumber1";
        let content2 ="blahblahblah"
        await blogs.createBlog(name2,title2,content2);

    }catch(e)
    {
        console.log("Got error "+e);
    }

    try
    {
        let name="asepa";
        let numOfMembers=4;
        let debutDate="2020-11-17";
        let awards=3;
        let greeting="Be my ae! Hi, we are æspa!";
        let fandomName="MY";
        let fandomColor="Aurora";
        let socialMedia=[{type: "instagram", handle: "@aespa_official"},{type: "twitter", handle: "@Aespa_Official"},
    {type: "youtube", handle: "asepa"},{type:"tiktok",handle:"@aespa_official"}];
        let membersLinks=["Karina","Giselle","Winter","NingNing"];
        let groupImage="/public/img/asepa.jpg";
        await groups.createGroup(name,numOfMembers,debutDate,awards,greeting,fandomName,fandomColor,socialMedia,membersLinks,groupImage);
    }catch(e)
    {
        console.log("Got Error "+e);
    }

    try
    {
        let name="Karina";
        let group="asepa";
        let role="Leader, Main Dancer, Lead Rapper, Sub Vocalist, Visual, Face Of The Group, Center";
        let age=22;
        let dob="2000-04-11";
        let height="5'6\"";
        let weight=99;
        let fandomName="MY";
        let fandomColor="Aurora";
        let funFacts=["She was born in Paldal-gu, Gyeonggi-do, South Korea.","She’s the tallest member.","She has a black belt in taekwando."];
        let socialMedia=[{type: "instagram", handle: "@aespa_official"},{type: "twitter", handle: "@Aespa_Official"},
        {type: "youtube", handle: "asepa"},{type:"tiktok",handle:"@aespa_official"}];
        let idolImage="/public/img/karina.jpeg";
        await idols.createIdol(name,role,group,age,dob,height,weight,fandomName,fandomColor,funFacts,socialMedia,idolImage);
    }catch(e)
    {
        console.log("Got Error "+e);
    }

    console.log("DONE");
    await dbConnection.closeConnection();

}

main();