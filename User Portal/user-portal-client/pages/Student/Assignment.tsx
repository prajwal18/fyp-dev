import AssignmentPage from '@/components/Portal-Assignment/AssignmentPage';
import { UserTypes } from '@/constants/Constants';
import React from 'react';

const Assignment = () => {
  return (
    <AssignmentPage role={UserTypes.STUDENT}/>
  )
}

export default Assignment;