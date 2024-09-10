export interface ICredentials {
  username: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface TokenDecoded {
  user_id:number;
  exp: number;
  iat: number;
  roles: string[];
  username: string;
} 




