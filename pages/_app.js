import "@/styles/globals.css";
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloClient'; // Importar cliente Apollo

function proveedores_app({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default proveedores_app;

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }
