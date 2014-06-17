$('document').ready(function() {

	// VARIABLES
	var questions = new Array(),
			fadeNumber = 1000,
			questionsCount = 0,
			correctCount = 0,
			progressBar = $('#progressBar'),
			msg = $('#msg'),
			result = $('#result'),
			info = $('#info'),
			button = $(".button"),
			submit = $("#submitButton"),
			next = $("#nextButton"),
			restart = $("#restartButton"),
			successMsg = '<span style="color:green">Great Job!</span>',
			wrongMsg = '<span style="color:red">Oops!</span>';

	// CLASS
	function Question(question, answerOptions, answer, info) {
	  var question = question,
	  		answerOptions = answerOptions,
	  		answer = answer,
	  		info = info;

	  this.getQuestion = function() {
	  	return question;
	  };

	  this.getOptions = function() {
	  	return answerOptions;
	  };

	  this.getResult = function(indexNo) {
	  	if (answer == indexNo) {
	  		return true;
	  	} else {
	  		return false;
	  	}
	  };

	  this.getInfo = function() {
	  	return info;
	  };
	};

	// FUNCTIONS
	function updateProgress() {
			percent = ((questionsCount+1)*100)/questions.length;
	    var progressBarWidth = percent * progressBar.width() / 100;
	    progressBar.find('div').animate({ width: progressBarWidth }, 1000).html(percent + "%");
	};

	function checkAnswer() {
		$(".button").hide();

		/*--- troubleshoot 
		$( "li" ).each(function(index) {
		  console.log( index + ": " + $( this ).text() );
		});	---*/
		
		if(questions[questionsCount].getResult($('input[name=option]:checked', '#form').val())) {
			correctCount++;
			msg.html(successMsg).hide().fadeIn(fadeNumber);
		} else {
			msg.html(wrongMsg).hide().fadeIn(fadeNumber);
		}

		result.html(correctCount + ' of ' + (questionsCount+1) + ' correct.').hide().fadeIn(fadeNumber);
		info.html(questions[questionsCount].getInfo()).hide().fadeIn(fadeNumber);
		$('#options li input').prop('disabled', true);

		if (questionsCount+1 == questions.length) {
			restart.hide().fadeIn(fadeNumber);
		} else {
			next.hide().fadeIn(fadeNumber);
		}
	};

	function loadQuestions() {
		questions = [];

		/*--- Load Questions ---*/
		questions.push(new Question("The Earth's orbit around the Sun is?", ["Eliptical", "Circular", "Tilted 23.5 degrees", "Tilted 25.3 degrees"], 0, "Earth's orbit is not a perfect circle, but is elliptical. While the Earth is rotating upon its axis, it is also moving around the Sun in the same direction as its rotation."));
		questions.push(new Question("If all the energy of the sun shining on the Earth could be harnessed, it would be enough to meet the world's power needs how many times over?", ["6 times", "60 times", "600 times", "6,000 times"], 3, "The sunshine on the Earth's land is estimated to be 120,000 terawatts (trillion watts), or about 6,000 times the world's estimated 20-terawatt electricity demand by 2020."));
		questions.push(new Question("Which country has the most solar PV power, as of 2011?", ["United States", "Japan", "Germany", "China"], 2, "Germany is a world leader, with a cumulative 17,192 megawatts installed by the end of 2010."));
		questions.push(new Question("What is the most common material used in making solar cells?", ["Silver", "Iron", "Aluminium", "Silicon"], 3, "By far, the most prevalent bulk material for solar cells is crystalline silicon."));
		questions.push(new Question("Solar photovoltaic cell converts solar energy directly into?", ["Mechanical energy", "Electricity", "Heat energy", "Transportation"], 1, "A solar cell (also called a photovoltaic cell) is an electrical device that converts the energy of light directly into electricity by the photovoltaic effect."));
	};

	function printQuestion() {
		var question = questions[questionsCount];
		updateProgress();
		/*--- Print the question ---*/
		$('#question').text(question.getQuestion()).hide().fadeIn(fadeNumber);
		printOptions(question);
	};

	function printOptions(question) {
		var	ansOptions = new Array();
		$('#options li').remove();

		/*--- Print the options ---*/
		ansOptions = question.getOptions();
		for (i=0; i<ansOptions.length; i++) {
			$('#options').append('<li> <input type="radio" name="option" value="' + i + '">' + ansOptions[i] +'</li>');
		}
		$('#options li').hide().fadeIn(fadeNumber);
		submit.hide().fadeIn(fadeNumber);
	};

	function clearMessages() {
		msg.html('');
		result.html('');
		info.html('');
	}

	function restartQuiz() {
		/*--- Reset ---*/
		$(".button").hide();
		questionsCount = 0;
		correctCount = 0;
		clearMessages();

		loadQuestions();
		updateProgress();
		printQuestion();
	};

	function nextQuestion() {
		$(".button").hide();
		clearMessages();

  	questionsCount++;
		printQuestion();
	};

	// INITIALIZE
	restartQuiz();

	// EVENT HANDLERS
	submit.on("click", checkAnswer);
	next.on("click", nextQuestion);
	restart.on("click", restartQuiz);

})