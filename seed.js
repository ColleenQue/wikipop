const dbConnection=require('./config/mongoConnection');
const data=require('./data');

const users=data.users;
const blogs = data.blogs;

async function main()
{
    const db=await dbConnection.connectToDb();
    await db.dropDatabase();
    try
    {
        let username="albertchen546";
        let password="albertchenthebest";
        await users.createUser(username,password);
        let tag="cs546";
        await users.addNewTag(username,tag);
    }catch(e)
    {
        console.log("Got error "+e);
    }

    try
    {
        let username="albertchen5462";
        let password="albertchenthebest";
        await users.createUser(username,password);
        let tag="cs546";
        await users.addNewTag(username,tag);
    }catch(e)
    {
        console.log("Got error "+e);
    }


    
    try
    {
        let name="albertchen546";
        let title="albertchenthebest";
        let content ="blahblahblah"
        await blogs.createBlog(name,title,content);

    }catch(e)
    {
        console.log("Got error "+e);
    }

    console.log("DONE");
    await dbConnection.closeConnection();







}

main();