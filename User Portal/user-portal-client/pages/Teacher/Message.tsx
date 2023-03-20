import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
const Message = () => {
  const {asPath, query} = useRouter();
  useEffect(() => {
    console.log('As Path', asPath);
    console.log('Query', query);
  }, [asPath, query])
  return (
    <div></div>
  )
}

export default Message;