import Layout from "./layouts/Layout";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";

function App() {
  const { isLoggedIn, loading } = useAppContext();

  if (loading) {
    return <div>Loading...</div>; 
  }
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <Layout>
            <p>Home Page</p>
          </Layout>
        } />
        <Route path='/search' element={
          <Layout>
            <Search />
          </Layout>
        } />
        <Route path='/detail/:hotelId' element={
          <Layout>
            <Details />
          </Layout>
        } />
        <Route path="/register" element={
          <Layout>
            <Register />
          </Layout>
        } />
        <Route path="/sign-in" element={
          <Layout>
            <SignIn />
          </Layout>
        } />
        {isLoggedIn && (
          <>
            <Route path="/hotel/:hotelId/booking" element={
            <Layout>
              <Booking />
            </Layout>
          } />
          <Route path="/add-hotel" element={
            <Layout>
              <AddHotel />
            </Layout>
          } />
          <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
           <Route path="/my-hotels" element={
            <Layout>
              <MyHotels />
            </Layout>
          } />
             <Route path="/my-bookings" element={
            <Layout>
              <MyBookings />
            </Layout>
          } />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;