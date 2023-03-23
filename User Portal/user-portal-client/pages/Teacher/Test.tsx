import TestPage from '@/components/Portal-Test/TestPage';
import { UserTypes } from '@/constants/Constants';
import React from 'react';

const Test = () => {
  return (
    <TestPage role={UserTypes.TEACHER} />
  )
}

export default Test;