import Agent from "./model/Agent";
import HomePage from "./pages/HomePage";

export type Credentials = {
    login: string|undefined,
    password: string|undefined
}

export function getUserCredentials(): Credentials[] {
    return [{
        login: process.env.USER_ONE_LOGIN,
        password: process.env.USER_ONE_PASSWORD
    }, {
        login: process.env.USER_TWO_LOGIN,
        password: process.env.USER_TWO_PASSWORD
    }]

}

async function loginJourney(agent: Agent, props: { credentials: Credentials }) {
    if (!props.credentials.login || !props.credentials.password) {
        expect(props.credentials.login).toBeTruthy();
        expect(props.credentials.password).toBeTruthy();
        return
    }

    const homePage = new HomePage(agent);

    await homePage.expectToBeOnPage();
    const loginPage = await homePage.goToPlayPageViaLogin();

    await loginPage.expectToBeOnPage();
    const playPage = await loginPage.loginWithCredentials(props.credentials);

    await playPage.expectToBeOnPage();

    const picSrc = await playPage.getProfilePic();
    expect(picSrc).toBeTruthy();
}

export default loginJourney;
