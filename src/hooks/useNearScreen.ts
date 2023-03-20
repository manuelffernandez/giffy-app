import {
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type RefObject,
} from 'react';

interface Params {
  distance: string;
  externalRef: RefObject<Element>;
  once: boolean;
}

const useNearScreen = ({
  distance = '100px',
  externalRef,
  once = true,
}: Partial<Params>): {
  isNear: boolean;
  fromRef: MutableRefObject<Element | undefined>;
} => {
  const [isNear, setIsNear] = useState<boolean>(false);
  const fromRef = useRef<Element>();

  useEffect(() => {
    const elementToObserve =
      externalRef !== undefined
        ? (externalRef.current as Element)
        : (fromRef.current as Element);

    const observerCallback: IntersectionObserverCallback = entries => {
      const elementEntry = entries[0];
      if (elementEntry.isIntersecting) {
        setIsNear(true);
        once && observer.unobserve(elementToObserve);
      } else {
        !once && setIsNear(false);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: distance,
    });

    if (elementToObserve !== undefined) {
      observer.observe(elementToObserve);
    }

    return () => {
      observer.disconnect();
    };
  }, [externalRef]);

  return { isNear, fromRef };
};

export default useNearScreen;
