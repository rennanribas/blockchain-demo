import { ec as EC } from 'elliptic'
import SHA256 from 'crypto-js/sha256'
import RIPEMD160 from 'crypto-js/ripemd160'

const ec = new EC('secp256k1')

export const generateBitcoinKeyPair = () => {
  const keyPair = ec.genKeyPair()

  const privateKey = keyPair.getPrivate('hex')
  const publicKey = keyPair.getPublic('hex')

  return { privateKey, publicKey }
}

export const generateBitcoinAddress = (publicKey: string): string => {
  const hash = RIPEMD160(SHA256(publicKey).toString()).toString()
  const address = `1${hash}`
  return address
}
