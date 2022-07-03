(function ($)
{
    $("#heart-no-fill").click(function()
    {
        $("#heart-no-fill").hide();
        $("#heart-fill").show();
        let groupName=document.getElementById("groupName").innerHTML;
        var requestConfig=
        {
            method:"GET",
            url:"/groups/"+groupName+"/like"
        }
        $.ajax(requestConfig).then(function(responseMessage){});

    });

    $("#heart-fill").click(function()
    {
        $("#heart-fill").hide();
        $("#heart-no-fill").show();
        let groupName=document.getElementById("groupName").innerHTML;
        var requestConfig=
        {
            method:"GET",
            url:"/groups/"+groupName+"/unlike"
        }
        $.ajax(requestConfig).then(function(responseMessage){});
    });
})(window.jQuery)