import * as devices from 'puppeteer/DeviceDescriptors';
import Agent, {spawnAgent} from "./model/Agent";
import loginJourney, {getUserCredentials} from "./login-journey";

const iPhonex = devices['iPhone X'];
const Nexus = devices['Nexus 10'];
const GalaxyNote3 = devices['Galaxy Note 3'];

describe("Login", () => {
    const url = process.env.PAGE_ADDRESS;

    expect(url).toBeTruthy();

    if (!url) {
        return;
    }

    let agents: Agent[] = [];
    const creds = getUserCredentials();

    beforeEach(async () => {
        const temp = await Promise.all([
            spawnAgent(url, iPhonex),
            spawnAgent(url)
        ]);

        agents = [...temp];
    });

    afterEach(() => {
        agents.forEach((a) => a.close());
    });

    test("Users can login", async () => {
        await  Promise.all([
            loginJourney(agents[0], {credentials: creds[0]}),
            loginJourney(agents[1], {credentials: creds[1]})
        ]);
    }, 120 * 1000);
});
