'use client';

import Loader from '@/app/components/Loader';
import Header from '@/app/components/chat/Header';
import MessageCollection from '@/app/components/chat/MessageCollection';
import SendMessage from '@/app/components/chat/SendMessage';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MessagePage({ params: { uid } }) {
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
    <div className="flex flex-col h-screen max-h-screen">
      <Header uid={uid} />
      <MessageCollection uid={uid} />
      <SendMessage uid={uid} />
    </div>
  );
}
