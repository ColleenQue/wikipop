
module.exports = {
   logging(time,method,route,authenticated) {
       if(authenticated){
        console.log(time+": " +method+route+"(Authenticated User)")
       }
       else{
        console.log(time+": "+method+route+"(Non-Authenticated User)")
       }

   }};