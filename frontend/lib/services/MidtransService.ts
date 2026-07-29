type SnapPayOptions = {
  onSuccess?: (result: any) => void;
  onPending?: (result: any) => void;
  onError?: (result: any) => void;
  onClose?: () => void;
};

export class MidtransService {
  /**
   * Safe wrapper to call Midtrans snap.pay
   * It handles cases where the script isn't loaded or CSP blocks it,
   * by automatically falling back to redirecting the user to the Midtrans hosted page.
   */
  static pay(
    snapToken: string, 
    redirectUrl: string, 
    options: SnapPayOptions
  ): void {
    const snap = (window as any).snap;

    if (snap && typeof snap.pay === 'function') {
      try {
        snap.pay(snapToken, {
          onSuccess: options.onSuccess,
          onPending: (result: any) => {
            if (options.onPending) options.onPending(result);
          },
          onError: (result: any) => {
            console.error('Midtrans Error:', result);
            if (options.onError) options.onError(result);
            // Fallback to redirect if error is critical
            else window.location.href = redirectUrl;
          },
          onClose: () => {
            if (options.onClose) options.onClose();
          }
        });
      } catch (error) {
        console.error('Failed to execute snap.pay:', error);
        // Fallback to redirect URL if snap.pay throws (e.g. CSP violation inside SDK)
        window.location.href = redirectUrl;
      }
    } else {
      console.warn('Midtrans snap object not found on window, falling back to redirectUrl');
      window.location.href = redirectUrl;
    }
  }
}
