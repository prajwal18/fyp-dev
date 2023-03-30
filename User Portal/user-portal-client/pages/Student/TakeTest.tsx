import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TakeTestContainer from '@/components/Portal-Test/Sections/TakeTest';
import PageNotFound from '../404';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { selectUser } from '@/redux/general/general.slice';
import { fetchUserAC } from '@/redux/general/actions';
import { selectSelectedAnswerPaper } from '@/redux/test/test.slice';
import { fetchSelectedAnswerPaperAC } from '@/redux/test/actions';
import { httpCheckTestAnswerExists, httpCreateTestAnswer } from '@/service/test.answer.service';


const TakeTest = () => {
    const user = useSelector(selectUser);
    const answerPaper = useSelector(selectSelectedAnswerPaper);

    const [proceed, setProceed] = useState(false);
    const [loading, setLoading] = useState(true);

    const { query } = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => { setLoading(false) }, 5000);

        if (user?._id && query?.id  && typeof query.id === 'string' && query.id !== '') {
            setLoading(true);

            httpCheckTestAnswerExists(query?.id?.toString() || '', user._id )
            .then((response: any) => response.data)
            .then((response: any) => {
                console.log('Check test: ',response)
                if(response.success){
                    dispatch(fetchSelectedAnswerPaperAC({ id: response.data }))
                } else {
                    const data = { 
                        testPaperId: query?.id?.toString() || '',
                        submittedBy: user._id
                    }
                    httpCreateTestAnswer(data)
                    .then((response:any) => response.data)
                    .then((response:any) => {
                        if(response.success){
                            dispatch(fetchSelectedAnswerPaperAC({id: response.data._id}));
                        }
                    }).catch((error: any) => {
                        toast.error(error.message);
                    })
                }

            }).catch((error:any) => {
                toast.error(error.message);
            })
        } else if (query && user) {
            setProceed(false);
        }
    }, [user, query, dispatch]);

    
    useEffect(() => {
        if (answerPaper?.testPaperId && answerPaper.testPaperId._id && query.id && answerPaper.testPaperId._id === query.id) {
            setLoading(false);
            setProceed(true);
        }
    }, [answerPaper, query]);

    useEffect(() => {
        dispatch(fetchUserAC());
    }, [])

    return (
        <>
            {
                loading ?
                    <p>Loading...</p>
                    :
                    proceed ?
                        <TakeTestContainer />
                        :
                        <PageNotFound />
            }
        </>
    )
}

export default TakeTest;