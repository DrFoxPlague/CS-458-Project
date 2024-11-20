//peter
import './css/App.css';
import { TestGame } from './components/TestGame';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import { ErrorPage } from './pages/ErrorPage';
import { ExhibitLayout } from './exhibits/ExhibitLayout';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',  // Your GraphQL server URL
    cache: new InMemoryCache(),
    credentials: 'include', // Allows cookies for auth if using sessions
});


const App = () => (
    <ApolloProvider client={client}>
        <Router>
            <Routes>
                <Route path="*" element={<ErrorPage />}/>
                <Route path="/" element={<TestGame />}/>
                <Route path="/exhibit" element={<ExhibitLayout />}/>
            </Routes>
        </Router>
    </ApolloProvider>
)

export default App;
