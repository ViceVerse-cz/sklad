import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const DynamicButton = dynamic(
  () => import('@/components/ui/button').then((module) => module.Button),
  { ssr: false }
);

const ClientButton = (props: any) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? <DynamicButton {...props} /> : null;
};

export default ClientButton;