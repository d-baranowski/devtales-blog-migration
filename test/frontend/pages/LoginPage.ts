import Agent from "../model/Agent";
import {Credentials} from "../login-journey";
import PlayPage from "./PlayPage";


class LoginPage {
    private readonly agent: Agent;

    constructor(agent: Agent) {
        this.agent = agent;
    }

    async expectToBeOnPage() {
        const title = await this.agent.page.title();
        expect(title).toContain("Sign in");
    }

    async loginWithCredentials(credentials: Credentials): Promise<PlayPage> {
        if (!credentials.login || !credentials.password) {
            expect(credentials.login).toBeTruthy();
            expect(credentials.password).toBeTruthy();
            throw new Error("Invalid credentials")
        }

        await this.agent.page.type('input[type="email"]', credentials.login);
        await this.agent.page.click("#identifierNext");
        await this.agent.page.waitForSelector('#password');

        await this.agent.page.waitForSelector('input[type="password"]', {visible: true});
        await this.agent.page.type('input[type="password"]', credentials.password);

        await this.agent.page.waitForSelector('#passwordNext', {visible: true});
        await this.agent.page.click('#passwordNext');
        await this.agent.page.waitForNavigation();

        return new PlayPage(this.agent);
    }
}

export default LoginPage;
