import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const _app = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};
_app.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  try {
    const client = buildClient(ctx);
    const { data } = await client.get("/api/users/currentUser");
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps, ...data };
  } catch (error) {
    return { ...pageProps, currentUser: null };
  }
};
export default _app;
