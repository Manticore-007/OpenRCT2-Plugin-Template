import { button, checkbox, Colour, colourPicker, groupbox, horizontal, label, store, tab, tabwindow } from "openrct2-flexui";
import { getColour, getWindow, isPinned, pluginKeyString, setColour, setMenuItem, title, window } from "./settings";
import { isDevelopment, pluginVersion } from "./environment";

const colourWindow =
{
    primary: store<Colour>(getColour(pluginKeyString + ".main.primary", Colour.AquaDark)),
    secondary: store<Colour>(getColour(pluginKeyString + ".main.secondary", Colour.LightBrown)),
};

const img =
{
    lens:  { frameBase: context.getIcon("search"), frameCount: 1, frameDuration: 4, offset: { x: 4, y: 1 } },
    info:  { frameBase: 5367, frameCount: 8, frameDuration: 4 },
    gear: { frameBase: 5201, frameCount: 4, frameDuration: 4 },
}

export const windowMain = tabwindow({
    title: "Plugin Template",
    width: 260,
    height: 230,
    colours: [colourWindow.primary.get(), colourWindow.secondary.get()],
    tabs: [
        tab({ //main tab
            image: img.lens,
            content: [
                groupbox({
                    height: "1w",
                    width: "1w",
                    content: []
                }),
                label({
                    text: "{BLACK}Manticore-007 © 2026",
                    height: 0,
                    padding: [-5, 0, 10, 0],
                    alignment: "centred"
                })
            ]
        }),
        tab({   //options
            image: img.gear,
            height: "inherit",
            content: [
                groupbox({
                    text: "Options",
                    content: [
                        checkbox({
                            text: "Pin to top in menu    {RED}(Requires reload of park)",
                            isChecked: isPinned,
                            onChange: (checked) =>
                            {
                                isPinned.set(checked);
                                setMenuItem(checked);
                            }
                        })
                    ]
                }),
                groupbox({
                    text: "Colours",
                    spacing: 0,
                    content: [
                        horizontal([
                            label({text: "Main window:"}),
                            colourPicker({
                                colour: colourWindow.primary,
                                onChange: (colour) =>
                                {
                                    colourWindow.primary.set(colour);
                                    setColour(pluginKeyString + ".main.primary", colour);
                                }
                            }),
                            colourPicker({
                                colour: colourWindow.secondary,
                                onChange: (colour) =>
                                {
                                    colourWindow.secondary.set(colour);
                                    setColour(pluginKeyString + ".main.secondary", colour);
                                }
                            }),
                        ]),
                        button({
                            text: "Reset to default colours",
                            height: 14,
                            width: "60%",
                            padding: {top: 4, left: "1w"},
                            onClick: resetColours
                        })
                    ]
                }),
            ]
        }),
		tab({
			image: img.info,
			content: [
				label({ text: "Plugin Template, a plugin for OpenRCT2", alignment: "centred", padding: [4, 0, 8, 0] }),
				horizontal([
					label({ text: "Version:" + "\n\nAuthor:" + "\n\nUI:" + "\n\nSpecial\nThanks:" + "\n\n", width: "25%" }),
					label({ text: versionString() + `\n\n{BLACK}Manticore-007` + `\n\n{BLACK}FlexUI by Basssiiie` + `\n\n{BLACK}Basssiiie`})
				]),
				label({ text: "https://github.com/Manticore-007\n/OpenRCT2-Plugin-Template", padding: ["90%", 0, 0, 0], alignment: "centred" })
			]
		}),
    ],
    onOpen: () => window.set(getWindow(title.get())),
    onUpdate: () => {
        const win = window.get();
        if (win) win.colours = [colourWindow.primary.get(), colourWindow.secondary.get()]
    }
});

function versionString(): string
{
    return isDevelopment ? `{BLACK}${pluginVersion} {BABYBLUE}[BETA]`: `{BLACK}${pluginVersion}`;
}

function resetColours(): void
{
    const deepWater = Colour.AquaDark;
    const brown = Colour.LightBrown;
    colourWindow.primary.set(deepWater);
    colourWindow.secondary.set(brown);
    setColour(pluginKeyString + ".main.primary", deepWater);
    setColour(pluginKeyString + ".main.secondary", brown);
}