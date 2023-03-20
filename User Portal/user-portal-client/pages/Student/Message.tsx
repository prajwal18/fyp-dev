import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
const Message = () => {
  const {asPath} = useRouter();
  useEffect(() => {
    console.log('As Path', asPath)
  }, [asPath])
  return (
    <div></div>
  )
}

export default Message;