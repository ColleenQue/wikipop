module.exports=
{
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
    }

}