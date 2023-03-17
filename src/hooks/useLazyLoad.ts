import { useState, useEffect, useRef, type MutableRefObject } from 'react';

const useLazyLoad = (
  {
    distance,
  }: {
    distance: string;
  } = { distance: '100px' }
): { isNear: boolean; fromRef: MutableRefObject<Element | undefined> } => {
  const [isNear, setIsNear] = useState<boolean>(false);
  const fromRef = useRef<Element>();

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = entries => {
      const elementEntry = entries[0];
      if (elementEntry.isIntersecting) {
        setIsNear(true);
        observer.disconnect();
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: distance,
    });

    observer.observe(fromRef.current as Element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { isNear, fromRef };
};

export default useLazyLoad;
