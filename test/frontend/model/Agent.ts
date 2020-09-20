import puppeteer, {EmulateOptions, Page} from "puppeteer";
import {Device} from "puppeteer/DeviceDescriptors";

interface Agent {
    page: Page,
    close: () => void
}

export async function spawnAgent(url: string, device?: Device): Promise<Agent> {
    let browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();

    if (device) {
        await page.emulate(device as EmulateOptions);
    }

    await page.goto(url);

    return {page, close: () => { browser.close() }};
}

export default Agent;
