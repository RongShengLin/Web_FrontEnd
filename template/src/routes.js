/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import HomePage from "layouts/HomePage";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Item_Page from "layouts/item_page"
import Item_Page_ID from "layouts/item_page/api.js";
import Tradings from "layouts/tradings";
import Item_Edit from "layouts/item_edit";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "HomePage",
    key: "HomePage",
    icon: <Icon fontSize="small">gavel</Icon>,
    route: "/HomePage",
    component: <HomePage />,
  },
  {
    type: "collapse",
    name: "Following",
    key: "following",
    icon: <Icon fontSize="small">favorite</Icon>,
    route: "/following",
    component: <Tables />,
  },
  {
    type: "route",
    key: "billing",
    route: "/billing",
    component: <Billing />,
  },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "route",
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "route",
    key: "sign-up",
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Item_Page",
    key: "ItemPage",
    icon: <Icon fontSize="small">shopping_cart</Icon>,
    route: "/ItemPage",
    component: <Item_Page />,
  },
  {
    type: "collapse",
    name: "Tradings",
    key: "Tradings",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Tradings",
    component: <Tradings />,
  },
  {
    type: "route",
    key: "item-dynamic",
    route: "/item/:id",
    component: <Item_Page_ID />,
  },
  {type: "collapse",
    name: "Item_Edit",
    key: "Item_Edit",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/Item_Edit",
    component: <Item_Edit />,
  },
];

export default routes;
