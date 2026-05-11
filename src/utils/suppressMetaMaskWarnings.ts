// Suppress MetaMask connection warnings that appear in console
// MetaMask auto-injects into all web pages but isn't needed for this app
export function suppressMetaMaskWarnings() {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    // Filter out MetaMask-related errors
    const errorMessage = args.join(' ');
    if (
      errorMessage.includes('MetaMask') ||
      errorMessage.includes('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn')
    ) {
      return; // Suppress MetaMask errors
    }
    originalError.apply(console, args);
  };

  const originalInfo = console.info;
  console.info = (...args: any[]) => {
    const infoMessage = args.join(' ');
    if (
      infoMessage.includes('MetaMask') ||
      infoMessage.includes('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn')
    ) {
      return; // Suppress MetaMask info messages
    }
    originalInfo.apply(console, args);
  };
}
