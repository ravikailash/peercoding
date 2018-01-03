const electron = require('electron');
const url = require('url'),
	  path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;


// SET ENV
//process.env.NODE_ENV = 'production'

let mainWindow;

// Listen for the app to be ready
app.on('ready', function(){
	// Create a new window
	mainWindow = new BrowserWindow({});
	
	// Loading the HTML
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'templates/login.html'),
		protocol: 'file',
		slashes: true
	}));
	
	// Close all the windows when quit
	mainWindow.on('closed', function(){
		app.quit();
	});
	
	// Loading the mainMenu template
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	// Inserting the menu
	Menu.setApplicationMenu(mainMenu);
});


// Creating the mainMenu template
const mainMenuTemplate = [
	{
		label: 'PeerCoding',
		submenu: [
			{
				label: 'About PeerCoding',
			},
			{ type: 'separator' },
			{
				label: 'Quit PeerCoding',
				accelerator: process.platform == 'darwin' ? 'Command+Q': 'Ctrl+Q',
				click(){
					app.quit();
				}
			}
		]
	},
	{
		label: 'File',
		submenu: [
			{
				label: 'Create a new account',
				accelerator: process.platform == 'darwin'? 'Command+Shift+N': 'Ctrl+Shift+A',
				click() {
					mainWindow.loadURL(url.format({
						pathname: path.join(__dirname, 'templates/register.html'),
						protocol: 'file',
						slashes: true
					}));
				}
			},
			{
				label: 'Sign into an existing account',
				accelerator: process.platform == 'darwin'? 'Command+N': 'Ctrl+N',
				click() {
					mainWindow.loadURL(url.format({
						pathname: path.join(__dirname, 'templates/login.html'),
						protocol: 'file',
						slashes: true
					}));
				}
			}
		]
	},
	{
		label: 'Edit',
		submenu: [
			{role: 'undo'},
			{role: 'redo'},
			{type: 'separator'},
			{role: 'cut'},
			{role: 'copy'},
			{role: 'paste'},
			{type: 'separator'},
			{role: 'pasteandmatchstyle'},
			{role: 'delete'},
			{role: 'selectall'}
		]
	},
	{
		label: 'View',
		submenu: [
			{role: 'reload'},
			{role: 'forcereload'},
			{type: 'separator'},
			{role: 'resetzoom'},
			{role: 'zoomin'},
			{role: 'zoomout'},
			{type: 'separator'},
			{role: 'togglefullscreen'}
		]
	},
	{
		label: 'Window',
		submenu: [
			{role: 'minimize'},
			{role: 'close'}
		]
	}
];

// Adding the empty item to main window menu template
//if (process.platform == 'darwin') {
//	mainMenuTemplate.unshift({});
//}

// Adding the developer tools when in developer mode
if (process.env.NODE_ENV != 'production') {
	const developerMenuTemplate = {
		label: 'Developer Tools',
		submenu: [
			{
				label: 'Toggle DevTools',
				accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
				click(item, focussedWindow){
					focussedWindow.toggleDevTools();
				}
			},
			{
				role: 'reload'
			}
		]
	};
	
	// Pushing developerMenuTemplate into the mainMenuTemplate
	mainMenuTemplate.push(developerMenuTemplate);
}

