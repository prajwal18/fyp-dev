import SubmitAssignmentContainer from '@/components/Portal-Assignment/Sections/SubmitAssignmentPage';
import { fetchSelectedSubmittedAssignmentAC } from '@/redux/assignment/actions';
import { selectSelectedSubmittedAssignment, updateSelectedSubmittedAssignment } from '@/redux/assignment/assignment.slice';
import { fetchUserAC } from '@/redux/general/actions';
import { selectUser } from '@/redux/general/general.slice';
import { httpCheckSubmittedAssignmentExists, httpCreateSubmittedAssignment } from '@/service/assignment.submission.service';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PageNotFound from '../404';

const delay = (time: number) => new Promise((resolve: any) => setTimeout(resolve, time));

const SubmitAssignment = () => {
  const user = useSelector(selectUser);
  const submittedAssignment = useSelector(selectSelectedSubmittedAssignment);

  const [proceed, setProceed] = useState(false);
  const [loading, setLoading] = useState(true);

  const { query } = useRouter();
  const dispatch = useDispatch();

  const checkFetchSA = useCallback(async () => {
    setTimeout(() => { setLoading(false) }, 5000);
    dispatch(updateSelectedSubmittedAssignment({}));

    if (user._id && query.id !== '' && typeof query.id === 'string') {
      console.log("\n\n\n", user, query, "\n\n\n");
      setLoading(true);
      httpCheckSubmittedAssignmentExists(query.id, user._id)
        .then((response: any) => response.data)
        .then(async (response: any) => {
          if (response.success) {
            dispatch(fetchSelectedSubmittedAssignmentAC({ id: response.data }))
          } else {
            const data = {
              assignmentId: query?.id?.toString() || '',
              submittedBy: user._id
            }
            await delay(1000);
            const response = await httpCreateSubmittedAssignment(data).then(response => response.data);
            await delay(1000);
            if (response.success) {
              dispatch(fetchSelectedSubmittedAssignmentAC({ id: response.data._id }));
            }
          }

        }).catch((error: any) => {
          toast.error(error.message);
        })
    } else if (query && user) {
      setProceed(false);
    }
  }, []);

  useEffect(() => {
    checkFetchSA()
  }, [checkFetchSA])


  useEffect(() => {
    if (submittedAssignment?.assignmentId && submittedAssignment.assignmentId._id && query.id && submittedAssignment.assignmentId._id === query.id) {
      setLoading(false);
      setProceed(true);
    }
  }, [submittedAssignment, query]);
  
  useEffect(() => {
    dispatch(fetchUserAC());
  }, [])

  return (
    <>
      {
        loading ?
          <p>Loading ...</p>
          :
          proceed ?
            <SubmitAssignmentContainer />
            :
            <PageNotFound />
      }
    </>
  )
}

export default SubmitAssignment;