import { Colour, compute, store } from "openrct2-flexui";

export const title = store<string>("Plugin Template");
export const pluginKeyString = "plugin";

export const isPinned = store<boolean>(context.sharedStorage.get(pluginKeyString + ".favourite", false));
export const menuLabel = compute(isPinned, f => (f) ? `- ${title.get()}` : title.get())

export const window = store<Window | null>(null);

export function setColour(key: string, colour: Colour): void
{
    return context.sharedStorage.set(key, colour);
}

export function getColour(key: string, colour: Colour): Colour
{
    return context.sharedStorage.get(key, colour);
}

export function setMenuItem(isFavourite: boolean): void
{
    return context.sharedStorage.set(pluginKeyString + ".favourite", isFavourite);
}

export function getMenuItem(isFavourite: boolean): boolean
{
    return context.sharedStorage.get(pluginKeyString + ".favourite", isFavourite);
}

export function initSettings(): void
{
getColour(pluginKeyString + ".main.primary", Colour.AquaDark);
getColour(pluginKeyString + ".main.secondary", Colour.LightBrown);
}

export function getWindow(title: string): Window | null {
    for (let i = 0; i < ui.windows; i++) {
        if (ui.getWindow(i).title === title) return ui.getWindow(i);
    }
    return null;
}