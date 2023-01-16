var game = {
	init: function() {
		game.canvas = document.getElementById("flowcanvas");
		game.context = game.canvas.getContext("2d");
	}
};

// REACTION RANGE
var reactionRange = {

	targetDistance: 0,
	radarRange: 0,
	radarHorizon: 0,
	lowestRadarRange: 0,
	csDelayInput: 0,
	radarReactionRange: 0,
	finalReactionRange: 0,

	reset: function() {
		this.targetDistance = 0;
		this.radarRange = 0;
		this.radarHorizon = 0;
		this.lowestRadarRange = 0;
		this.csDelayInput = 0;
		this.radarReactionRange = 0;
		this.finalReactionRange = 0;
		document.getElementById("intargetdistance").value = this.targetDistance;
		document.getElementById("inradardistance").value = this.radarRange;
		document.getElementById("inradarhorizon").value = this.radarHorizon;
		document.getElementById("outlowestrange").value = this.lowestRadarRange;
		document.getElementById("outcsreaction").value = this.csDelayInput;
		document.getElementById("outreactionrange1").value = this.radarReactionRange;
		document.getElementById("outreactionrangefinal").value = this.finalReactionRange;
	},

	calcLowestRadarRange: function() {
		this.targetDistance = Number(document.getElementById("intargetdistance").value);
		this.radarRange = Number(document.getElementById("inradardistance").value);
		this.radarHorizon = Number(document.getElementById("inradarhorizon").value);

		if (this.targetDistance < 0) {
			this.targetDistance = 0;
			document.getElementById("intargetdistance").value ="0";
		}
		if (this.radarRange < 0) {
			this.radarRange = 0;
			document.getElementById("inradardistance").value ="0";
		}
		if (this.radarHorizon < 0) {
			this.radarHorizon = 0;
			document.getElementById("inradarhorizon").value = "0";
		}

		let distanceArray = new Array(3);
		distanceArray[0] = this.targetDistance;
		distanceArray[1] = this.radarRange;
		distanceArray[2] = this.radarHorizon;
		distanceArray.sort(compareNumbers);
		this.lowestRadarRange = distanceArray[0];
		document.getElementById("outlowestrange").value = this.lowestRadarRange;
		this.calcReactionRange1(this.csDelayInput);
	},

	calcReactionRange1: function(delay) {
		this.csDelayInput = delay;
		this.radarReactionRange = this.lowestRadarRange - this.csDelayInput;
		this.radarReactionRange = this.radarReactionRange.toFixed(1);
		document.getElementById("outcsreaction").value = this.csDelayInput;
		document.getElementById("outreactionrange1").value = this.radarReactionRange;
		this.calcFinalReactionRange();
	},

	calcFinalReactionRange: function() {
		if (this.radarReactionRange < this.radarHorizon) {
			this.finalReactionRange = this.radarReactionRange;
		} else {
			this.finalReactionRange = this.radarHorizon;
		}
		document.getElementById("outreactionrangefinal").value = this.finalReactionRange;
		engagementRangeBar.calcEngagementRange();
	}
};

// COMBAT SYSTEM RANGE MODIFIER
var combatSystem = {

	csReactionTime: 0,
	csReactionModifier: 0,
	csReactionDelay: 0,
	targetSpeed: 0,
	incrementMultiplier: 0,
	csGeneration: 0,
	csReactionRoll: 0,
	csModArray: [[4, 4, 4, 3, 2], [4, 4, 3, 2, 1], [4, 4, 2, 1, 1], [4, 3, 1, 1, 0], [3, 2, 1, 0, 0,], [2, 1, 0, 0, 0], [1, 1, 0, 0, 0], [1, 0, 0, 0, -1], [0, 0, 0, -1, -2], [0, 0, -1, -2, -2], [0, 0, -2, -2, -2]],

	reset: function() {
		resetButtons("csreactiontimebuttons", "cs1st");
		resetButtons("csreactionmodifier", "roll2");
		this.csReactionTime = 8;
		this.csReactionModifier = 4;
		this.csReactionDelay = 12;
		this.targetSpeed = 0;
		this.incrementMultiplier = 0;
		this.csGeneration = 0;
		this.csReactionRoll = 0;
		document.getElementById("csreactiontime").value = this.csReactionTime;
		document.getElementById("csreactionmod").value = this.csReactionModifier;
		document.getElementById("csreactiondelay").value = this.csReactionDelay;
		document.getElementById("targetspeed").value = this.targetSpeed;
		document.getElementById("incrementmultiplier").value = this.incrementMultiplier;
		graphics.draw();
	},

	clickButtonTime: function(buttonId) {
		resetButtons("csreactiontimebuttons", buttonId);

		switch (buttonId) {
		case ("cs1st"):
			this.csReactionTime = 8;
			this.csGeneration = 0;
			break;
		case ("cs2nd"):
			this.csReactionTime = 6;
			this.csGeneration = 1;
			break;
		case ("cs3rd"):
			this.csReactionTime = 3;
			this.csGeneration = 1;
			break;
		case ("cs4th"):
			this.csReactionTime = 2;
			this.csGeneration = 2;
			break;
		case ("cs5th6thhuman"):
			this.csReactionTime = 1;
			this.csGeneration = 2;
			break;
		case ("cs5thauto"):
			this.csReactionTime = 0;
			this.csGeneration = 3;
			break;
		case ("cs6thauto"):
			this.csReactionTime = 0;
			this.csGeneration = 4;
		}

		document.getElementById("csreactiontime").value = this.csReactionTime;
		this.calcCsReactionModifier();
	},

	clickButtonModifier: function(buttonId) {
		resetButtons("csreactionmodifier", buttonId);

		switch (buttonId) {
		case ("roll2"):
			this.csReactionRoll = 0;
			break;
		case ("roll3"):
			this.csReactionRoll = 1;
			break;
		case ("roll4"):
			this.csReactionRoll = 2;
			break;
		case ("roll5"):
			this.csReactionRoll = 3;
			break;
		case ("roll6"):
			this.csReactionRoll = 4;
			break;
		case ("roll7"):
			this.csReactionRoll = 5;
			break;
		case ("roll8"):
			this.csReactionRoll = 6;
			break;
		case ("roll9"):
			this.csReactionRoll = 7;
			break;
		case ("roll10"):
			this.csReactionRoll = 8;
			break;
		case ("roll11"):
			this.csReactionRoll = 9;
			break;
		case ("roll12"):
			this.csReactionRoll = 10; 
		}

		this.calcCsReactionModifier();
	},

	calcCsReactionModifier: function() {
		this.csReactionModifier = this.csModArray[this.csReactionRoll][this.csGeneration];
		document.getElementById("csreactionmod").value = this.csReactionModifier;
		graphics.draw();
		this.calcCsReactionDelay();
	},

	calcCsReactionDelay: function() {
		let multiplier = Number(document.getElementById("targetspeed").value);
		this.targetSpeed = multiplier;
		this.csReactionDelay = this.csReactionTime + this.csReactionModifier;
		this.incrementMultiplier = this.targetSpeed / 120;
		this.incrementMultiplier = this.incrementMultiplier.toFixed(1);
		let delay = this.csReactionDelay * this.incrementMultiplier;
		delay = delay.toFixed(1);
		reactionRange.calcReactionRange1(delay);
		document.getElementById("csreactiondelay").value = this.csReactionDelay;
		document.getElementById("incrementmultiplier").value = this.incrementMultiplier;
	}
};

// 3D or HF RADAR
var hf3dRadar = {

	hf3dRange: 0,
	hfRange: 0,

	reset: function() {
		this.hf3dRange = 0;
		this.hfRange = 15;
		document.getElementById("hf3dradarrange").value = this.hf3dRange;
		document.getElementById("heightfinderrange").value = this.hfRange;
	},

	calcHeightFinderRange: function() {
		this.hf3dRange = Number(document.getElementById("hf3dradarrange").value);

		if (this.hf3dRange >= 0) {
			if (this.hf3dRange < 15) {
				this.hfRange = 15;
			} else {
				this.hfRange = this.hf3dRange;
			}
			document.getElementById("heightfinderrange").value = this.hfRange;
		} else {
			this.hf3dRange = 0;
			this.hfRange = 15;
			document.getElementById("hf3dradarrange").value = "0";
			document.getElementById("heightfinderrange").value = this.hfRange;
		}

		engagementRangeBar.calcEngagementRange();
	}
};

// SAM RANGE
var samRange = {

	initialSamRange: 0,
	finalSamRange: 0,
	fastTarget: "no",
	slowTarget: "no",

	reset: function() {
		this.initialSamRange = 0;
		this.finalSamRange = 0;
		this.fastTarget = "no";
		this.slowTarget = "no";
		document.getElementById("initialsamrange").value = "0";
		document.getElementById("finalsamrange").value = "0";
		resetButtons("slowtargetbuttons", "slowtargetno");
		resetButtons("fasttargetbuttons", "fasttargetno");
	},

	clickButton: function(buttonId) {
		let buttonClass = document.getElementById(buttonId).className;
		resetButtons(buttonClass, buttonId);

		switch (buttonId) {
		case ("fasttargetno"):
			this.fastTarget = "no";
			break;
		case ("fasttargetyes"):
			this.fastTarget = "yes";
			break;
		case ("slowtargetno"):
			this.slowTarget = "no";
			break;
		case ("slowtargetyes"):
			this.slowTarget = "yes";
		}

		this.calcSamRange();
	},

	calcSamRange: function() {
		this.initialSamRange = Number(document.getElementById("initialsamrange").value);
		this.finalSamRange = this.initialSamRange;

		if (this.initialSamRange >= 0) {
			if (this.fastTarget == "yes") {
				this.finalSamRange = this.initialSamRange * 2;
			} else {
				if (this.slowTarget == "yes") {
					this.finalSamRange = this.initialSamRange * 1.5;
				}
			}
			document.getElementById("finalsamrange").value = this.finalSamRange;
		} else {
			this.initialSamRange = 0;
			this.finalSamRange = 0;
			document.getElementById("initialsamrange").value = "0";
			document.getElementById("finalsamrange").value = "0";
		}

		engagementRangeBar.calcEngagementRange();
	}
};

// ENGAGEMENT RANGE BAR
var engagementRangeBar = {

	engagementRange: 0,

	reset: function() {
		this.engagementRange = 0;
	},

	calcEngagementRange: function() {
		let rangeArray = new Array(3);
		rangeArray[0] = reactionRange.finalReactionRange;
		rangeArray[1] = hf3dRadar.hfRange;
		rangeArray[2] = samRange.finalSamRange;
		rangeArray.sort(compareNumbers);
		this.engagementRange = rangeArray[0];
		graphics.draw();
	}
};

// DRAW GRAPHICS
var graphics = {

	draw: function() {
		game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
		this.drawCsReactionModifier();
		this.drawEngaementRange();
	},

	drawCsReactionModifier: function() {
		let x = 113;
		let y = 689;
		let dx = 53;
		let dy = 20;
		x = x + dx * combatSystem.csGeneration;
		y = y + dy * combatSystem.csReactionRoll;
		game.context.strokeStyle = "rgb(246, 129, 33)";
		game.context.lineWidth = 3;
		game.context.strokeRect(x, y, 30, 19);
		game.context.fillStyle = "rgb(228, 228, 228)";
		game.context.fillRect(x + 1, y + 1, 30 - 2, 19 - 2);
	},

	drawEngaementRange: function() {
		if (engagementRangeBar.engagementRange > 150) {
			engagementRangeBar.engagementRange = 150;
		}
		
		if (engagementRangeBar.engagementRange < 0) {
			engagementRangeBar.engagementRange = 0;
		}

		let x = 1085;
		let y = 1549;
		let dy = 9.56;
		y = y - engagementRangeBar.engagementRange * dy;
		game.context.strokeStyle = "rgb(46, 49, 146)";
		game.context.lineWidth = 3;
		game.context.strokeRect(x, y, 106, 8);
		game.context.fillStyle = "rgb(228, 228, 228)";
		game.context.fillRect(x + 1, y + 1, 106 - 2, 8 - 2);
	}
};

// GLOBAL FUNCTIONS

function resetall() {
	reactionRange.reset();
	combatSystem.reset();
	hf3dRadar.reset();
	samRange.reset();
	engagementRangeBar.reset();
	graphics.draw();
}

// RESET BUTTONS
// buttonClass are the class of buttons to be reset to off
// buttonId is the one button in the class to be reset to on
function resetButtons(buttonClass, buttonId) {
	let buttonsCollection = document.getElementsByClassName(buttonClass);
	let buttonsArray = Array.from(buttonsCollection);
	buttonsArray.forEach(function(btn) {
		btn.setAttribute("style", "opacity: 0");
	})

	document.getElementById(buttonId).style.opacity = 1;
}

function compareNumbers(a, b) {
	return a - b;
}

// WINDOW LOAD
window.onload = function() {
	game.init();
	resetall();
}