export const SCROLL_TRIGGER_DEFAULTS = {
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none reverse",
};

export const SCROLL_TRIGGER_OPTIONS = {
  features: {
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  techStack: {
    start: "top 75%",
  },
  about: {
    start: "top 70%",
  },
  downloadApp: {
    start: "top 80%",
  },
};

export const createScrollTriggerConfig = (customOptions = {}) => {
  return {
    ...SCROLL_TRIGGER_DEFAULTS,
    ...customOptions,
  };
};
