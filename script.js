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
microphone.onclick = function(){
	microphone.classList.add("record");
	var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
	recognition.lang = 'en-US';
	recognition.start();
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
			printHistory(input)
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