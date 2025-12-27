export interface LoginRequestDTO {
  email: string
  password: string
}

export interface RegisterRequestDTO {
  email: string
  password: string
}

export interface LoginDTO {
  token: string
}

export interface RegisterDTO {
  token: string
}
