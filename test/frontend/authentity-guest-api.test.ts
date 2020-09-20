import axios from 'axios';

describe("authentity guest api", () => {
    const url = process.env.API_ADDRESS;

    test("Users can fetch guest session tokens", async () => {
        const resp = await axios.post(`${url}/user/guest-identity-token`);
        expect(resp.data.SessionID).toBeTruthy();
        expect(resp.data.Username).toBeTruthy();
        expect(resp.data.Picture).toBeTruthy();
    }, 300);
});
