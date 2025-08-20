import { useEffect, useRef, useState } from 'react';

export function useNow(tickMs = 1000) {
  const [now, setNow] = useState(new Date());
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const startAligned = () => {
      if (tickMs === 1000) {
        const nowInst = new Date();
        const delay = 1000 - nowInst.getMilliseconds();
        timeoutRef.current = setTimeout(() => {
          setNow(new Date());
          intervalRef.current = setInterval(() => setNow(new Date()), 1000);
        }, delay);
      } else {
        intervalRef.current = setInterval(() => setNow(new Date()), tickMs);
      }
    };

    startAligned();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [tickMs]);
  return now;
}

export function formatNow(now) {
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const mi = String(now.getMinutes()).padStart(2, '0');
  // 남은 초: 60 -> 1 카운트다운
  const currentSec = now.getSeconds();
  const remainingSec = currentSec === 0 ? 60 : 60 - currentSec;
  const ss = String(remainingSec);
  return {
    dateText: `${yyyy}.${mm}.${dd} - ${hh}:${mi}`,
    second: ss,
  };
}

export function formatPriceKRW(value) {
  try {
    return Number(value).toLocaleString('ko-KR', { maximumFractionDigits: 2 });
  } catch (_) {
    return String(value);
  }
}


