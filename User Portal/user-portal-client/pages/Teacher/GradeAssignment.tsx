import GradeAssignmentContainer from '@/components/Portal-Assignment/Sections/GradeAssignmentPage'
import { fetchSelectedSubmittedAssignmentAC } from '@/redux/assignment/actions';
import { selectSelectedSubmittedAssignment } from '@/redux/assignment/assignment.slice';
import { fetchUserAC } from '@/redux/general/actions';
import { selectUser } from '@/redux/general/general.slice';
import { httpGetSubmittedAssignment } from '@/service/assignment.submission.service';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PageNotFound from '../404';

function GradeAssignment() {
  const user = useSelector(selectUser);
  const submittedAssignment = useSelector(selectSelectedSubmittedAssignment);

  const [proceed, setProceed] = useState(false);
  const [loading, setLoading] = useState(true);

  const { query } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => { setLoading(false) }, 5000);

    if (user?._id && query?.id && typeof query.id === 'string' && query.id !== '') {
      setLoading(true);

      httpGetSubmittedAssignment(query.id)
        .then((response: any) => response.data)
        .then((response: any) => {
          if (response.success) {
            dispatch(fetchSelectedSubmittedAssignmentAC({ id: response.data._id }));
            setProceed(true);
            setLoading(false)
          } else {
            toast.error(response.message);
            setLoading(false);
            setProceed(false);
          }
        }).catch((error: any) => {
          toast.error(error.message);
          setLoading(false);
          setProceed(false);
        });
    } else if (query && user) {
      setProceed(false);
    }
  }, [user, query, dispatch]);


  useEffect(() => {
    if (submittedAssignment?.assignmentId && submittedAssignment.assignmentId._id && query.id && submittedAssignment._id === query.id) {
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
            <GradeAssignmentContainer />
            :
            <PageNotFound />
      }
    </>
  )
}

export default GradeAssignment