import { menuLabel, title } from "./settings";
import { windowMain } from "./ui";

function onClickMenuItem()
{
	// Write code here that should happen when the player clicks the menu item under the map icon.
	windowMain.open();
	console.log([`${title} started`]);
}


export function startup()
{
	// Write code here that should happen on startup of the plugin.



	// Register a menu item under the map icon:
	if (typeof ui !== "undefined")
	{
		console.log(["\x1b[1;33m" + `${title} initialized` + "\x1b[0m"]);
		ui.registerMenuItem(menuLabel.get(), () => onClickMenuItem());
	}
}