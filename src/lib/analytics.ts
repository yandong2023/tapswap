export const trackPageView = (url: string) => {
  try {
    window.gtag('config', 'G-EM390M5M95', {
      page_path: url,
    });
  } catch (err) {
    console.error('Failed to track page view:', err);
  }
};

export const trackEvent = (action: string, category: string, label: string, value?: number) => {
  try {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } catch (err) {
    console.error('Failed to track event:', err);
  }
}; 