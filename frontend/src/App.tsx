import Layout from "./layouts/Layout";
import { Route, Routes } from 'react-router-dom';
import './index.css';

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
      
    </Routes>
  );
}

export default App;