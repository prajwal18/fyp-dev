import { useEffect, useState } from "react";
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ToastContainer } from "react-toastify";
import { Provider, useDispatch } from "react-redux";

import '@/styles/globals.css';
import '@/styles/LoginLayout.css';
import "react-toastify/dist/ReactToastify.css";                     // CSS For React Toastify

import Layout from '@/components/Layout/DashLayout/Layout';
import { manageSessionRouting } from "@/utils/sessionFuncs";

import store from "@/redux/store";


export default function App({ Component, pageProps }: AppProps) {
  const [includeLayout, setIncludeLayout] = useState<boolean>(false);

  const { asPath, push } = useRouter();

  useEffect(() => {
    manageSessionRouting(asPath, push, setIncludeLayout);
  }, [asPath]);

  return (
    <Provider store={store}>
      <div>
        {
          includeLayout ?
            <>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </>
            :
            <>
              <Component {...pageProps} />
            </>
        }
        <ToastContainer />
      </div>
    </Provider>
  )
}
