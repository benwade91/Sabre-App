import decode from "jwt-decode";

const sabreToken = "token1"

class AuthService {
    // retrieve token data
    getProfile() {
        return decode(this.getToken());
    }

    // check if there is a saved token and it's still valid
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    // check if token has expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    // retrieve user token from localStorage
    getToken() {
        return localStorage.getItem(sabreToken);
    }

    // save user token to localStorage
    login(idToken) {
        localStorage.setItem(sabreToken, idToken);
    }

    // clear user token and profile data from localStorage
    logout() {
        localStorage.removeItem(sabreToken);
        window.location.assign("/");
    }
}

export default new AuthService();
