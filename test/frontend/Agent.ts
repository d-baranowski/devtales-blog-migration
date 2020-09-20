import puppeteer, {Browser, Page} from "puppeteer";

class Agnet {
    browser: Browser|undefined;
    page: Page|undefined;

    async init(headless: boolean) {
        this.browser = await puppeteer.launch({ headless: headless });
        this.page = await this.browser.newPage();
    }

    close() {
        this.browser && this.browser.close()
    }
}

module.exports = Agnet;
