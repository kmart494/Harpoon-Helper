/* GAME CANVAS
   Creates the 2d canvas handle. */
var game = {

	init: function()
	{
		game.canvas = document.getElementById("flowcanvas");
		game.context = game.canvas.getContext("2d");
	}
};

var targetInformation = {

		initialTargetBearing: 360,
		initialTargetRange: 0,
		targetCourse: 360,
		targetSpeed: 0,
		currentRangeBand: 0,
		currentTargetBearing: 0,
		currentTargetRange: 0,
		currentTargetX: 0,
		currentTargetY: 0,

		reset: function()
		{
			this.initialTargetBearing = 360;
			this.targetCourse = 360;
			this.targetSpeed = 0;
			this.initialTargetRange = 0;
			this.currentTargetBearing = 0;
			this.currentTargetRange = 0;
			this.currentTargetX = 0;
			this.currentTargetY = 0;
			document.getElementById("targetbearing").value = "";
			document.getElementById("targetcourse").value = "";
			document.getElementById("targetspeed").value = "";
			document.getElementById("targetrange").value = "";
		}
};

var engagementGeometry = {

	computedRangeBand: 0,
	aspectAngle: 0,
	doCalc: false,

	reset: function()
	{
		this.computedRangeBand = 0;
		this.aspectAngle = 0;
		this.doCalc = false;
	},

	calc: function()
	{
		targetInformation.initialTargetBearing = Number(document.getElementById("targetbearing").value);
		targetInformation.targetCourse = Number(document.getElementById("targetcourse").value);
		targetInformation.targetSpeed = Number(document.getElementById("targetspeed").value);
		targetInformation.initialTargetRange = Number(document.getElementById("targetrange").value);
		targetInformation.currentTargetBearing = targetInformation.initialTargetBearing;
		targetInformation.currentTargetRange = targetInformation.initialTargetRange;
		this.calcInitialTargetPosition();
		this.calcActualRangeBand();
		graphics.clearCanvas();
		graphics.drawColumnHeaders();
		this.doCalc = true;

		if (isNaN(targetInformation.initialTargetBearing) || (targetInformation.initialTargetBearing < 0)) {
			this.doCalc = false;
		}

		if (isNaN(targetInformation.targetCourse) || (targetInformation.targetCourse < 0)) {
			this.doCalc = false;
		}

		if (isNaN(targetInformation.targetSpeed) || (targetInformation.targetSpeed <= 0)) {
			this.doCalc = false;
		}

		if (isNaN(targetInformation.initialTargetRange) || (targetInformation.initialTargetRange <= 0)) {
			this.doCalc = false;
		}

		if (this.doCalc) {
			for (let i = 0; i <=6; i++) {
				let incrementData = new Array(6);

				// do movement
				if (i != 0) {
					this.calcTargetPositionFromMovement();
				}

				// increment number		
				incrementData[0] = i; 

				// bearing from ship
				if (i == 0) {
					incrementData[1] = targetInformation.initialTargetBearing;
				} else {
					this.calcBearingFromShip();
					incrementData[1] = targetInformation.currentTargetBearing; 
				}
				
				// aspect angle
				this.calcTargetAspectAngle();
				incrementData[2] = this.aspectAngle

				// geometry
				incrementData[3] = this.calcGeometry(); 

				// range from ship
				if (i == 0) {
					incrementData[4] = targetInformation.initialTargetRange;
				} else {
					this.calcRangeFromShip();
					targetInformation.currentTargetRange *= 10;
					targetInformation.currentTargetRange = Math.round(targetInformation.currentTargetRange);
					targetInformation.currentTargetRange /= 10;
					incrementData[4] = targetInformation.currentTargetRange; 
				}
				
				// range band
				this.calcActualRangeBand();
				incrementData[5] = this.createRangeBandText(); 

				graphics.drawincrementRowData(incrementData);
			}
		}
	},

	calcBearingFromShip: function()
	{
		let dx = targetInformation.currentTargetX;
		let dy = targetInformation.currentTargetY;
		let rad = Math.atan2(dx, dy);
		let deg = rad / 0.01745329251994;

		if (deg < 0) {
			deg += 360;
		}

		deg = Math.round(deg);

		if (deg == 0) {
			deg = 360;
		}

		targetInformation.currentTargetBearing = deg;
	},

	calcRangeFromShip: function()
	{
		let dx = targetInformation.currentTargetX;
		let dy = targetInformation.currentTargetY;
		let range = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
		targetInformation.currentTargetRange = range;
	},

	calcInitialTargetPosition: function()
	{
		let course = targetInformation.initialTargetBearing + 90;
		let rad = course * 0.0174533;
		targetInformation.currentTargetX = targetInformation.initialTargetRange * Math.cos(rad) * -1;
		targetInformation.currentTargetY = targetInformation.initialTargetRange * Math.sin(rad);
	},

	calcTargetPositionFromMovement: function()
	{
		let distanceMoved = targetInformation.targetSpeed / 120;
		let course = targetInformation.targetCourse + 90;
		let rad = course * 0.0174533;
		let dx = distanceMoved * Math.cos(rad) * -1;
		let dy = distanceMoved * Math.sin(rad);
		targetInformation.currentTargetX += dx;
		targetInformation.currentTargetY += dy;
	},

	calcReciprocalBearing: function() 
	{
		let reciprocalBearing = targetInformation.currentTargetBearing - 180;

		if (reciprocalBearing < 0) {
			reciprocalBearing += 360;
		}

		return reciprocalBearing;
	},

	createRangeBandText: function()
	{
		let bandText = "";

		switch (targetInformation.currentRangeBand) {
			case 0:
				bandText = "Point Def";
				break;
			case 1:
				bandText = "Short";
				break;
			case 2:
				bandText = "Medium 1";
				break;
			case 3:
				bandText = "Medium 2";
				break;
			case 4:
				bandText = "Long 1";
				break;
			case 5:
				bandText = "Long 2";
				break;
			case 6:
				bandText = "Very Long";
				break;
			case 7:
				bandText = "Extreme";
		}

		return bandText;
	},

	calcActualRangeBand: function()
	{
		if (targetInformation.currentTargetRange <= 4) {
			targetInformation.currentRangeBand = 0;
		} else if (targetInformation.currentTargetRange <= 15) {
			targetInformation.currentRangeBand = 1;
		} else if (targetInformation.currentTargetRange <= 30) {
			targetInformation.currentRangeBand = 2;
		} else if (targetInformation.currentTargetRange <= 45) {
			targetInformation.currentRangeBand = 3;
		} else if (targetInformation.currentTargetRange <= 60) {
			targetInformation.currentRangeBand = 4;
		} else if (targetInformation.currentTargetRange <= 90) {
			targetInformation.currentRangeBand = 5;
		} else if (targetInformation.currentTargetRange <= 135) {
			targetInformation.currentRangeBand = 6;
		} else {
			targetInformation.currentRangeBand = 7;
		}
	},

	calcSpeedRangeBandShift: function()
	{
		let rangeShift = 0;
		let aspectRangeBand = 0;

		if (targetInformation.targetSpeed <= 750) {
			rangeShift = 0;
		} else if (targetInformation.targetSpeed <= 1525) {
			rangeShift = 1;
		} else if (targetInformation.targetSpeed <= 2300) {
			rangeShift = 2;
		} else if (targetInformation.targetSpeed <= 3075) {
			rangeShift = 3;
		} else if (targetInformation.targetSpeed <= 4100) {
			rangeShift = 4;
		} else if (targetInformation.targetSpeed <= 5125) {
			rangeShift = 5;
		} else {
			rangeShift = 6;
		} 

		aspectRangeBand = targetInformation.currentRangeBand - rangeShift;

		if (aspectRangeBand < 0) {
			aspectRangeBand = 0;
		}

		return aspectRangeBand;
	},

	calcTargetAspectAngle: function()
	{
		targetInformation.currentTargetBearing = Math.floor(targetInformation.currentTargetBearing);
		targetInformation.targetCourse = Math.floor(targetInformation.targetCourse);

		if (targetInformation.currentTargetBearing >= 360) {
			targetInformation.currentTargetBearing -= 360;
		}

		if (targetInformation.targetCourse >= 360) {
			targetInformation.targetCourse -= 360;
		}
			
		let reciprocalBearing = this.calcReciprocalBearing(targetInformation.currentTargetBearing);

		this.aspectAngle = Math.abs(targetInformation.targetCourse - reciprocalBearing);
		
		if (this.aspectAngle > 90) {
			this.aspectAngle = Math.abs(180 - this.aspectAngle);
		}
	},

	calcGeometry: function() 
	{
		// geometry of 0 = closing
		// geometry of 1 = divergent
		// geometry of 2 = crossing

		let geometry = "";
		let aspectRangeBand = this.calcSpeedRangeBandShift();

		switch (aspectRangeBand) {
			case 0: 
				if (this.aspectAngle <= 5) {
					geometry = "Closing";
				} else if (this.aspectAngle <= 15) {
					geometry = "Divergent";
				} else {
					geometry = "Crossing";
				}
				break;
			case 1:
				if (this.aspectAngle <= 10) {
					geometry = "Closing";
				} else if (this.aspectAngle <= 20) {
					geometry = "Divergent";
				} else {
					geometry = "Crossing";
				}
				break;
			case 2:
				if (this.aspectAngle <= 20) {
					geometry = "Closing";
				} else if (this.aspectAngle <= 45) {
					geometry = "Divergent";
				} else {
					geometry = "Crossing";
				}
				break;
			case 3:
				if (this.aspectAngle <= 45) {
					geometry = "Closing";
				} else if (this.aspectAngle <= 90) {
					geometry = "Divergent";
				} else {
					geometry = "Crossing";
				}
				break;
			case 4:
				if (this.aspectAngle <= 60) {
					geometry = "Closing";
				} else if (this.aspectAngle <= 90) {
					geometry = "Divergent";
				} else {
					geometry = "Crossing";
				}
				break;
			case 5:
			case 6:
			case 7:
				geometry = "Closing";	
		}
		console.log(this.aspectAngle + ", " + aspectRangeBand);
		return geometry;
	}
};

/* DRAW GRAPHICS
   Mostly for drawing rectangles around calculated vales.
   Call graphics.draw() */
var graphics = {

	clearCanvas: function()
	{
		game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
	},

	drawColumnHeaders: function()
	{
		let incrementX = 340;
		let bearingX = incrementX + 125;
		let aspectX = bearingX + 125;
		let geometryX = aspectX + 125;
		let rangeX = geometryX + 125
		let rangeBandX = rangeX + 125;
		let rowY = 130;
		let rowHeight = 20;

		game.context.fillStyle = "rgb(0, 0, 0)";
		game.context.font = "14pt Arial";
		game.context.textAlign = "center";
		game.context.lineWidth = 1;

		// increment
		y = rowY + rowHeight * 3;
		game.context.fillText("Increment", incrementX, y);
		y = rowY + rowHeight * 3.5;
		game.context.moveTo(incrementX - 50, y);
		game.context.lineTo(incrementX + 50, y);
		game.context.stroke();

		// bearing from ship
		y = rowY + rowHeight;
		game.context.fillText("Bearing", bearingX, y);
		y = rowY + rowHeight * 2;
		game.context.fillText("from", bearingX, y);
		y = rowY + rowHeight * 3;
		game.context.fillText("Ship", bearingX, y);
		y = rowY + rowHeight * 3.5;
		game.context.moveTo(bearingX - 50, y);
		game.context.lineTo(bearingX + 50, y);
		game.context.stroke();

		// aspect angle
		y = rowY + rowHeight * 2;
		game.context.fillText("Aspect", aspectX, y);
		y = rowY + rowHeight * 3;
		game.context.fillText("Angle", aspectX, y);
		y = rowY + rowHeight * 3.5;
		game.context.moveTo(aspectX - 50, y);
		game.context.lineTo(aspectX + 50, y);
		game.context.stroke();

		// geometry
		y = rowY + rowHeight * 3;
		game.context.fillText("Geometry", geometryX, y);
		y = rowY + rowHeight * 3.5;
		game.context.moveTo(geometryX - 50, y);
		game.context.lineTo(geometryX + 50, y);
		game.context.stroke();

		// range from ship
		y = rowY + rowHeight * 1;
		game.context.fillText("Range", rangeX, y);
		y = rowY + rowHeight * 2;
		game.context.fillText("from", rangeX, y);
		y = rowY + rowHeight * 3;
		game.context.fillText("Ship (nmi)", rangeX, y);
		y = rowY + rowHeight * 3.5;
		game.context.moveTo(rangeX - 50, y);
		game.context.lineTo(rangeX + 50, y);
		game.context.stroke();

		// range band
		y = rowY + rowHeight * 2;
		game.context.fillText("Range", rangeBandX, y);
		y = rowY + rowHeight * 3;
		game.context.fillText("Band", rangeBandX, y);
		y = rowY + rowHeight * 3.5;
		game.context.moveTo(rangeBandX - 50, y);
		game.context.lineTo(rangeBandX + 50, y);
		game.context.stroke();
	},

	drawincrementRowData: function(incrementData)
	{
		let incrementX = 340;
		let bearingX = incrementX + 125;
		let aspectX = bearingX + 125;
		let geometryX = aspectX + 125;
		let rangeX = geometryX + 125
		let rangeBandX = rangeX + 125;
		let rowY = 230;
		let rowHeight = 30;
		let rectX = incrementX - 50;
		let rectY = rowY + (rowHeight * incrementData[0]) - 22;

		y = rowY + rowHeight * incrementData[0];

		if (incrementData[0] == 2) {
			game.context.fillStyle = "rgb(200, 200, 200)";
			game.context.fillRect(rectX, rectY, 725, rowHeight);
		}

		if (incrementData[0] == 5) {
			game.context.fillStyle = "rgb(200, 200, 200)";
			game.context.fillRect(rectX, rectY, 725, rowHeight);
		}

		game.context.fillStyle = "rgb(0, 0, 0)";
		game.context.font = "14pt Arial";
		game.context.textAlign = "center";
		
		game.context.fillText(incrementData[0], incrementX, y);
		game.context.fillText(incrementData[1] + "\u00b0", bearingX, y);
		game.context.fillText(incrementData[2] + "\u00b0", aspectX, y);
		game.context.fillText(incrementData[3], geometryX, y);
		
		let numString = "";
		if (Number.isInteger(incrementData[4])) {
			numString = incrementData[4].toString() + ".0";
			game.context.fillText(numString, rangeX, y);
		} else {
			game.context.fillText(incrementData[4], rangeX, y);
		}
		
		game.context.fillText(incrementData[5], rangeBandX, y);
	}
};

/* RESET PAGE
   Used to initialize or reset page. */
function resetall() {
	targetInformation.reset();
	engagementGeometry.reset();
	graphics.clearCanvas();
	graphics.drawColumnHeaders();
}

/* RESET BUTTONS
   'buttonClass' are the class of buttons to be reset to off.
   'buttonId' is the one button in the class to be reset to on. */
function resetButtons(buttonClass, buttonId) {
	let buttonsCollection = document.getElementsByClassName(buttonClass);
	let buttonsArray = Array.from(buttonsCollection);
	buttonsArray.forEach(function(btn) {
		btn.setAttribute("style", "opacity: 0");
	})
	document.getElementById(buttonId).style.opacity = 1;
}

/* COMPARE FUNCTION
   Used for sorting arrays of numbers low to high. */
function compareNumbers(a, b) {
	return a - b;
}

/* WINDOW LOAD
   Initialization of JS after the web page loads. */
window.onload = function() {
	game.init();
	resetall();
}