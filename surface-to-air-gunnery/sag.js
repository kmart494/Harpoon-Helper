var game = {
	init: function() {
		game.canvas = document.getElementById("flowcanvas");
		game.context = game.canvas.getContext("2d");
	}
};

/*
	calculate gun aa strength
*/
var gunAaStrength = {

		startStrength: 0,
		localControl: "no",
		localControlOnly: "yes",
		raOrEoDirectedAaGuns: "no",
		finalStrength: 0,

	reset: function() {
		resetButtons("localcontrolbtns", "localcontrolno");
		resetButtons("localcontrolonlybtns", "localcontrolonlyyes");
		resetButtons("raeodirectedbtns", "raeodirectedno");
		this.startStrength = 0;
		this.localControl = "no";
		this.localControlOnly = "yes";
		this.raOrEoDirectedAaGuns = "no";
		this.finalStrength = 0;
		document.getElementById("startgunaastrength").value = this.startStrength;
		this.calc();
	},

	clickButton: function(buttonId) {
		let buttonClass = document.getElementById(buttonId).className;
		resetButtons(buttonClass, buttonId);

		switch (buttonId) {
		case ("localcontrolyes"):
			this.localControl = "yes";
			break;
		case ("localcontrolno"):
			this.localControl = "no";
			break;
		case ("localcontrolonlyyes"):
			this.localControlOnly = "yes";
			break;
		case ("localcontrolonlyno"):
			this.localControlOnly = "no";
			break;
		case ("raeodirectedyes"):
			this.raOrEoDirectedAaGuns = "yes";
			break;
		case ("raeodirectedno"):
			this.raOrEoDirectedAaGuns = "no";
		}
		
		this.calc();
	},

	calc: function() {
		let num = Number(document.getElementById("startgunaastrength").value);
		this.startStrength = num;

		if (this.localControl == "yes" && this.localControlOnly == "no") {
			if (this.raOrEoDirectedAaGuns == "yes") {
				this.finalStrength = this.startStrength / 4;
			} else {
				this.finalStrength = this.startStrength / 2;
			}
		} else {
			this.finalStrength = this.startStrength;
		}

		this.finalStrength = this.finalStrength * 100;
		this.finalStrength = Math.floor(this.finalStrength);
		this.finalStrength = this.finalStrength / 100;
    	document.getElementById("finalgunaastrength").value = this.finalStrength;
    	antiairGunHitChance.calc();
	}
};

/*
	calculate target signature modifier
*/
var targetSignature = {

	finalSignatureMod: 0,

	reset: function() {
		resetButtons("signaturebtns", "signaturesmall");
		this.finalSignatureMod = 0;
		document.getElementById("finaltargetsignature").value = this.finalSignatureMod;
	},

	clickButton: function(buttonId) {
		resetButtons("signaturebtns", buttonId);
		switch (buttonId) {
		case ("signaturelarge"):
			this.finalSignatureMod = 1;
			break;
		case ("signaturemedium"):
			this.finalSignatureMod = 0;
			break;
		case ("signaturesmall"):
			this.finalSignatureMod = 0;
			break;
		case ("signaturevsmall"):
			this.finalSignatureMod = -1;
			break;
		case ("signaturestealthy"):
			this.finalSignatureMod = -2;
		}
		document.getElementById("finaltargetsignature").value = this.finalSignatureMod;
		antiairGunHitChance.calc();
	}
};

/*
	calculate target altitude modifier
*/
var targetAltitude = {

	finalAltitudeMod: 0,

	reset: function() {
		resetButtons("altitudebtns", "altitudelow");
		this.finalAltitudeMod = 0;
		document.getElementById("finaltargetaltitude").value = this.finalAltitudeMod;
	},

	clickButton: function(buttonId) {
		resetButtons("altitudebtns", buttonId);
		switch (buttonId) {
		case ("altitudevlownossc"):
			this.finalAltitudeMod = -3;
			break;
		case ("altitudevlowssc"):
			this.finalAltitudeMod = 0;
			break;
		case ("altitudelow"):
			this.finalAltitudeMod = 0;
			break;
		case ("altitudemedium"):
			this.finalAltitudeMod = 0;
			break;
		case ("altitudehigh"):
			this.finalAltitudeMod = -2;
		}
		document.getElementById("finaltargetaltitude").value = this.finalAltitudeMod;
		antiairGunHitChance.calc();
	}
};

/*
	calculate target speed modifier
*/
var targetSpeed = {

	finalSpeedMod: 0,

	reset: function() {
		resetButtons("speedbtns", "speedtransonic");
		this.finalSpeedMod = 0;
		document.getElementById("finaltargetspeedmodifiers").value = this.finalSpeedMod;
	},

	clickButton: function(buttonId) {
		resetButtons("speedbtns", buttonId);
		switch (buttonId) {
		case ("speedhovering"):
			this.finalSpeedMod = 3;
			break;
		case ("speedslow"):
			this.finalSpeedMod = 2;
			break;
		case ("speedsubsonic"):
			this.finalSpeedMod = 1;
			break;
		case ("speedtransonic"):
			this.finalSpeedMod =0 ;
			break;
		case ("speedlowsupersonic"):
			this.finalSpeedMod = -1;
			break;
		case ("speedmedsupersonic"):
			this.finalSpeedMod = -2;
			break;
		case ("speedhighsupersonic"):
			this.finalSpeedMod = -4;
			break;
		case ("speedhypersonic"):
			this.finalSpeedMod = -6;
		}
		document.getElementById("finaltargetspeedmodifiers").value = this.finalSpeedMod;
		antiairGunHitChance.calc();
	}
};

/*
	calculate target maneuvers modifier
*/
var targetManeuvers = {

	finalManeuversMod: 0,

	reset: function() {
		resetButtons("maneuverbtns", "maneuversnone");
		this.finalManeuversMod = 0;
		document.getElementById("finaltargetmaneuvers").value = this.finalManeuversMod;
	},

	clickButton: function(buttonId) {
		resetButtons("maneuverbtns", buttonId);
		switch (buttonId) {
		case ("maneuversnone"):
			this.finalManeuversMod = 0;
			break;
		case ("maneuversmissileterminal"):
			this.finalManeuversMod = -1;
			break;
		case ("maneuvershighdiving"):
			this.finalManeuversMod = -2;
			break;
		case ("maneuversdivergent"):
			this.finalManeuversMod = -2;
			break;
		case ("maneuverscrossingtarget"):
			this.finalManeuversMod = -4;
			break;
		case ("maneuversnonmaneuvering"):
			this.finalManeuversMod = 2;
			break;
		}
		document.getElementById("finaltargetmaneuvers").value = this.finalManeuversMod;
		antiairGunHitChance.calc();
	}
};

// calculate antiair gun hit chance
var antiairGunHitChance = {

	finalAntiairGunHitChance: 0,

	reset: function() {
		this.finalAntiairGunHitChance = 0;
		document.getElementById("antiairgunhitchance").value = this.finalAntiairGunHitChance;
		this.drawresult();
	},

	drawresult: function() {
		let x = 914;
		let y = 198;
		let dx = 165;
		let dy = 0;
		let result = this.finalAntiairGunHitChance * 10;

		switch (true) {
		case  (result < 27):
			dx = 0;
			if (result < 0) {result = 0;}
			dy = result * 20;
			break;
		case (result < 54):
			dx = dx * 1;
			result = result - 27;
			dy = result * 20;
			break;
		case (result < 81):
			dx = dx * 2;
			result = result - 54;
			dy = result * 20;
			break;
		default:
			dx = dx * 3;
			if (result > 106) {result = 106;}
			result = result - 81;
			dy = result * 20;
		}

		x = x + dx;
		y = y + dy;
		game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
		game.context.strokeStyle = "rgb(57, 181, 74)";
		game.context.lineWidth = 3;
		game.context.strokeRect(x, y, 137, 19);
		game.context.fillStyle = "rgb(228, 228, 228)";
		game.context.fillRect(x + 1, y + 1, 137 - 2, 19 - 2);
	},

	calc: function() {
		let chance = gunAaStrength.finalStrength;
		chance += targetSignature.finalSignatureMod;
		chance += targetAltitude.finalAltitudeMod;
		chance += targetSpeed.finalSpeedMod;
		chance += targetManeuvers.finalManeuversMod;
		this.finalAntiairGunHitChance = chance.toFixed(1);
		document.getElementById("antiairgunhitchance").value = chance;
		this.drawresult();
	}
};

/*
	global functions
*/
function initialize() {
	game.init();
	resetall();
}

function resetall() {
	gunAaStrength.reset();
	targetSignature.reset();
	targetAltitude.reset();
	targetSpeed.reset();
	targetManeuvers.reset();
	antiairGunHitChance.reset();
}

function resetButtons(buttonClass, buttonId) {
	let buttonsCollection = document.getElementsByClassName(buttonClass);
	let buttonsArray = Array.from(buttonsCollection);
	buttonsArray.forEach(function(btn) {
		btn.setAttribute("style", "opacity: 0");
	})

	// reset default button
	document.getElementById(buttonId).style.opacity = 1;
}