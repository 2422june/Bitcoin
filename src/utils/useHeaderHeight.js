import { useEffect, useState } from 'react';

function readHeaderHeight() {
  if (typeof document === 'undefined') return 0;
  const el = document.querySelector('header');
  return el ? el.offsetHeight : 0;
}

export function useHeaderHeight() {
  const [height, setHeight] = useState(() => readHeaderHeight());

  useEffect(() => {
    const update = () => setHeight(readHeaderHeight());
    update();
    window.addEventListener('resize', update);
    const interval = setInterval(update, 500); // 레이아웃 변동 대비 간단 폴링
    return () => {
      window.removeEventListener('resize', update);
      clearInterval(interval);
    };
  }, []);

  return height;
}


