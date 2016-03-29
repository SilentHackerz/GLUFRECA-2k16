//This function gets called when button is clicked
function getTodos(){
	//Prints the message in the browser console
	console.log("button is clicked!");

	//Sends a request to the server
	$.ajax({
	    type: 'GET', //Send a GET request
	    url: '/gettodolist',  //Send request to '/gettodolist'
	    datatype: 'json',  //To access JSON
	    success: function(data){ //This function gets called if browser gets the response successfully
	    	
	    	//Prints the response. allTodos is an array of objects
	    	console.log(data.allTodos); 

	    	var displayTodos = document.getElementById("displayTodos");

		/*
		    	For loop will create new tags for each todo item in the array.
		    	Then it will display them in the page	
		*/

	    	for(var i=0; i<data.allTodos.length; i++){
	    		//Get a single todo
	    		var singleTodo = data.allTodos[i].todo;

	    		//Create a new HTML 'p' tag
	    		var pTag = document.createElement("P");

	    		/*
	    			This will insert the todoitem in the tag 
	    			<p> todoitem </p>
	    		*/
	    		pTag.innerHTML = singleTodo;

	    		displayTodos.appendChild(pTag)
	    	}

	    },

	    error: function(httpRequest,status,error) { //This function gets called if server sends error
	        console.log(error);
	    }
	});
}

//This function gets called when button is clicked
function saveTodos(){
	//Get the DOM element whose ID is 'usernameField' and store in a variable
	var usernameField = document.getElementById("usernameField");

	//Get the DOM element whose ID is 'todoField' and store in a variable	
	var todoField = document.getElementById("todoField");

	//create an object to send back to the server.
	//It contains values from the input fields
	var todoData = {
		name: usernameField.value,
		todo: todoField.value
	}
	//Prints the object in the browser console
	console.log(todoData);

	//Sends a request to the server
	$.ajax({
	    type: 'POST', //Send a POST request
	    url: '/savetodos', //Send request to '/savetodos'
	    datatype: 'json',
	    data: todoData, //Sends the object to server
	    success: function(data){ //This function gets called if browser gets the response successfully
	    	console.log(data);
	    },
	    error: function(httpRequest,status,error) {//This function gets called if server sends error
	        console.log(error);
	    }
	});
}

/*
	JQuery is a JavaScript library which gives lot of features like animations, fetching DOM elements, etc.
	It is used to reduce repetitive and long lines of code.

	When you include JQuery, it exposes a variable '$'.
	$ is an object which contains keys and values. Values of those keys are usually functions.
	$.ajax is a function which is used to send GET requests or POST requests to the server

*/
