import TestPage from '@/components/Portal-Test/TestPage';
import { UserTypes } from '@/constants/Constants';
import React from 'react';

const Test = () => {
  return (
    <TestPage role={UserTypes.STUDENT} />
  )
}

export default Test;