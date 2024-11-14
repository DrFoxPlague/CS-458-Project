//peter
import './css/App.css';
import { TestGame } from './components/TestGame';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',  // Your GraphQL server URL
    cache: new InMemoryCache(),
    credentials: 'include', // Allows cookies for auth if using sessions
});


const App = () => (
    <ApolloProvider client={client}>
        <TestGame />
    </ApolloProvider>
)

export default App;
