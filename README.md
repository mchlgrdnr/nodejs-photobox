# nodejs-photobox
A node.js application for a photobox (photo booth). This node app is the controller for the connected DSLR camera and the printer device. It also provides an angular inteface fot the touchscreen.


## Install
* You have to provide the following list of prerequires:
* Node.js ~0.10.0
* NPM ~1.2.15
* libgphoto2 ~2.5.x - via brew install libgphoto2, apt-get install libgphoto2-2-dev or download and build  * from http://www.gphoto.org/proj/libgphoto2/
* pkg-config | dpkg (used for dependency checking)
* clang compiler

For more information take a look at [lwille/node-gphoto2](https://github.com/lwille/node-gphoto2).

## workflow to estabish camera connection (current workaround)
The main problem is that in most cases the camera is stil busy and locked. So as a workaround, you have to do the following steps:

* running npm test
* kill the process of the mocha process with ps aux | grep node
* then run the server and estabish the connection

The fix for the issue will follow in another version soon.


## Coming soon
* Many UI improvements (logo handling, print actions ...)
