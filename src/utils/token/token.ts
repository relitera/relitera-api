export interface TokenI {
    generate(data: any): Promise<string | undefined>
    decode(token: string): Promise<any | undefined>
}