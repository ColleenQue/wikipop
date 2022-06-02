const dbConnection=require('./config/mongoConnection');
const data=require('./data');

const users=data.users;

async function main()
{
    const db=await dbConnection.connectToDb();
    await db.dropDatabase();
    try
    {
        let username="albertchen546";
        let password="albertchenthebest";
        await users.createUser(username,password);
    }catch(e)
    {
        console.log("Got error "+e);
    }

    console.log("DONE");
    await dbConnection.closeConnection();
}

main();