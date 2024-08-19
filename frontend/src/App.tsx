import Layout from "./layouts/Layout";
import { Route, Routes } from 'react-router-dom';
import './index.css';
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

function App() {
  return (
    
    <Routes>
      <Route path='/' element={
        <Layout>
        <p>Home Page</p>
      </Layout>} />
      <Route path='/search' element={
        <Layout>
        <p>Search Page</p>
      </Layout>} />
      
      <Route path="/register" element ={ < Register />} />
      <Route path="/sign-in" element ={ < SignIn />} />

    </Routes>
  );
}

export default App;