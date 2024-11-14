//peter
import './css/App.css';
import { TestGame } from './components/TestGame';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',  // Your GraphQL server URL
    cache: new InMemoryCache(),
    credentials: 'include', // Allows cookies for auth if using sessions
});


const App = () => (
    <ApolloProvider client={client}>
        <Router>
            <Routes>
                <Route path="/" element={<TestGame />}/>
            </Routes>
        </Router>
    </ApolloProvider>
)

export default App;
