{
    // create post for summinting the data
    let creatPost=()=>{
       
        let newPostform=$('#post-sumthing');
        newPostform.submit((e)=>{
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/users',
                data:newPostform.serialize(),
                success:(data)=>{
                    console.log(data.data);
                   let doc= newPost(data.data);
                   $('#all-post>ul').prepend(doc);
                },
                error:(err)=>{
                    console.log(err.responseText);
                }
            });
        });
    }


// creatPost(); 
// create comment
let createComment=()=>{
       
  let newPostform=$('#comment-sumthing');
  newPostform.submit((e)=>{
      e.preventDefault();
      $.ajax({
          type:'post',
          url:'/users/comment',
          data:newPostform.serialize(),
          success:(data)=>{
              console.log(data.data);
              let doc=newComment(data.data);
              $('#upper-comment>ul').prepend(doc);
          },
          error:(err)=>{
              console.log(err.responseText);
          }
      });
  });
}
// createComment();

// create post in DOM
let newComment=(comment)=>{
   return $(`
    <a href="/users/deleatcomment/${comment.comment._id}"><i class="fa fa-trash"></i></a> 
  <div class="comment-element">           
  <h3>${comment.comment.content}</h3>
  <h5><small>Commented by: </small>${comment.name}</h5>
  </div>
  `)
}

let newPost=(data)=>{
    return $(`<div class="post-element">
   
      <a  class="deleat-post-btn" href="/users/deleatpost/${data.post._id}"><i class="fa fa-trash"></i></a>
      
     <h1>${data.post.content}</h1>
     <h2><small>Posted By: </small>${data.user.name}</h2>
    <div class="upper-comment" id="upper-comment">
    <ul>
      <div id="${data.post._id}">
      <div>

    </ul> 
   </div>
<div class="me-commenthu">
  <form action="/users/comment" id="${data.post._id}" method="post">
     <input type="text" name="content" placeholder="comment">
     <input type="hidden" name="post" value="${data.post._id}" >
     <input type="submit"   value="comment">
  </form>
</div> 
</div>`)
}
}