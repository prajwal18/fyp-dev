import { useEffect, useState } from "react";
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ToastContainer } from "react-toastify";
import { Provider, useDispatch, useSelector } from "react-redux";

import '@/styles/globals.css';
import '@/styles/LoginLayout.css';
import "react-toastify/dist/ReactToastify.css";                     // CSS For React Toastify

import Layout from '@/components/Layout/DashLayout/Layout';
import { manageSessionRouting } from "@/utils/sessionFuncs";

import store from "@/redux/store";
import { selectIncludeSidebar, updateIncludeSidebar } from "@/redux/general/general.slice";


function MainComponent({ children }: { children: any }) {
  const includeSidebar = useSelector(selectIncludeSidebar);
  const dispatch = useDispatch();

  const { asPath, push } = useRouter();

  useEffect(() => {
    manageSessionRouting(asPath, push, (value: boolean) => { dispatch(updateIncludeSidebar(value)) });
  }, [asPath]);

  return (
    <div>
      {
        includeSidebar ?
          <>
            <Layout>
              {children}
            </Layout>
          </>
          :
          <>
            {children}
          </>
      }
      <ToastContainer />
    </div>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MainComponent>
        <Component {...pageProps} />
      </MainComponent>
    </Provider>
  )
}