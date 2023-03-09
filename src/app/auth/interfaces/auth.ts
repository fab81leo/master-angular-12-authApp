

export interface AuthResponse {
    ok     : boolean; // obligatorio
    uid?   : string; // opcional
    name?  : string; // opcional
    email? : string; // opcional
    token? : string; // opcional
    msg?   : string; // opcional
}