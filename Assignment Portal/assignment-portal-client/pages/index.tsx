import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/Student/Submit");
  }, []);
  return (<></>);
}

export default Home;