'use client';

import Loader from '@/app/components/Loader';
import ActiveUsers from '@/app/components/chat/ActiveUsers';
import Header from '@/app/components/chat/Header';
import RegisteredUsers from '@/app/components/chat/RegisteredUsers';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MessagePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { get } = useLocalStorage();
  const router = useRouter();

  useEffect(() => {
    const isSignedIn = get('user_data');
    if (!isSignedIn) {
      router.push('/signin');
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="grid h-screen items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }
  return (
    <>
      <Header />
      <ActiveUsers />
      <RegisteredUsers />
    </>
  );
}
