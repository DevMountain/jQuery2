$(document).ready(function(){

  $('#newTaskForm').hide();
  
  $('#newListItem').on('click', function(){
  	$('#newListItem').toggle();
  	$('#newTaskForm').toggle();
  	// $('#newTaskForm').fadeToggle('fast', 'linear');
  })

  $('#cancel').on('click', function(e){
    e.preventDefault();
    $('#newTaskForm').toggle();
    $('#newListItem').toggle();
  })

	var listo = [];

	var Task = function(task){
		this.task = task;
		this.id = "new";
	}

	var addTask = function(task){
		if(task){
			task = new Task(task);
			listo.push(task);
      save();
      console.log('value of listo: ', listo);

			$('#newItemInput').val('');
			$('#newList').append('<a href="#"" class="" id="item"><li class="list-group-item">' + task.task + '<span class="glyphicon glyphicon-circle-arrow-right pull-right"></span></li></a>');
		}
		//$('#newTaskForm, #newListItem').toggle();
	}

  var save = function() {
    console.log('contents to be saved: ', JSON.stringify(listo));
    localStorage.listo = JSON.stringify(listo);
  };

  var load = function() {
    console.log('Loading.....');
    if (localStorage.listo){
      listo = JSON.parse(localStorage.listo);
      console.log('loading listo: ' ,listo);
      for (var i = 0; i < listo.length; i++) {
        if (listo[i].id === 'new') {
          console.log('New item: ', listo[i]);
          $('#newList').append('<a href="#"" class="" id="item"><li class="list-group-item">' + listo[i].task + '<span class="glyphicon glyphicon-circle-arrow-right pull-right"></span></li></a>');
        } else if (listo[i].id === 'inProgress') {
          console.log('In progress item: ', listo[i]);
          $('#inProgress').append('<a href="#"" class="" id="item"><li class="list-group-item">' + listo[i].task + '<span class="glyphicon glyphicon-circle-arrow-right pull-right"></span></li></a>');
        } else if (listo[i].id === 'archived') {
          console.log('Archived item: ', listo[i]);
          $('#archived').append('<a href="#"" class="" id="item"><li class="list-group-item">' + listo[i].task + '<span class="glyphicon glyphicon-trash pull-right"></span></li></a>');
        }
      }
    } else {
      console.log('No listo local storage object found');
    }
  }

  load();

  $('#saveNewItem').on('click', function(e){
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  })

  var advanceTask = function(task) {
    console.log('task.innerText.trim() ', task.innerText.trim())
    var modified = task.innerText.trim();
    for (var i = 0; i < listo.length; i++) {
        if (listo[i].task === modified) {
            if (listo[i].id === 'new') {
                listo[i].id = 'inProgress';
                console.log('value of listo: ', listo);
                save();
            } else if (listo[i].id === 'inProgress') {
                listo[i].id = 'archived';
                console.log('value of listo: ', listo);
                save();
            } else {
                listo.splice(i, 1);
                save();
            }
            break;
        }
    }
    task.remove();
  };

  $(document).on('click', '#item', function(e){
    console.log('item to in progress');
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    console.log('item being moved to in progress: ', this.outerHTML);
    $('#currentList').append(this.outerHTML);
  })

  $(document).on('click', '#inProgress', function(e) {
    console.log('in progress to archived');
    e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML.replace('glyphicon-circle-arrow-right', 'glyphicon-trash');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  });


  $(document).on('click', '#archived', function (e) {
    console.log('archived to deleted');
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });

})