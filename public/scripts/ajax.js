(function ($)
{
    $("#heart-no-fill").click(function()
    {
        let groupName=document.getElementById("groupName").innerHTML;
        var requestConfig=
        {
            method:"GET",
            url:"/groups/"+groupName+"/like",
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
        let groupName=document.getElementById("groupName").innerHTML;
        var requestConfig=
        {
            method:"GET",
            url:"/groups/"+groupName+"/like",
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
        let groupName=document.getElementById("groupName").innerHTML;
        var requestConfig=
        {
            method:"GET",
            url:"/groups/"+groupName+"/unlike",
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
        let groupName=document.getElementById("groupName").innerHTML;
        var requestConfig=
        {
            method:"GET",
            url:"/groups/"+groupName+"/unlike",
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