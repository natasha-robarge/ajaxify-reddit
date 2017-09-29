/* GLOBAL VARIABLES UP HERE */
var frontPage = 'https://www.reddit.com/.json';

$(document).ready(function(){
/* FUNCTION EXECUTION HERE */
  console.log('Go forth and code!');

  //AJAX data

  function getRedditData(data){
    $.ajax({
      method: 'GET',
      url: frontPage,
      dataType: 'json',
      success: onSuccess,
      error: onError
    });
  }
  getRedditData();

});

//Method Functions for AJAX

function onSuccess(data){
  console.log('Success!');
  console.log(data);
  //object, object, array
  var grabDataArray = data.data.children;
    for(var i = 0; i < grabDataArray.length; i++) {
      $('#main').append(`<h3> ${grabDataArray[i].data.title} </h3>\n <hr>`);
      $('#main').append(`<h5> ${grabDataArray[i].data.author} to ${grabDataArray[i].data.subreddit_name_prefixed}</h5>\n<p></p>`);
    }
    getTimeInHours(data);
    printImages(data);
    isUpVote(data);
}

function onError(data){
  console.log('Failed!');
}

//Get time in hours

function getTimeInHours(data){
  var grabDataArray = data.data.children;
  var postHeadings = $('h5');
    grabDataArray.forEach((el, index) => {
      var currentDate = new Date(el.data.created * 1000);
      var dateNow = Date.now();
      var epochDate = currentDate - dateNow;
      var currentHours = Math.floor(Math.abs((epochDate) / 1000 / 60 / 60));
      //console.log(currentHours)
      $(postHeadings).eq(index).prepend(`Submitted ${currentHours} hours ago`);
    })
}

//Prints images to div

function printImages(data){
  var grabDataArray = data.data.children;
  var postHeadingP = $('#main p');
  grabDataArray.forEach((el, idx) => {
    var grabDataInChildren = el.data.preview.images;
      grabDataInChildren.forEach((child, index) => {
        //console.log(child.source.url, ' url')
        $(postHeadingP).eq(idx).prepend(`<a href='${'https://www.reddit.com' + el.data.permalink}'><img src='${child.source.url}' width='120px' height='140px'></a>`);
      });
  });
}

//Adds upvotes

function isUpVote(data){
  var postP = $('#main p');
  var counter = 1;
  $(postP).append(`<button class='upvote' type='button'>Upvote</button><hr>`);
  postP.on(`click`, (evt, idx) => {
    for(var i = 0; i < postP.length; i++) {
      $('.upvote').eq(i).append(' ').text(counter);

      return parseInt(counter++);
    }
  });
}



/* FUNCTION DEFINITION HERE */
/* TIP: don't forget scope! */
