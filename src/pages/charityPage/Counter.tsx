import { useEffect} from "react";
import { 
  motion,
  useSpring, 
  useTransform, 
  useInView,
} from "framer-motion";
import { useRef } from "react";

// 1. Define the shape of your props
interface CounterProps {
  value: number;
  suffix?: string; // The '?' means it is optional
}

// 2. Apply the types to the component
function Counter({ value, suffix = "" }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
  });

  const displayValue = useTransform(springValue, (current) => 
    Math.round(current).toLocaleString() + suffix
  );

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}
export default Counter;