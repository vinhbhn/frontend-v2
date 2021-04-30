import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk/dist/src/sdk';

/**
 * @dev Gnosis Safe apps run in an iframe so if we're in the top window
 * we can quickly rule out that we're running as a Safe App
 */
export function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

/**
 * @dev Checks whether we can connect to a parent window using the Gnosis SDK
 * Check if we're in an iframe before trying to connect as Safe App to speed up standard init
 */
export const isGnosisSafeApp = async (): Promise<boolean> =>
  inIframe() &&
  Promise.race([
    new SafeAppsSDK().getSafeInfo().then(() => true),
    new Promise<boolean>(resolve => setTimeout(resolve, 500)).then(() => false)
  ]);
