var game = {

	init: function() {
		game.canvas = document.getElementById("flowcanvas");
		game.context = game.canvas.getContext("2d");
	}
};

var missileAtaRating = {

	finalMissileAtaRating: 0,

	reset: function() {
		this.finalMissileAtaRating = 0;
		document.getElementById("missileatartng").value = this.finalMissileAtaRating;
		this.calc();
	},

	calc: function() {
		let num = Number(document.getElementById("missileatartng").value);
		this.finalMissileAtaRating = num;
		document.getElementById("finalmissileata").value = this.finalMissileAtaRating;
		antiairMissileAttack.calc();
	}
};

var combatSystemModifier = {

		shipCsGen: 1,
		isMissile: 0,
		csModArray: [[-1, 0], [0, 1], [0.5, 2], [1, 2.5], [1.5, 3]],
		finalCsModifier: 0,

		reset: function() {
			resetButtons("csmodifierbuttons", "shipcsgen3");
			resetButtons("cstargetbuttons", "missiletargetatamod");
			this.shipCsGen = 1;
			this.isMissile = 0;
			this.finalCsModifier = 0;
			document.getElementById("finalcsmodifier").value = this.finalCsModifier;
		},

		clickButtonGen: function(buttonId) {
			resetButtons("csmodifierbuttons", buttonId);

			switch (buttonId) {
				case ("shipcsgen2"):
					this.shipCsGen = 0;
					break;
				case ("shipcsgen3"):
					this.shipCsGen = 1;
					break;
				case ("shipcsgen4"):
					this.shipCsGen = 2;
					break;
				case ("shipcsgen56h"):
					this.shipCsGen = 3;
					break;
				case ("shipcsgen56a"):
					this.shipCsGen = 4;
			}

			this.calc();
		},

		clickButtonTarget: function(buttonId) {
			resetButtons("cstargetbuttons", buttonId);

			switch (buttonId) {
				case ("missiletargetatamod"):
					this.isMissile = 0;
					break;
				case ("aircrafttargetatamod"):
					this.isMissile = 1;
			}

			this.calc();
		},

		calc: function() {
			this.finalCsModifier = this.csModArray[this.shipCsGen][this.isMissile];
			document.getElementById("finalcsmodifier").value = this.finalCsModifier;
			antiairMissileAttack.calc();
		}
};

var targetManeuverRating = {

	initialTargetManeuverRating: 0,
	targetEvading: "no",
	finalTargetManeuverRating: 0,

	reset: function() {
		resetButtons("targetmanbuttons", "targetevadingno");
		this.initialTargetManeuverRating = 0;
		this.targetEvading = "no";
		this.finalTargetManeuverRating = 0;
		document.getElementById("targetmanrtng").value = this.initialTargetManeuverRating;
		document.getElementById("finaltargetmanrtng").value = this.finalTargetManeuverRating;
	},

	clickButton: function(buttonId) {
		resetButtons("targetmanbuttons", buttonId);

		switch (buttonId) {
			case ("targetevadingno"):
				antiairMissileCountermeasures.changeEvadeButtons("targetevadeno");
				this.targetEvading = "no";
				break;
			case ("targetevadingyes"):
				antiairMissileCountermeasures.changeEvadeButtons("targetevadeyes");
				this.targetEvading = "yes";
		}

		this.calc();
	},

	changeEvadeButtons: function(buttonId) { // only called from antiairMissileCountermeasures
		resetButtons("targetmanbuttons", buttonId);

		switch (buttonId) {
			case ("targetevadingno"):
				this.targetEvading = "no";
				break;
			case ("targetevadingyes"):
				this.targetEvading = "yes";
		}

		this.calc();
	},

	calc: function() {
		this.initialTargetManeuverRating = Number(document.getElementById("targetmanrtng").value);

		if (this.targetEvading == "yes") {
			this.finalTargetManeuverRating = this.initialTargetManeuverRating;
		} else {
			this.finalTargetManeuverRating = 0;
		}

		document.getElementById("finaltargetmanrtng").value = this.finalTargetManeuverRating;
		antiairMissileAttack.calc();
	}
};

var targetSpeedModifiers = {

	targetSpeedModifier: 0,
	terminalModifier: 0,
	finalTargetSpeedModifier: 0,

	reset: function() {
		resetButtons("targetspeedbuttons", "transonic");
		document.getElementById("terminalman").style.opacity = 0;
		this.targetSpeedModifier = 0;
		this.terminalModifier = 0;
		this.finalTargetSpeedModifier = 0;
		document.getElementById("finaltargetspeedmodifier").value = this.finalTargetSpeedModifier;
	},

	clickSpeedButton: function(buttonId) {
		resetButtons("targetspeedbuttons", buttonId);

		switch (buttonId) {
			case ("slow"):
				this.targetSpeedModifier = 2;
				break;
			case ("subsonic"):
				this.targetSpeedModifier = 1;
				break;
			case ("transonic"):
				this.targetSpeedModifier = 0;
				break;
			case ("lowsupers"):
				this.targetSpeedModifier = -1;
				break;
			case ("medsupers"):
				this.targetSpeedModifier = -2;
				break;
			case ("highsupers"):
				this.targetSpeedModifier = -3;
				break;
			case ("lowhypers"):
				this.targetSpeedModifier = -4;
				break;
			case ("medhypers"):
				this.targetSpeedModifier = -5;
				break;
			case ("highhypers"):
				this.targetSpeedModifier = -6;
		}

		this.calc();
	},

	clickTerminalButton: function() {
		if (this.terminalModifier == 0) {
			this.terminalModifier = -1;
			document.getElementById("terminalman").style.opacity = 1;
		} else {
			this.terminalModifier = 0;
			document.getElementById("terminalman").style.opacity = 0;
		}

		this.calc();
	},

	calc: function() {
		this.finalTargetSpeedModifier = this.targetSpeedModifier + this.terminalModifier;
		document.getElementById("finaltargetspeedmodifier").value = this.finalTargetSpeedModifier;
		antiairMissileAttack.calc();
	}
};

var targetSize = {

		finalTargetSizeModifier: 0,

		reset: function() {
			resetButtons("targetsizebuttons", "largemediumsmall");
			this.finalTargetSizeModifier = 0;
			document.getElementById("finaltargetsize").value = this.finalTargetSizeModifier;
		},

		clickTargetSizeButton: function(buttonId) {
			resetButtons("targetsizebuttons", buttonId);

			switch (buttonId) {
				case ("largemediumsmall"):
					this.finalTargetSizeModifier = 0;
					break;
				case ("vsmall"):
					this.finalTargetSizeModifier = -1;
					break;
				case ("stealthy"):
					this.finalTargetSizeModifier = -2;
			}

			document.getElementById("finaltargetsize").value = this.finalTargetSizeModifier;
			antiairMissileAttack.calc();
		}
};

var bearingRateModifier = {

	finalBearingRateModifier: 0,

	reset: function() {
		resetButtons("bearingratebuttons", "closing");
		this.finalBearingRateModifier = 0;
		document.getElementById("finalbearingratemodifier").value = this.finalBearingRateModifier;
	},

	clickBearingRateButton: function(buttonId) {
		resetButtons("bearingratebuttons", buttonId);

		switch (buttonId) {
			case ("closing"):
				this.finalBearingRateModifier = 0;
				break;
			case ("divergent"):
				this.finalBearingRateModifier = -2;
				break;
			case ("crossing"):
				this.finalBearingRateModifier = -4;
				break;
			case ("highdiving"):
				this.finalBearingRateModifier = -2;
		}

		document.getElementById("finalbearingratemodifier").value = this.finalBearingRateModifier;
		antiairMissileAttack.calc();
	}
};

var antiairMissileCountermeasures = {

	missileSeekerGeneration: "1",
	countermeasureGeneration: "1",
	typeOfCountermeasure: "jammer",
	noJammerOrDecoy: "yes",
	targetIsEvading: "no",
	finalAntiairMissileCountermeasure: 0,
	jammerModifierArray: [[-1.5, -2, -2.5, -3.5], [-1, -1.5, -2, -3], [-.5, -1, -1.5, -2.5], [0, -.5, -1, -2], [0, 0, -.5, -1.5]],
	decoyModifierArray: [[-1, -1.5, -2, -3], [-.5, -1, -1.5, -2.5], [-.5, -.5, -1, -2], [0, -.5, -.5, -1.5], [0, 0, -.5, -1]],
	decoyjammerModifierArray: [[-2.5, -3.5, -4.5, -5.5], [-2, -3, -3.5, -5], [-1, -2, -3, -4.5], [-.5, -1, -2, -3.5], [0, -.5, -1, -2.5]],

	reset: function() {
		resetButtons("nocountermeasures", "nojammerordecoy");
		resetButtons("mslseekerjammer", "");
		resetButtons("mslseekerdecoy", "");
		resetButtons("mslseekerdecoyjammer", "");
		resetButtons("jammer", "");
		resetButtons("decoy", "");
		resetButtons("decoyjammer", "");
		if (targetManeuverRating.targetEvading == "no") resetButtons("targetevadebuttons", "targetevadeno");
		this.missileSeekerGeneration = "1";
		this.countermeasureGeneration = "1";
		this.typeOfCountermeasure = "jammer";
		this.noJammerOrDecoy = "yes";
		this.targetIsEvading = "no";
		this.finalAntiairMissileCountermeasure = 0;
		document.getElementById("finalantiairmissilecountermeasures").value = this.finalAntiairMissileCountermeasure;
	},

	clickNoJammerDecoyButton: function() {
		if (this.noJammerOrDecoy == "no") {
			this.reset();
			antiairMissileAttack.calc();
		}
	},

	clickSeekerVsJammerButton: function(buttonId) {
		resetButtons("nocountermeasures", "");
		resetButtons("mslseekerjammer", buttonId);
		resetButtons("mslseekerdecoy", "");
		resetButtons("mslseekerdecoyjammer", "");
		resetButtons("jammer", getButtonIdByName("jammer", this.countermeasureGeneration));
		resetButtons("decoy", "");
		resetButtons("decoyjammer", "");
		this.typeOfCountermeasure = "jammer";
		this.noJammerOrDecoy = "no";
		this.missileSeekerGeneration = document.getElementById(buttonId).name;
		this.calc();
	},

	clickSeekerVsDecoyButton: function(buttonId) {
		resetButtons("nocountermeasures", "");
		resetButtons("mslseekerjammer", "");
		resetButtons("mslseekerdecoy", buttonId);
		resetButtons("mslseekerdecoyjammer", "");
		resetButtons("jammer", "");
		resetButtons("decoy", getButtonIdByName("decoy", this.countermeasureGeneration));
		resetButtons("decoyjammer", "");
		this.typeOfCountermeasure = "decoy";
		this.noJammerOrDecoy = "no";
		this.missileSeekerGeneration = document.getElementById(buttonId).name;
		this.calc();
	},

	clickSeekerVsDecoyJammerButton: function(buttonId) {
		resetButtons("nocountermeasures", "");
		resetButtons("mslseekerjammer", "");
		resetButtons("mslseekerdecoy", "");
		resetButtons("mslseekerdecoyjammer", buttonId);
		resetButtons("jammer", "");
		resetButtons("decoy", "");
		resetButtons("decoyjammer", getButtonIdByName("decoyjammer", this.countermeasureGeneration));
		this.typeOfCountermeasure = "decoyjammer";
		this.noJammerOrDecoy = "no";
		this.missileSeekerGeneration = document.getElementById(buttonId).name;
		this.calc();
	},

	clickJammerButton: function(buttonId) {
		resetButtons("nocountermeasures", "");
		resetButtons("jammer", buttonId);
		resetButtons("decoy", "");
		resetButtons("decoyjammer", "");
		resetButtons("mslseekerjammer", getButtonIdByName("mslseekerjammer", this.missileSeekerGeneration));
		resetButtons("mslseekerdecoy", "");
		resetButtons("mslseekerdecoyjammer", "");
		this.typeOfCountermeasure = "jammer";
		this.noJammerOrDecoy = "no";
		this.countermeasureGeneration = document.getElementById(buttonId).name;
		this.calc();
	},

	clickDecoyButton: function(buttonId) {
		resetButtons("nocountermeasures", "");
		resetButtons("jammer", "");
		resetButtons("decoy", buttonId);
		resetButtons("decoyjammer", "");
		resetButtons("mslseekerjammer", "");
		resetButtons("mslseekerdecoy", getButtonIdByName("mslseekerdecoy", this.missileSeekerGeneration));
		resetButtons("mslseekerdecoyjammer", "");
		this.typeOfCountermeasure = "decoy";
		this.noJammerOrDecoy = "no";
		this.countermeasureGeneration = document.getElementById(buttonId).name;
		this.calc();
	},

	clickDecoyJammerButton: function(buttonId) {
		resetButtons("nocountermeasures", "");
		resetButtons("jammer", "");
		resetButtons("decoy", "");
		resetButtons("decoyjammer", buttonId);
		resetButtons("mslseekerjammer", "");
		resetButtons("mslseekerdecoy", "");
		resetButtons("mslseekerdecoyjammer", getButtonIdByName("mslseekerdecoyjammer", this.missileSeekerGeneration));
		this.typeOfCountermeasure = "decoyjammer";
		this.noJammerOrDecoy = "no";
		this.countermeasureGeneration = document.getElementById(buttonId).name;
		this.calc();
	},

	clickTargetEvadeButton: function(buttonId) {
		resetButtons("targetevadebuttons", buttonId);

		switch (buttonId) {
			case ("targetevadeyes"):
				targetManeuverRating.changeEvadeButtons("targetevadingyes");
				this.targetIsEvading = "yes";
				break;
			case ("targetevadeno"):
				targetManeuverRating.changeEvadeButtons("targetevadingno");
				this.targetIsEvading = "no";
		}

		this.calc();
	},

	changeEvadeButtons: function(buttonId) { // only called from targetManeuverRating
		resetButtons("targetevadebuttons", buttonId);

		switch (buttonId) {
			case ("targetevadeyes"):
				this.targetIsEvading = "yes";
				break;
			case ("targetevadeno"):
				this.targetIsEvading = "no";
		}

		this.calc();
	},

	calc: function() {
		let row = Number(this.missileSeekerGeneration) - 1;
		let col = Number(this.countermeasureGeneration) - 1;
		let modifierValue = 0;

		switch (this.typeOfCountermeasure) {
			case ("jammer"):
				modifierValue = this.jammerModifierArray[row][col];
				break;
			case ("decoy"):
				modifierValue = this.decoyModifierArray[row][col];
				break;
			case ("decoyjammer"):
				modifierValue = this.decoyjammerModifierArray[row][col];
		}
		
		if (this.targetIsEvading == "no") modifierValue /= 2;
		if (this.noJammerOrDecoy == "yes") modifierValue = 0;

		this.finalAntiairMissileCountermeasure = modifierValue;
		document.getElementById("finalantiairmissilecountermeasures").value = this.finalAntiairMissileCountermeasure;
		antiairMissileAttack.calc();
		graphics.draw();
	}
};

var rangeBandModifier = {

		finalRangeBandModifier: 0,

		reset: function() {
			resetButtons("rangebandbuttons", "pointdefense");
			this.finalRangeBandModifier = 0;
			document.getElementById("finalrangebandmodifier").value = this.finalRangeBandModifier;
		},

		clickRangeBandButton: function(buttonId) {
			resetButtons("rangebandbuttons", buttonId);

			switch (buttonId) {
				case ("pointdefense"):
					this.finalRangeBandModifier = 0;
					break;
				case ("short"):
					this.finalRangeBandModifier = 0;
					break;
				case ("medium1"):
					this.finalRangeBandModifier = 0;
					break;
				case ("medium2"):
					this.finalRangeBandModifier = -.5;
					break;
				case ("long1"):
					this.finalRangeBandModifier = -.5;
					break;
				case ("long2"):
					this.finalRangeBandModifier = -1;
					break;
				case ("verylong"):
					this.finalRangeBandModifier = -1.5;
					break;
				case ("extreme"):
					this.finalRangeBandModifier = -2;
			}

			document.getElementById("finalrangebandmodifier").value = this.finalRangeBandModifier;
			antiairMissileAttack.calc();
		}
};

var seaskimmerCapability = {

	seaskimmerCapabilityModifer: 0,
	targetSeaskimming: "no",
	finalSeaskimmerModifier: 0,

	reset: function() {
		resetButtons("seaskimmerbuttons", "fullcapability");
		resetButtons("seaskimmeryesno", "seaskimmerno");
		this.seaskimmerCapabilityModifer = 0;
		this.targetSeaskimming = "no";
		this.finalSeaskimmerModifier = 0;
		document.getElementById("finalseaskimmer").value = this.finalSeaskimmerModifier;
	},

	clickSeaskimmerButton: function(buttonId) {
		resetButtons("seaskimmerbuttons", buttonId);

		switch (buttonId) {
			case ("fullcapability"):
				this.seaskimmerCapabilityModifer = 0;
				break;
			case ("partialcapability"):
				this.seaskimmerCapabilityModifer = -2;
				break;
			case ("notcapable"):
				this.seaskimmerCapabilityModifer = -4;
		}

		if (this.targetSeaskimming == "yes") {
			this.finalSeaskimmerModifier = this.seaskimmerCapabilityModifer;
		} else {
			this.finalSeaskimmerModifier = 0;
		}

		document.getElementById("finalseaskimmer").value = this.finalSeaskimmerModifier;
		antiairMissileAttack.calc();
	},

	clickSeaskimmerYesNoButton: function(buttonId) {
		resetButtons("seaskimmeryesno", buttonId);

		switch (buttonId) {
			case ("seaskimmeryes"):
				this.targetSeaskimming = "yes";
				this.finalSeaskimmerModifier = this.seaskimmerCapabilityModifer;
				break;
			case ("seaskimmerno"):
				this.targetSeaskimming = "no";
				this.finalSeaskimmerModifier = 0;
		}

		document.getElementById("finalseaskimmer").value = this.finalSeaskimmerModifier;
		antiairMissileAttack.calc();
	}
};

var antiairMissileAttack = {

	finalAntiairMissileAttack: 0,

	reset: function() {
		this.finalAntiairMissileAttack = 0;
		document.getElementById("finalantiairmissileattack").value = this.finalAntiairMissileAttack;
	},

	calc: function() {
		this.finalAntiairMissileAttack = missileAtaRating.finalMissileAtaRating;
		this.finalAntiairMissileAttack += combatSystemModifier.finalCsModifier;
		this.finalAntiairMissileAttack -= targetManeuverRating.finalTargetManeuverRating;
		this.finalAntiairMissileAttack += targetSpeedModifiers.finalTargetSpeedModifier;
		this.finalAntiairMissileAttack += targetSize.finalTargetSizeModifier;
		this.finalAntiairMissileAttack += bearingRateModifier.finalBearingRateModifier;
		this.finalAntiairMissileAttack += rangeBandModifier.finalRangeBandModifier;
		this.finalAntiairMissileAttack += antiairMissileCountermeasures.finalAntiairMissileCountermeasure;
		this.finalAntiairMissileAttack += seaskimmerCapability.finalSeaskimmerModifier;

		// round down to nearest .5
		let realAttackValue = this.finalAntiairMissileAttack;
		let multiplier = this.finalAntiairMissileAttack / .5;

		if (this.finalAntiairMissileAttack < 0 && !Number.isInteger(multiplier)) {
			multiplier -=1;
		}

		multiplier = Math.trunc(multiplier);
		this.finalAntiairMissileAttack = multiplier * .5;
		document.getElementById("finalantiairmissileattack").value = realAttackValue;
		graphics.draw();
	}
};

var graphics = {

	draw: function() {
		game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
		this.drawCsModifier();
		if (antiairMissileCountermeasures.noJammerOrDecoy == "no") this.drawAntiairMissileCountermeasures();
		this.drawAntiairMissileAttack();
	},

	drawCsModifier: function() {
		let x = 174;
		let y = 644;
		x += combatSystemModifier.isMissile * 96;
		y += combatSystemModifier.shipCsGen * 20;
		game.context.strokeStyle = "rgb(237, 28, 36)";
		game.context.lineWidth = 3;
		game.context.strokeRect(x, y, 35, 19);
		game.context.fillStyle = "rgb(228, 228, 228)";
		game.context.fillRect(x + 1, y + 1, 35 - 2, 19 - 2);
	},

	drawAntiairMissileCountermeasures: function() {
		let x, y = 0;
		let seekerGen = Number(antiairMissileCountermeasures.missileSeekerGeneration) - 1;
		let countermeasureGen = Number(antiairMissileCountermeasures.countermeasureGeneration) - 1;
		
		switch (antiairMissileCountermeasures.typeOfCountermeasure) {
			case ("jammer"):
				x = 1001;
				y = 654;
				x += countermeasureGen * 57;
				y += seekerGen * 20;
				break;
			case ("decoy"):
				x = 1001;
				y = 841;
				x += countermeasureGen * 57;
				y += seekerGen * 20;
				break;
			case ("decoyjammer"):
				x = 1001;
				y = 1027;
				x += countermeasureGen * 57;
				y += seekerGen * 20;
		}

		game.context.strokeStyle = "rgb(46, 49, 146)";
		game.context.lineWidth = 3;
		game.context.strokeRect(x, y, 36, 19);
		game.context.fillStyle = "rgb(228, 228, 228)";
		game.context.fillRect(x + 1, y + 1, 35 - 2, 19 - 2);
	},

	drawAntiairMissileAttack: function() {
		let x = 1328;
		let y = 480;
		let mslAttack = antiairMissileAttack.finalAntiairMissileAttack;

		if (mslAttack < -4.5) mslAttack = -4.5;
		if (mslAttack > 5.5) mslAttack = 5.5;

		let dy = mslAttack * 2;
		y += dy * 20;

		game.context.strokeStyle = "rgb(57, 181, 74)";
		game.context.lineWidth = 3;
		game.context.strokeRect(x, y, 202, 19);
		game.context.fillStyle = "rgb(228, 228, 228)";
		game.context.fillRect(x + 1, y + 1, 202 - 2, 19 - 2);
	}
};

/* global functions */

function resetall() {
	missileAtaRating.reset();
	combatSystemModifier.reset();
	targetManeuverRating.reset();
	targetSpeedModifiers.reset();
	targetSize.reset();
	bearingRateModifier.reset();
	antiairMissileCountermeasures.reset();
	rangeBandModifier.reset();
	seaskimmerCapability.reset();
	antiairMissileAttack.reset();
	graphics.draw();
}

function resetButtons(buttonClass, buttonId = "") {
	let buttonsCollection = document.getElementsByClassName(buttonClass);
	let buttonsArray = Array.from(buttonsCollection);

	buttonsArray.forEach(function(btn) {
		btn.setAttribute("style", "opacity: 0");
	})

	if (buttonId != "") {
		document.getElementById(buttonId).style.opacity = 1;
	}
}

function getButtonIdByName(buttonClass, buttonName) {
	let buttonsCollection = document.getElementsByClassName(buttonClass);
	let buttonsArray = Array.from(buttonsCollection);
	let elementId = "";

	buttonsArray.forEach(function(btn) {
		let n = btn.getAttribute("name");
		if (n == buttonName) {
			elementId = btn.getAttribute("id");
		}
	})
	return elementId;
}

window.onload = function() {
	game.init();
	resetall();
}