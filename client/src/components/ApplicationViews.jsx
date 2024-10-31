import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { useState } from "react";
import { Home } from "./Home.jsx"
import { OrderLanding } from "./OrderCreate/OrderLanding.jsx";
import { OrderCreate } from "./OrderCreate/OrderCreate.jsx";
import { ContactUs } from "./Information/ContactUs.jsx";
import { OrderTracker } from "./OrderTracker/OrderTracker.jsx";
import { OrderTrackerHub } from "./OrderTracker/OrderTrackerHome.jsx";
import { Ingredient } from "./Ingredients/Ingredient.jsx";
import { ActiveOrders } from "./EmployeeViews/ActiveOrders.jsx";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {


  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} >
              <Home />
            </AuthorizedRoute>
          }
        />
         <Route path="order">
          <Route
            index
            element={<AuthorizedRoute loggedInUser={loggedInUser}><OrderLanding loggedInUser={loggedInUser} /></AuthorizedRoute>}
          />
          <Route 
            path="create"
            element={<AuthorizedRoute loggedInUser={loggedInUser}><OrderCreate loggedInUser={loggedInUser} /></AuthorizedRoute>}
          />
          <Route
            path="tracking/:id"
            element={<AuthorizedRoute loggedInUser={loggedInUser}><OrderTracker loggedInUser={loggedInUser} /></AuthorizedRoute>}
          />
          <Route 
            path="tracking"
            element={<AuthorizedRoute loggedInUser={loggedInUser}><OrderTrackerHub loggedInUser={loggedInUser} /></AuthorizedRoute>}
          />
        </Route>
        <Route path="ingredient">
          <Route 
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <Ingredient />
              </AuthorizedRoute>}
          />
        </Route>
        <Route path="activeOrders">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Employee"]}>
                <ActiveOrders />
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route path="information">
          <Route 
            index
            element={<AuthorizedRoute loggedInUser={loggedInUser}><ContactUs /></AuthorizedRoute>}
          />
        </Route>
        <Route path="information">
            <Route 
              index
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <ContactUs loggedInUser={loggedInUser}/>
                </AuthorizedRoute>
              }
            />
        </Route>
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
