import Agent from "../model/Agent";
import LoginPage from "./LoginPage";


class HomePage {
    private readonly agent: Agent;

    constructor(agent: Agent) {
        this.agent = agent;
    }

    async expectToBeOnPage() {
        const title = await this.agent.page.title();
        expect(title).toContain("Devtales Games");
    }

    async goToPlayPageViaLogin() {
        await this.agent.page.waitForSelector('#menu-tile-to-play', { visible: true });
        await this.agent.page.click("#menu-tile-to-play");
        await this.agent.page.waitForNavigation();
        await this.agent.page.waitForNavigation();
        return new LoginPage(this.agent)
    }
}

export default HomePage
