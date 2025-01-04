declare module 'elliptic' {
  export class ec {
    constructor(curve: string)
    genKeyPair(): KeyPair
    keyFromPrivate(priv: string, enc?: 'hex'): KeyPair
    keyFromPublic(pub: string, enc: 'hex'): KeyPair
  }

  export interface KeyPair {
    verify(data: string, signature: string): boolean
    sign(data: string): Signature
    getPrivate(format?: 'hex'): string
    getPublic(format?: 'hex'): string
  }

  export interface Signature {
    toDER(enc?: 'hex'): string
  }
}
