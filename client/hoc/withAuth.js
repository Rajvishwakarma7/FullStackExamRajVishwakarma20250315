import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const user = useSelector((state) => state.auth.user);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, [user]);

    if (!user) return null;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
