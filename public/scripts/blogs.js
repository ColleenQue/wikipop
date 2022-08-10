
(function ($) {
  // Let's start writing AJAX calls!
  //page load

  //corresponds to id

  var commentList = $("#comments"),
    noComment = $("#no_comments"),
    commentForm = $("#commentForm"),
    commentInput = $("#comment_term"),
    errorDiv = $("#error");

    

  function checkString(string) {
    if (!string) throw "must provide text input";
    if (typeof string !== "string") throw "invalid string input";
    if (string.trim().length === 0)
      throw "string cannot be an empty string or just spaces";
    return string;
  }


  //get all comments
  var allComments = {
    method: "GET",
    //https://stackoverflow.com/questions/1696429/get-the-current-url-but-without-the-http-part-bookmarklet
    //equivalent to geting /detailed/:id/comment
    url: window.location.pathname + "/comments",
  };

  $.ajax(allComments).then(function (responseMessage) {
    //get all comments
    //responses with list of comment objects
    // commentList = []; //empty out


    //list of all comments
    let comments = responseMessage.comments;

    //use comments[i] for individual comments 

    //session user
    let user = responseMessage.user;


    if (comments.length == 0) {
      commentList.hide();
      noComment.show();

    } else {
      noComment.hide();
      for (let i = 0; i < comments.length; i++) {
        //add each comment to the list
        let l = $("<p></p>");
        let s = comments[i].commenter + ": " + comments[i].content;
        //add attribute to each li tag = <li id = "comments.id">
        l.attr("id", comments[i]._id);
        l.append(s); //content
        l.append("&nbsp;&nbsp;&nbsp;");//for buttons

        //https://www.w3schools.com/jquery/jquery_dom_add.asp

        if (user && user === comments[i].commenter) {

          let del = $("<i></i>");
          del.attr("class", "fa-regular fa-trash-can");

          let edit = $("<i></i>");
          edit.attr("class", "fa-regular fa-pen-to-square");


          del.on("click", function (event) {
            console.log("sad");
            console.log(window.location.href + "/comments");

            var rc = {
              method: "DELETE",
              url: window.location.href + "/comments",
              data: { commentId: comments[i]._id },
            };

            $.ajax(rc).then(function (responseMessage) {

              console.log("rc");
              if (responseMessage.success) {
                console.log("hi");
                errorDiv.text("Comment has been successfully deleted");

                $("#" + comments[i]._id).remove();
              } else if (responseMessage.error) {
                errorDiv.text(responseMessage.error);
              } else {
                errorDiv.text("Error: comment deletion failed");
              }
              errorDiv.show();
            });
          });

          l.append(del);
          l.append(" ");
          l.append(edit);
        }


        //comments here

        let comment = $("<i></i>");
        comment.attr("class", "fa-regular fa-comment-dots");

        l.append(" ");
        l.append(comment);

        //get subcomments

        let subComments = $("<br><br><div class = \"subComments\" <p></p></div>");


        for (let z = 0; z < comments[i].comments.length; z++) {

          let l1 = $("<p></p>");
          let s2 = comments[i].comments[z].commenter + ": " + comments[i].comments[z].content;
          //add attribute to each li tag = <li id = "comments.id">
          l1.attr("id", comments[i]._id);
          l1.append(s2); //content
          l1.append("&nbsp;&nbsp;&nbsp;");//for buttons

          subComments.append(l1);
          subComments.append("<hr>");
        }


        let text;


        if (user) {
          text =
            $("<form id=\"subCommentForm\" method=\"POST\" action=\"subComments/" + comments[i]._id + "\"><label for=\"sub_comment_term\">Reply</label> <br /><textarea id=\"sub_comment_term\" name=\"subComment\" rows=\"2\" cols=\"30\"placeholder=\"Enter comment\"> </textarea><br><button type=\"submit\" class=\"submit-button\">Submit</button></form>");
          //get all subcomments for comment? 


          text.submit(function (event) {

            
            alert("successfully added comment! refresh to see")
            // Swal.fire(
            //   'Good job!',
            // )
            
            history.go(0);
            window.location.href=window.location.href
            setTimeout(window.location.reload(true))
            // l1 = $("<p></p>");
            // var subCommentInput = $("#sub_comment_term");
            // s2 = user + ": " + subCommentInput.val();
            // console.log( subCommentInput.val());
            // //add attribute to each li tag = <li id = "comments.id">
            // //l1.attr("id", comments[i]._id);
            // l1.append(s2); //content
            // l1.append("&nbsp;&nbsp;&nbsp;");//for buttons

            // subComments.append(l1);
            // subComments.append("<hr>");

          })



          //detailed/subComments/:id
        }
        else {
          if (comments[i].comments.length == 0) {

            text = $("<br><p class = \"alert\">Log in to add subcomment!</p><br>")
          }
          else {
            text = $("<p class = \"alert\">Log in to add subcomment!</p><br>")
          }
        }

        subComments.append(text);

        l.append(subComments);
        // l.append(text);
        subComments.hide();
        text.hide();



        comment.on("click", function (event) {

          if (text.is(":visible")) {
            subComments.hide();
            text.hide();
          }
          else {
            subComments.show();
            text.show();
          }


          // var requestConfig = {
          //   method: "GET",
          //   url: window.location.href + "/comment/" + comment[i]._id ,
          //   data: { commentId: comments[i]._id },
          // };

          // $.ajax(requestConfig).then(function (responseMessage) {
          //   if (responseMessage.success) {
          //     errorDiv.text("Comment has been successfully deleted");
          //     $("#" + comments[i]._id).remove();
          //   } else if (responseMessage.error) {
          //     errorDiv.text(responseMessage.error);
          //   } else {
          //     errorDiv.text("Error: comment deletion failed");
          //   }
          //   errorDiv.show();

          // });
        });



        //need to empty

        l.append("<hr>");
        commentList.append(l);
        commentList.show();

      }
    }

  });

  //add comment
  commentForm.submit(function (event) {


    event.preventDefault();

    var comment = commentInput.val();
    console.log(commentInput.val());
    //https://stackoverflow.com/questions/10633605/clear-form-values-after-submission-ajax
    commentForm[0].reset();

    //error check comment input
    try {
      comment = checkString(comment);
      console.log(comment);
    } catch (e) {
      console.log("peppa pig");
      errorDiv.empty();
      errorDiv.show();
      errorDiv.text(e);
      return;
    }

    //deal with commenter in routes

    var requestConfig = {
      method: "POST",
      //https://stackoverflow.com/questions/1696429/get-the-current-url-but-without-the-http-part-bookmarklet
      url: window.location.pathname + "/comments",
      data: { comment: comment },
      //request.body.comment
    };

    $.ajax(requestConfig).then(function (responseMessage) {
      //add comment successful
      if (responseMessage.success) {

        //return singular new comment
        let newComment = responseMessage.comment;

        let l = $("<p></p>");

        let s = newComment.commenter + ": " + newComment.content;
        l.attr("id", newComment._id);
        l.append(s);

        //https://www.w3schools.com/jquery/jquery_dom_add.asp

        //no need to check whoever commented the new comment bc that is YOU! 

        l.append("&nbsp;&nbsp;&nbsp;");//for buttons

        let del = $("<i></i>");
        del.attr("class", "fa-regular fa-trash-can");

        let edit = $("<i></i>");
        edit.attr("class", "fa-regular fa-pen-to-square");

        let comment = $("<i></i>");
        comment.attr("class", "fa-regular fa-comment-dots");

        l.append(del);
        l.append(" ");
        l.append(edit);
        l.append(" ");
        l.append(comment);
        l.append("<br>");



        //need to empty
        commentList.append(l);
        commentList.show();
        noComment.hide();
        errorDiv.hide();

      }
      else {
        //TODO test
        let e = responseMessage.error;
        errorDiv.empty();
        errorDiv.show();
        errorDiv.text(e);
        return;
      }
    });
  })

})(window.jQuery);
