export function shortenAddress(address: string, num: number = 7, showEnd: Boolean = true) {
  if (!address) return null;
  return num
    ? `${address.slice(0).slice(0, num)}...${showEnd ? address.slice(0).slice(-num) : ''
    }`
    : address;
}

export default shortenAddress;