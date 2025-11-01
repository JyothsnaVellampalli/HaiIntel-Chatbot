import { useState, useEffect, useCallback, useRef } from 'react';

// Generate unique session ID for chat persistence
export const generateSessionId = () => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Debounce utility hook
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Virtual scrolling hook for large message lists (only activates with 20+ messages)
export const useVirtualScroll = (items, itemHeight = 80, containerHeight = 300) => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef(null);

  // Only use virtual scrolling for large lists
  const shouldUseVirtualScroll = items.length > 20;

  const startIndex = shouldUseVirtualScroll ? Math.floor(scrollTop / itemHeight) : 0;
  const endIndex = shouldUseVirtualScroll 
    ? Math.min(startIndex + Math.ceil(containerHeight / itemHeight) + 1, items.length)
    : items.length;

  const visibleItems = shouldUseVirtualScroll ? items.slice(startIndex, endIndex) : items;
  const totalHeight = shouldUseVirtualScroll ? items.length * itemHeight : 'auto';
  const offsetY = shouldUseVirtualScroll ? startIndex * itemHeight : 0;

  const handleScroll = useCallback((e) => {
    if (shouldUseVirtualScroll) {
      setScrollTop(e.target.scrollTop);
    }
  }, [shouldUseVirtualScroll]);

  return {
    visibleItems,
    totalHeight,
    offsetY,
    startIndex,
    endIndex,
    handleScroll,
    scrollElementRef,
    shouldUseVirtualScroll
  };
};

// Intersection Observer hook for animations
export const useIntersectionObserver = (options = {}) => {
  const [entries, setEntries] = useState([]);
  const observer = useRef(null);

  const observe = useCallback((element) => {
    if (observer.current) {
      observer.current.observe(element);
    }
  }, []);

  const unobserve = useCallback((element) => {
    if (observer.current) {
      observer.current.unobserve(element);
    }
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver((observerEntries) => {
      setEntries(observerEntries);
    }, {
      threshold: 0.1,
      rootMargin: '20px',
      ...options
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [options]);

  return { entries, observe, unobserve };
};

// Hook for animating messages on scroll
export const useMessageAnimation = () => {
  const { entries, observe, unobserve } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '10px'
  });

  const animatedElements = useRef(new Set());

  const registerMessage = useCallback((element, messageId) => {
    if (element && !animatedElements.current.has(messageId)) {
      element.dataset.messageId = messageId;
      observe(element);
    }
  }, [observe]);

  useEffect(() => {
    entries.forEach((entry) => {
      const messageId = entry.target.dataset.messageId;
      if (entry.isIntersecting && messageId) {
        entry.target.classList.add('animate-message-in');
        animatedElements.current.add(messageId);
        unobserve(entry.target);
      }
    });
  }, [entries, unobserve]);

  return { registerMessage };
};

// Memoized time formatter utility
export const useFormatTime = () => {
  return useCallback((timestamp) => {
    // Ensure timestamp is a Date object
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);
};

// Non-hook version for direct usage
export const formatTime = (timestamp) => {
  // Ensure timestamp is a Date object
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};