import React, { useEffect, useState } from 'react';
import CreateTestContainer from '@/components/Portal-Test/Sections/CreatTest';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSelectedTestPaperAC } from '@/redux/test/actions';
import PageNotFound from '../404';
import { selectSelectedTest } from '@/redux/test/test.slice';


const CreateTest = () => {
    const [proceed, setProceed] = useState(false);
    const [loading, setLoading] = useState(true);

    const seletedTest = useSelector(selectSelectedTest);
    const { query } = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => { setLoading(false) }, 5000);
        if (query?.id && query.id !== '' && typeof query.id === 'string') {
            setLoading(true);
            dispatch(fetchSelectedTestPaperAC({ id: query.id }));
        } else if (query) {
            setProceed(false);
        }
    }, [query, dispatch]);

    useEffect(() => {
        if (seletedTest && seletedTest._id && query.id && seletedTest._id === query.id) {
            setLoading(false);
            setProceed(true);
        }
    }, [seletedTest, query]);


    return (
        <>
            {
                loading ?
                    <p>Loading...</p>
                    :
                    proceed ?
                        <CreateTestContainer />
                        :
                        <PageNotFound />
            }
        </>
    );
}

export default CreateTest;