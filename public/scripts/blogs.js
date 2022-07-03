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
        let s = comments[i].commenter + ": " + comments[i].content+"<br>";
        //add attribute to each li tag = <li id = "comments.id">
        l.attr("id", comments[i]._id);
        l.append(s); //content

        //https://www.w3schools.com/jquery/jquery_dom_add.asp


        if (user == comments.commenter) {
          //deleteBtn = $("<button><i class=material-icons>delete</i></button>");
          deleteBtn = $("<i></i>");
          deleteBtn.attr("class", "fa-solid fa-circle-xmark");

          // deleteBtn.attr("class", "delete-comment-btn");
          // deleteBtn.on("click", function (event) {
          //   var requestConfig = {
          //     method: "DELETE",
          //     url: window.location.href + "/comment",
          //     data: { commentId: comments[i]._id },
          //   };
          //   $.ajax(requestConfig).then(function (responseMessage) {
          //     if (responseMessage.success) {
          //       errorDiv.text("Comment has been successfully deleted");
          //       $("#" + comments[i]._id).remove();
          //     } else if (responseMessage.error) {
          //       errorDiv.text(responseMessage.error);
          //     } else {
          //       errorDiv.text("Error: comment deletion failed");
          //     }
          //     errorDiv.show();
          //   });
          // });
          l.append(deleteBtn);
        }

        //need to empty
        commentList.append(l);
        commentList.show();

      }
    }

  });

  //add comment
  commentForm.submit(function (event) {
    event.preventDefault();
    console.log("submitted");

    var comment = commentInput.val();

    //https://stackoverflow.com/questions/10633605/clear-form-values-after-submission-ajax
    commentForm[0].reset();

    //error check comment input
    try {
      comment = checkString(comment);
    } catch (e) {
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


        let commenter = responseMessage.user;
        //return singular new comment
        let newComment = responseMessage.comment;

        let l = $("<p></p>");

        let s = newComment.commenter + ": " + newComment.content;
        l.attr("id", newComment._id);
        l.append(s);

        //https://www.w3schools.com/jquery/jquery_dom_add.asp



        if (commenter == newComment.commenter) {
          //deleteBtn = $("<button><i class=material-icons>delete</i></button>");
          deleteBtn = $("<i></i>");
          deleteBtn.attr("class", "fa-solid fa-circle-xmark");
          //need to empty
          commentList.append(l);
          commentList.show();
          noComment.hide();
          errorDiv.hide();
        }
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
