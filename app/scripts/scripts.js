$(document).ready(function() {
  console.log("BASS TEST");
  var listo = [];

  // ensures the newTaskForm is hidden on page load
  $('#newTaskForm').hide();


//function to advance a task from new to in progress
var advanceTask = function(task) {
  var modified = task.innerText.trim()
  for (var i = 0; i < listo.length; i++) {
    if (listo[i].task === modified) {
      if (listo[i].id === 'new') {
        listo[i].id = 'inProgress';
      } else if (listo[i].id === 'inProgress') {
        listo[i].id = 'archived';
      } else {
        listo.splice(i, 1);
      }
      break;
    }
  }
  task.remove();
};

$(document).on('click', '#item', function(e) {
	e.preventDefault();
});

// this changes the task id from new to in progress, advancing it along our app lists
// TEST REDUNDENCY OF ID ASSIGNMENT

$(document).on('click', '#item', function(e) {
	e.preventDefault();
  var task = this;
  advanceTask(task);
  this.id = 'inProgress';
  $('#currentList').append(this.outerHTML);
});

// now we need an event listener to change tasks from in progress to achived
$(document).on('click', '#inProgress', function(e){
  e.preventDefault();
  var task = this;
  task.id = 'archived';
  var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
  advanceTask(task);
  $('#archivedList').append(changeIcon);
});

// This will delete tasks in the archived div by passing a task into advancetask without an id
$(document).on('click', '#archived', function (e) {
  e.preventDefault();
  var task = this;
  advanceTask(task);
});


//function to create task object and push it to listo array
var addTask = function(task) {
  if(task) {
      //reference to our constructor function
      task = new Task(task);
      listo.push(task);

      // creates a task item rendered in the DOM
      $('#newItemInput').val('');
      $('#newList').append(
            '<a href="#finish" class="" id="item">' +
            '<li class="list-group-item">' +
            '<h3>' + task.task + '</h3>' +
            '<span class="arrow pull-right">' +
            '<i class="glyphicon glyphicon-arrow-right">' +
            '<span>' +
            '</li>' +
            '</a>'
        )
	}
    $('#newTaskForm').slideToggle('fast', 'linear');
};

//an event that calls the addTask function when we click the save button on our form
$('#saveNewItem').on('click', function(e){
  e.preventDefault();
  var task = $('#newItemInput').val().trim();
  addTask(task);
});

//lets create a listener to call addtask as above when enter is pressed
$(document).keypress(function(e) {
    if(e.which == 13) {
      var task = $('#newItemInput').val().trim();
      addTask(task);
      $('#newItemInput').focus();
    }
});

//opens form
$('#add-todo').on('click', function () {
    $('#newTaskForm').fadeToggle('fast', 'linear');
    $('#newItemInput').focus();
});



//closes form
$('#cancel').on('click', function (e) {
    e.preventDefault();
    $('#newTaskForm').fadeToggle('fast', 'linear');
});





// task constructor function:
var Task = function(task) {
	this.task = task;
	this.id = 'new';
}





//end of $(document).ready
});
