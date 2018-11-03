/**
 *	@Description:
 *  	This file handles the child process nessisary to talk between the sensor
 *    (python) and magic mirror (js)
 *	@Author:
 *  	Kai Sackville-Hii
 * 	@Date:
 * 		May, 2018 ckk
 */

const { spawn } = require('child_process');

function listen(payload, eventhandler){
  var cmd = null;
  var flickSensor_script =  __dirname + "/flick-sensor.py";
  cmd = spawn('python',[flickSensor_script]);
  
  cmd.stdout.on('data', (data) => {
    var str_data = data.toString()
    str_data = str_data.slice(0,-1)
    eventhandler.sendSocketNotification("SENSOR_SWIPED", {action: str_data});
  });
  cmd.stderr.on('data', (data) => {
    console.log(data.toString());
  });
  cmd.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
  });
}

module.exports = {
    listen,
};