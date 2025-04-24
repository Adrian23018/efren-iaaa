
export interface LoginRequest {
    email: string;
    password: string;
  }

  export interface LoginResponse {
    message: string;
    userId: string;
    token: string;
    userInfo: userInfo;
  }

  export interface userInfo{
    name: string;
    last_name: string;
    email: string;
    number:string;
  }
