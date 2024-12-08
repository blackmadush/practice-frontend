class AuthDataService {
  setSession(token: string): void {
    this.jwtToken = token;
  }

  set jwtToken(token: string) {
    localStorage.setItem("jwt_tk", token);
  }

  get jwtToken() {
    return localStorage.getItem("jwt_tk") ?? "";
  }
}

export const authDataService = new AuthDataService();
