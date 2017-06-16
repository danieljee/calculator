var calculator = function(){
	this.currentVal = 0;
	this.lastPressed = ['0'];
	
	this.reset = function(){
		this.lastPressed = ['0'];
		this.currentVal = 0;
	}
	
	this.update = function(val){
		if (val === "AC"){
			this.reset();
		} else if (val === "CE"){
			this.currentVal = 0;
			if (this.lastPressed.length >1){
				this.lastPressed.pop();
			} else {
				this.reset();
			}
		} else if (['-', '+', '/', '*', '='].includes(val)){
			if (this.lastPressed[0] !== '0'){
				if (this.lastPressed[this.lastPressed.length-2] === '='){
					this.lastPressed = [this.lastPressed[this.lastPressed.length-1], val];
					this.currentVal = val;
				} else if (!['-', '+', '/', '*', '='].includes(this.lastPressed[this.lastPressed.length-1])){
					this.lastPressed.push(val);
					this.currentVal = val;
					if (val === '='){
						if (this.lastPressed.length == 2){
							this.lastPressed = [this.lastPressed[0]];
						} else {
							this.calculate();
						}			
					}
				}
			}
		}	else {
			if (this.lastPressed[this.lastPressed.length-2] === '='){
				if (val === '.'){
					this.lastPressed = ['0.'];
				} else {
					this.lastPressed = [val];
				}			
				this.currentVal = this.lastPressed[this.lastPressed.length-1];
			} else if (!['-', '+', '/', '*', '.'].includes(this.lastPressed[this.lastPressed.length-1])){
				if (this.lastPressed.length == 1 && this.lastPressed[0] === '0'){
					this.lastPressed[0] = val;
				} else if (val === '.'){
					this.lastPressed[this.lastPressed.length-1] = this.lastPressed[this.lastPressed.length-1] + '.';
				} else {
					this.lastPressed[this.lastPressed.length-1] = this.lastPressed[this.lastPressed.length-1] + val;
				}
				this.currentVal = this.lastPressed[this.lastPressed.length-1];
			} else { //If the last element is an operator, simply push the value. 
				//If the value is 0, ignore it. 
				if (val !== '0' && val !=='.'){
					this.lastPressed.push(val);
					this.currentVal = val;
				}		
			}
		}	
	}

	this.calculate = function(){
		var lastOperator;
		this.currentVal = + this.lastPressed[0];
		for (var i=1; i<this.lastPressed.length; i++){
			if (!['-', '+', '/', '*', '='].includes(this.lastPressed[i])){
				if (lastOperator === '+'){
					this.currentVal += + this.lastPressed[i];
				} else if (lastOperator === '-'){
					this.currentVal -= + this.lastPressed[i];
				} else if (lastOperator === '/'){
					this.currentVal /= + this.lastPressed[i];
				} else if (lastOperator === '*'){
					this.currentVal *= + this.lastPressed[i];
				}
			} else {
				lastOperator = this.lastPressed[i];
			}
		}
		this.currentVal = parseFloat(this.currentVal.toFixed(2));
		this.lastPressed.push(this.currentVal + "");
	}
	
	this.display = function(){
		var disp = document.getElementById("display");
		disp.innerHTML = "<h3 id='currentVal'>"+this.currentVal+"</h3><p class id='buttonsPressed'>"+this.lastPressed.join("")+"</p>";
	}
}

var myCalculator = new calculator();

document.addEventListener("DOMContentLoaded", function(){
	var buttons = document.getElementsByTagName("button");
	for(var i=0; i<buttons.length; i++){
		buttons[i].addEventListener("click", function(){
			myCalculator.update(this.value);
			myCalculator.display();
		});
	}
	myCalculator.display();
});