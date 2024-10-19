export interface ApiResponse {
  status: number;
  token: string;
  data?: any;
  message?: string;
  code?: number;
}

export interface RegisterRequest {
  email: string;
  login: string;
  password: string;
}

export interface RegisterResponse {
  status: string;
  data: {
    user_id: string;
  };
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface VerifyEmailResponse {
  status: string;
}

export interface LoginRequest {
  email_or_login: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export interface DecodedToken {
  exp: number;
  iat: number;
  sub: string;
  email: string;
}
