import React from "react";
import { Switch, Route } from "react-router-dom";

import Auth from "./hoc/auth";

import Layout from "./hoc/layout";
import Home from "./components/Home";
import RegisterLogin from "./components/Register_login";
import Register from "./components/Register_login/register";
import UserDashboard from "./components/User";
import Shop from "./components/Shop";
import ProductPage from "./components/Product";

import AddProduct from "./components/User/Admin/add_product";
import ManageCategories from "./components/User/Admin/manage_categories";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path="/admin/add_product"
          exact
          component={Auth(AddProduct, true)}
        />
        <Route
          path="/admin/manage_categories"
          exact
          component={Auth(ManageCategories, true)}
        />
        <Route
          path="/user/dashboard"
          exact
          component={Auth(UserDashboard, true)}
        />

        <Route
          path="/register_login"
          exact
          component={Auth(RegisterLogin, false)}
        />
        <Route path="/register" exact component={Auth(Register, false)} />

        
        <Route
          path="/product-details/:id"
          exact
          component={Auth(ProductPage, null)}
        />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
