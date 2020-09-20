import Agent from "../model/Agent";

class PlayPage {
    private agent: Agent;

    constructor(agent: Agent) {
        this.agent = agent;
    }

    async expectToBeOnPage() {
        const title = await this.agent.page.title();
        expect(title).toContain("Play Chess");
    }

    async getProfilePic() {
        await this.agent.page.waitForSelector('img[alt="Profile Picture"]', { visible: true });
        const elements = await this.agent.page.$$('img[alt="Profile Picture"]');
        return await elements[0].getProperty("src")
    }
}

export default PlayPage
