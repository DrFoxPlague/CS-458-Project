//peter
import "./css/App.css";
import { TestGame } from "./pages/TestGame";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import createHttpLink from "apollo-upload-client/createUploadLink.mjs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorPage } from "./pages/ErrorPage";
import { ExhibitLayout } from "./exhibits/ExhibitLayout";
import { LoginPage, FollowUpPage } from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { HomePage } from "./home/HomePage";

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    // Return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const link = ApolloLink.from([authLink, httpLink]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    credentials: "include", // Allows cookies for auth if using sessions
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Toaster
                position="bottom-center"
                toastOptions={{
                    // Define default options
                    className: "",
                    duration: 5000,
                    style: {
                        background: "#363636",
                        color: "#fff",
                    },
                }}
            />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />           
                    <Route path="/test" element={<TestGame />} />
                    <Route path="/exhibit" element={<ExhibitLayout />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<FollowUpPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </ApolloProvider>
    );
};

export default App;
