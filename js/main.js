/* GLOBAL VARIABLES UP HERE */
var frontPage = 'https://www.reddit.com/.json';

$(document).ready(function(){
/* FUNCTION EXECUTION HERE */
  console.log('Go forth and code!');

});

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

//Method Functions for AJAX

function onSuccess(data){
  console.log('Success!');
  console.log(data);
  //object, object, array
  var grabDataArray = data.data.children;
    for(var i = 0; i < grabDataArray.length; i++) {
      $('#main').append(`<h3> ${grabDataArray[i].data.title} </h3>\n`);
      $('#main').append(`<h5> ${grabDataArray[i].data.author} to ${grabDataArray[i].data.subreddit_name_prefixed}</h5>`);
    }
    getTimeInHours(data);
}

//Get time in hours

function getTimeInHours(data) {
  var grabDataArray = data.data.children;
  var postHeadings = $('h5');
    grabDataArray.forEach((el, index) => {
      var currentDate = new Date(el.data.created * 1000);
      //var sec = el.data.created_utc;
      var dateNow = Date.now();
      var epochDate = currentDate - dateNow;
      var currentHours = Math.floor(Math.abs((epochDate) / 1000 / 60 / 60));
      console.log(currentHours)
      $(postHeadings).eq(index).prepend(`Submitted ${currentHours} hours ago`);
    })
}

function onError(data){
  console.log('Failed!');
}

/* FUNCTION DEFINITION HERE */
/* TIP: don't forget scope! */
