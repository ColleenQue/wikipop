(function ($)
{
    $("#heart-no-fill").click(function()
    {
        let parameter=document.getElementById("groupName");
        let theURL;
        if(typeof parameter==="undefined" || parameter===null)
        {
            let parameter=document.getElementById("group");
            if(typeof parameter==="undefined" || parameter===null)
            {

            }
            else
            {
                let parameter2=document.getElementById("name").innerHTML;
                parameter=parameter.innerHTML;
                parameter=parameter+'-'+parameter2;
                theURL="/idols/"+parameter+"/like";
            }
        }
        else
        {
            parameter=parameter.innerHTML;
            theURL="/groups/"+parameter+"/like";
        }
        var requestConfig=
        {
            method:"GET",
            url: theURL,
        }
        $.ajax(requestConfig).then(function(responseMessage){
            $("#heart-no-fill-2").hide();
            $("#heart-fill-2").show();
            $("#heart-no-fill").hide();
        }).fail(function(jqXHR, exception)
        {
            if(jqXHR.status ===400)
            {
                alert("Not logged in");
            }
        });

    });

    $("#heart-no-fill-2").click(function()
    {
        let parameter=document.getElementById("groupName");
        let theURL;
        if(typeof parameter==="undefined" || parameter===null)
        {
            let parameter=document.getElementById("group");
            if(typeof parameter==="undefined" || parameter===null)
            {

            }
            else
            {
                let parameter2=document.getElementById("name").innerHTML;
                parameter=parameter.innerHTML;
                parameter=parameter+'-'+parameter2;
                theURL="/idols/"+parameter+"/like";
            }
        }
        else
        {
            parameter=parameter.innerHTML;
            theURL="/groups/"+parameter+"/like";
        }
        var requestConfig=
        {
            method:"GET",
            url: theURL,
        }
        $.ajax(requestConfig).then(function(responseMessage){
            $("#heart-no-fill-2").hide();
            $("#heart-fill-2").show();
            $("#heart-no-fill").hide();
        }).fail(function(jqXHR, exception)
        {
            if(jqXHR.status ===400)
            {
                alert("Not logged in");
            }
        });

    });

    $("#heart-fill").click(function()
    {
        let parameter=document.getElementById("groupName");
        let theURL;
        if(typeof parameter==="undefined" || parameter===null)
        {
            let parameter=document.getElementById("group");
            if(typeof parameter==="undefined" || parameter===null)
            {

            }
            else
            {
                let parameter2=document.getElementById("name").innerHTML;
                parameter=parameter.innerHTML;
                parameter=parameter+'-'+parameter2;
                theURL="/idols/"+parameter+"/unlike";
            }
        }
        else
        {
            parameter=parameter.innerHTML;
            theURL="/groups/"+parameter+"/unlike";
        }
        var requestConfig=
        {
            method:"GET",
            url: theURL,
        }
        $.ajax(requestConfig).then(function(responseMessage){
            $("#heart-fill-2").hide();
            $("#heart-no-fill-2").show();
            $("#heart-fill").hide();
        }).fail(function(jqXHR, exception)
        {
            if(jqXHR.status ===400)
            {
                alert("Not logged in");
            }
        });
    });

    $("#heart-fill-2").click(function()
    {
        let parameter=document.getElementById("groupName");
        let theURL;
        if(typeof parameter==="undefined" || parameter===null)
        {
            let parameter=document.getElementById("group");
            if(typeof parameter==="undefined" || parameter===null)
            {

            }
            else
            {
                let parameter2=document.getElementById("name").innerHTML;
                parameter=parameter.innerHTML;
                parameter=parameter+'-'+parameter2;
                theURL="/idols/"+parameter+"/unlike";
            }
        }
        else
        {
            parameter=parameter.innerHTML;
            theURL="/groups/"+parameter+"/unlike";
        }
        var requestConfig=
        {
            method:"GET",
            url: theURL,
        }
        $.ajax(requestConfig).then(function(responseMessage){
            $("#heart-fill-2").hide();
            $("#heart-no-fill-2").show();
            $("#heart-fill").hide();
        }).fail(function(jqXHR, exception)
        {
            if(jqXHR.status ===400)
            {
                alert("Not logged in");
            }
        });
    });
})(window.jQuery)