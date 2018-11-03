/**
 *	@Description:
 *  	This module reads data from Flick gesture sensor and displays it
 *		on your magic mirror
 *	@Author:
 *  	Kai Sackville-Hii
 * 	@Date:
 * 		May, 2018
 */

Module.register("MMM-FlickNotifier", {
	// Default module config.
	defaults: {
		swipeState: "",
		eventMapRight: "UNKNOWN",
		eventMapLeft: "UNKNOWN",
		eventMapUp: "UNKNOWN",
		eventMapDown: "UNKNOWN",
		eventMapAirWheel: "UNKNOWN",
	},

	getStyles() {
		return [this.file("/css/main.css")];
	},

	start() {
		Log.log('MMM-FlickNotifier started!');
		this.sendSocketNotification("FLICK_GESTURE", this.config);	
	},

	socketNotificationReceived(notification, payload) {
		if (notification === "SENSOR_SWIPED") {
			this.config.swipeState = payload.action.trim();
			this.updateDom();
			this.sendNotification('SENSOR_SWIPED', {action:payload.action});
		}
	},

	getArrows() {
	  var ImageNotifier = "modules/MMM-FlickNotifier/images/flick3d.png";
	  var notification = "UNKNOWN";

	  console.log("Notice");
	  console.log("Action:  " + (this.config.swipeState));
		
	  switch (this.config.swipeState) {
				case 'LEFT':
					notification = this.config.eventMapRight; 
					ImageNotifier = "modules/MMM-FlickNotifier/images/flick3d-left.png";
					break;
				case 'RIGHT':
					notification = this.config.eventMapLeft;
					ImageNotifier = "modules/MMM-FlickNotifier/images/flick3d-right.png";
					break;
				case 'UP':
					notification = this.config.eventMapUp;
					ImageNotifier = "modules/MMM-FlickNotifier/images/flick3d-up.png";
					break;
				case 'DOWN':
					notification = this.config.eventMapDown;
					ImageNotifier = "modules/MMM-FlickNotifier/images/flick3d-down.png";
					break;
				case 'AIRWHEEL':
					notification = this.config.eventMapAirWheel;
					ImageNotifier = "modules/MMM-FlickNotifier/images/flick3d-airwheel.png";
					break;
				default:
					break;
				
			}
		if (notification != "UNKNOWN")
			this.sendNotification(notification);

		var wrapper = document.createElement("div");

		wrapper.innerHTML = `
			<div>
				<img src=${ImageNotifier} alt="Flick3d">
			</div>`;

		return wrapper;
	},

	// Override dom generator.
	getDom: function() {
		let content = this.getArrows();
		return content
	},
});
