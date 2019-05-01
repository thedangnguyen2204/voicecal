function getHistory(){
	return document.getElementById("history-value").innerText;
}
function printHistory(num){
	document.getElementById("history-value").innerText = num;
}
function getOutput(){
	return document.getElementById("output-value").innerText;
}
function printOutput(num){
	if(num == ""){
		document.getElementById("output-value").innerText = num;
	}
	else{
		document.getElementById("output-value").innerText = getFormattedNumber(num);
	}	
}
function getFormattedNumber(num){
	if(num == "-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}
var operator = document.getElementsByClassName("operator");
for(var i = 0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		if(this.id == "clear"){
			printHistory("");
			printOutput("");
		}
		else if(this.id == "backspace"){
			var output = reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output = output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output = getOutput();
			var history = getHistory();
			if(output == ""&&history != ""){
				if(isNaN(history[history.length-1])){
					history = history.substr(0,history.length-1);
				}
			}
			if(output != "" || history != ""){
				output = output == ""?output:reverseNumberFormat(output);
				history = history+output;
				if(this.id == "="){
					var result = eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history = history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}
var number = document.getElementsByClassName("number");
for(var i = 0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output = reverseNumberFormat(getOutput());
		if(output != NaN){ //if output is a number
			output = output+this.id;
			printOutput(output);
		}
	});
}
var microphone = document.getElementById('microphone');
var click_time = 0;
microphone.onclick = function(){
	click_time += 1;
	var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
	if (click_time == 1) {
		speak("Welcome!");
		setTimeout(function(){
			microphone.classList.add("record");
			recognition.lang = 'en-US';
			recognition.start();
		},1000);
	}
	else {
		microphone.classList.add("record");
		recognition.lang = 'en-US';
		recognition.start();
	}
	operations = {"plus":"+",
				 "minus":"-",
				 "negative":"-",
				 "multiply":"*",
				 "multiplied":"*",
				 "divide":"/",
				 "divided":"/",
				 "over":"/",
				 "reminder":"%",
				 "open parenthesis":"(",
				 "close parenthesis":")",
				 "open parentheses":"(",
				 "close parentheses":")",
				 "open bracket":"(",
				 "close bracket":")",
				 "power": "**",
				 "square root": "Math.sqrt(",
				 "next": ")"
				 }
	recognition.onresult = function(event){
		var input = event.results[0][0].transcript;

		for(property in operations){
			input = input.replace(property, operations[property]);
		}
		document.getElementById("output-value").innerText = input;
		setTimeout(function(){
			var result = evaluate(input);
			speak("The answer is " + result);
			printHistory(input);
		},3000);
		microphone.classList.remove("record");
	}

}
function evaluate(input){
	try{
		var result = eval(input);
		document.getElementById("output-value").innerText = result;
		return result;
	}
	catch(e){
		console.log(e);
		document.getElementById("output-value").innerText = "";
	}
}

function speak(input) {
	var synth = window.speechSynthesis;
	utterThis = new window.SpeechSynthesisUtterance(input);
	synth.speak(utterThis);
};

// define a handler
function doc_keyUp(e) {

    // this would test for whichever key is 40 and the ctrl key at the same time
    if (e.keyCode == 32) {
        // call your function to do the thing
        microphone.onclick();
    }
}
// register the handler 
document.addEventListener('keydown', doc_keyUp, false);

function random_gen_math() {
	random = Math.random()
	if (random < 0.8) {
		var x = Math.floor((Math.random() * 10) + 1);
		var y = Math.floor((Math.random() * 10) + 1);
		var operation = Math.floor((Math.random() * 4) + 1)
		var result;
		switch (operation) {
			case 1:
				speak (x + "plus" + y);
				result = eval(x+y);
				document.getElementById("output-value").innerText = x + "+" + y;
				break;
			case 2:
				speak (x + "minus" + y);
				result = eval(x-y);
				document.getElementById("output-value").innerText = x + "-" + y;
				break;
			case 3:
				speak (x + "multiply" + y);
				result = eval(x*y);
				document.getElementById("output-value").innerText = x + "*" + y;
				break;
			case 4:
				if (x % y == 0) {
					speak (x + "divide" + y);
					result = eval(x/y);
					document.getElementById("output-value").innerText = x + "/" + y;
					break;	
				}
				else {
					speak (x + "+" + y);
					result = eval(x+y);
					document.getElementById("output-value").innerText = x + "+" + y;
					break;	
				}
		}
		return result;
	}
	else {
		var x = Math.floor((Math.random() * 10) + 1);
		var y = Math.floor((Math.random() * 10) + 1);
		var z = Math.floor((Math.random() * 10) + 1);
		var operation = Math.floor((Math.random() * 4) + 1);
		var result;
		switch (operation) {
			case 1:
				speak (x + "plus" + y + "plus" + z);
				result = eval(x+y+z);
				document.getElementById("output-value").innerText = x + "+" + y + "+" + z;
				break;
			case 2:
				speak (x + "minus" + y + "minus" + z);
				result = eval(x-y-z);
				document.getElementById("output-value").innerText = x + "-" + y + "-" + z;
				break;
			case 3:
				speak (x + "minus" + y + "plus" + z);
				result = eval(x-y+z);
				document.getElementById("output-value").innerText = x + "-" + y + "+" + z;
				break;
			case 4:
				speak (x + "plus" + y + "minus" + z);
				result = eval(x+y-z);
				document.getElementById("output-value").innerText = x + "+" + y + "-" + z;
				break;	
		}
		return result;
	}
}
var game = document.getElementById('game');
game.onclick = function() {
	speak("Listen and speak! Get ready, go!");
	var counter = 0;
	var score = 0;
	const intervalId = setInterval(function(){
		result = random_gen_math();
		counter += 1;
		console.log(result);

		setTimeout(function(){
			game.classList.add("record");
			var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
			recognition.lang = 'en-US';
			recognition.start();
			recognition.onresult = function(event) {
				var input = event.results[0][0].transcript;
				console.log(input);
				if(result == input && counter == 5){
					speak("Correct! Finish!");
					score +=1 ;
				}
				else if (result != input && counter == 5) {
					speak("Incorrect! Finish!");
				}
				else if (result == input) {
					speak("Correct! Next!");
					score += 1;
				}
				else if (result != input) {
					speak("Incorrect! Next!");
				}
				document.getElementById("output-value").innerText = result;
				game.classList.remove("record");
			}
		},4500);	

		
		if (counter == 5) {
			clearInterval(intervalId);
		}
	},8000);	
	setTimeout(function(){
		speak("Well done! You score " + score + "out of 5");
	},48000);
}
	