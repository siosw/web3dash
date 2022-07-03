export async function formatWalletAddress(address, provider) {
  if (provider) {
    const ens = await provider.lookupAddress(address)
    if (ens !== null) return ens
  }
  return address.substring(0, 5) + '...' + address.substring(address.length - 3, address.length)
}
