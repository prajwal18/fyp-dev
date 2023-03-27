import React, { useEffect, useState } from 'react';
import GradedTestContainer from '@/components/Portal-Test/Sections/GradedTest';
import PageNotFound from '../404';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/redux/general/general.slice';
import { selectSelectedAnswerPaper } from '@/redux/test/test.slice';
import { useRouter } from 'next/router';
import { httpGetTestAnswer } from '@/service/test.answer.service';
import { fetchSelectedAnswerPaperAC } from '@/redux/test/actions';
import { toast } from 'react-toastify';
import { fetchUserAC } from '@/redux/general/actions';

const GradedTest = () => {
  const user = useSelector(selectUser);
  const selectedAnswerPaper = useSelector(selectSelectedAnswerPaper);

  const [proceed, setProceed] = useState(false);
  const [loading, setLoading] = useState(true);

  const { query } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => { setLoading(false) }, 5000);

    if (user?._id && query?.id && typeof query.id === 'string' && query.id !== '') {
      setLoading(true);

      httpGetTestAnswer(query.id)
        .then((response: any) => response.data)
        .then((response: any) => {
          if (response.success && response.data?.isGraded) {
            dispatch(fetchSelectedAnswerPaperAC({ id: response.data._id }));
            setProceed(true);
            setLoading(false);
          } 
          else if(!response?.data?.isGraded){
            toast.error('Sorry, the Test paper has not been graded yet.');
            setLoading(false);
            setProceed(false);
          }
          else {
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
    if (selectedAnswerPaper?.testPaperId && selectedAnswerPaper.testPaperId._id && query.id && selectedAnswerPaper.testPaperId._id === query.id) {
      setLoading(false);
      setProceed(true);
    }
  }, [selectedAnswerPaper, query]);

  useEffect(() => {
    dispatch(fetchUserAC());
  }, [])
  return (
    <>
      {
        loading ?
          <>Loading ...</>
          :
          proceed ?
            <GradedTestContainer />
            :
            <PageNotFound />
      }
    </>
  )
}

export default GradedTest;