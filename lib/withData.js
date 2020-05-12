import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { devEndpoint, prodEndpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/Cart';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? devEndpoint : devEndpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            //read cartopen value from cache
             const { cartOpen } = cache.readQuery({
               query: LOCAL_STATE_QUERY,
             });
             //Write the cart State to the opposite
             const data = {
               data: {
                 cartOpen: ! cartOpen
               }
             };
             cache.writeData(data);
             return data; 
          }
        }
      },
      defaults: {
        cartOpen: false,
      }
    }
  });
}

export default withApollo(createClient);
