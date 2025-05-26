/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// @mui material components
import Icon from "@mui/material/Icon";
import CardMedia from "@mui/material/CardMedia";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team2 from "assets/images/team-2.jpg";
import homeDecor1 from "assets/images/home-decor-1.jpg";
import { Description } from "@mui/icons-material";
import MDButton from "components/MDButton";
import { BASE_URL } from "api/setting";

export default function data({ transactions = [], currentUsername, onUpdate }) {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">{name}</MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Product = ({ image, name }) => (
    <MDBox display="flex" alignItems="center">
      <CardMedia
        src={image}
        component="img"
        title={name}
        sx={{
          maxWidth: "200px", width: "200px",
          boxShadow: ({ boxShadows: { md } }) => md,
          objectFit: "cover", objectPosition: "center"
        }}
      />
    </MDBox>
  );

  const rows = transactions
    .filter(
      (t) =>
        t.transactionrecord_stat === "Pending" &&
        t.seller_name === currentUsername
    )
    .map((t) => {
    const isSeller = t.seller_name === currentUsername;
    const isBuyer = t.buyer_name === currentUsername;

    return {
      Product: <Product image={`${BASE_URL}${t.product_image}`} name={t.product_name} />,
      Name: <MDTypography variant="h5" color="text" fontWeight="medium">{t.product_name}</MDTypography>,
      Price: <MDTypography variant="h5" color="error" fontWeight="medium">${t.price}</MDTypography>,
      // number: <MDTypography variant="h5" color="text" fontWeight="medium">{t.quantity || 1}</MDTypography>,
      Time_Location: (
        <MDBox lineHeight={1} textAlign="center">
          <MDTypography variant="button" fontWeight="medium" display="block">
            {t.trading_location}
          </MDTypography> 
          <MDTypography variant="caption" display="block">
            {new Date(t.trading_time).toLocaleString()}
          </MDTypography>
        </MDBox>
      ),
      Trader: (
        <Author
          image={isSeller ? `${BASE_URL}${t.buyer_head_image}`:`${BASE_URL}${t.seller_head_image}`}
          name={isSeller ? t.buyer_name : t.seller_name}
          email={isSeller ? t.buyer_name : t.seller_name}
        />
      ),
      Confirm: isSeller ? (
        t.seller_confim ? (
          <MDTypography variant="h6" color="success" fontWeight="medium">
            <Icon>check_circle</Icon> 已確認
          </MDTypography>
        ) : (
          <MDButton
            variant="contained"
            color="primary"
            onClick={() => handleConfirm(t.trans_id, "seller")}
          >
            <MDTypography variant="h6" fontWeight="medium" color="white">
              點擊確認
            </MDTypography>
          </MDButton>
        )
      ) : (
        <MDTypography variant="h6" fontWeight="medium" color={t.seller_confim ? "success" : "warning"}>
          <Icon>{t.seller_confim ? "check_circle" : "schedule"}</Icon> 
          {t.seller_confim ? "已確認" : "等待賣家確認"}
        </MDTypography>
      ),

      // Buyer: isBuyer ? (
      //   t.buyer_confim ? (
      //     <MDTypography variant="h6" color="success" fontWeight="medium">
      //       <Icon>check_circle</Icon> 已確認
      //     </MDTypography>
      //   ) : (
      //     <MDButton
      //       variant="contained"
      //       color="info"
      //       onClick={() => handleConfirm(t.trans_id, "buyer")}
      //     >
      //       <MDTypography variant="h6" fontWeight="medium" color="white">
      //         點擊確認
      //       </MDTypography>
      //     </MDButton>
      //   )
      // ) : (
      //   <MDTypography variant="h6" fontWeight="medium" color={t.buyer_confim ? "success" : "warning"}>
      //     <Icon>{t.buyer_confim ? "check_circle" : "schedule"}</Icon>
      //     {t.buyer_confim ? "已確認" : "等待買家確認"}
      //   </MDTypography>
      // ),
    };
  });

  const handleConfirm = async (trans_id, step) => {
    try {
      const res = await fetch(`${BASE_URL}/api/auctions/update_transaction/${trans_id}/`, {
        method: "POST",
        credentials: "include",
      });
      const msg = await res.text();
      alert(msg);
      onUpdate();
    } catch (err) {
      console.error("更新狀態失敗", err);
      alert("操作失敗");
    }
  };

  return {
    columns: [
      { Header: "Product", accessor: "Product", align: "left" },
      { Header: "Name", accessor: "Name", align: "left" },
      { Header: "Price", accessor: "Price", align: "center" },
      // { Header: "Number", accessor: "number", align: "center" },
      { Header: "Time and Location", accessor: "Time_Location", align: "center" },
      { Header: "Trader", accessor: "Trader", align: "center" },
      { Header: "Confirm", accessor: "Confirm", align: "center" },
      // { Header: "Buyer", accessor: "Buyer", align: "center" }, 
    ],
    rows,
  };

  return {
    columns: [
      { Header: "Product", accessor: "Product", width: "30%", align: "left" },
      { Header: "Name", accessor: "Name", align: "left" },
      { Header: "Price", accessor: "Price", align: "center" },
      { Header: "Number", accessor: "number", align: "center" },
      { Header: "Time and Location", accessor: "Time_Location", align: "center" },
      { Header: "Trader", accessor: "Trader", align: "center" },
      { Header: "Send", accessor: "Send", align: "center" },
      { Header: "Receive Product", accessor: "Receive", align: "center" },
    ],

    rows: [
      {
        Product: <Product image={homeDecor1} name="Asana" />,
        Name: (
          <MDTypography variant="h5" color="text" fontWeight="medium">
            Item Name
          </MDTypography>
        ),
        Price: (
          <MDTypography variant="h5" color="error" fontWeight="medium">
            $10000
          </MDTypography>
        ),
        number: (
          <MDTypography variant="h5" color="text" fontWeight="medium">
            10
          </MDTypography>
        ),
        Time_Location: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                Front Gate
              </MDTypography>
              <MDTypography variant="caption">5/28 12:00</MDTypography>
            </MDBox>
          </MDBox>
        ),
        Trader: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Send: (
          <MDTypography variant="h5" color="success" fontWeight="medium">
            <Icon>done</Icon>
            Send
          </MDTypography>
        ),
        Receive: (
          <MDButton variant="contained" color="primary" size="small">
            <MDTypography variant="h6" fontWeight="medium" color="white"> 
              Comfirm
            </MDTypography>
          </MDButton>
        ),
      },
      {
        Product: <Product image={homeDecor1} name="Asana" />,
        Name: (
          <MDTypography variant="h5" color="text" fontWeight="medium">
            Item Name
          </MDTypography>
        ),
        Price: (
          <MDTypography variant="h5" color="error" fontWeight="medium">
            $10000
          </MDTypography>
        ),
        number: (
          <MDTypography variant="h5" color="text" fontWeight="medium">
            10
          </MDTypography>
        ),
        Time_Location: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                Front Gate
              </MDTypography>
              <MDTypography variant="caption">5/28 12:00</MDTypography>
            </MDBox>
          </MDBox>
        ),
        Trader: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Send: (
          <MDTypography variant="h5" color="success" fontWeight="medium">
            <Icon>done</Icon>
            Send
          </MDTypography>
        ),
        Receive: (
          <MDButton variant="contained" color="primary" size="small">
            <MDTypography variant="h6" fontWeight="medium" color="white"> 
              Comfirm
            </MDTypography>
          </MDButton>
        ),
      },
      {
        Product: <Product image={homeDecor1} name="Asana" />,
        Name: (
          <MDTypography variant="h5" color="text" fontWeight="medium">
            Item Name
          </MDTypography>
        ),
        Price: (
          <MDTypography variant="h5" color="error" fontWeight="medium">
            $10000
          </MDTypography>
        ),
        number: (
          <MDTypography variant="h5" color="text" fontWeight="medium">
            10
          </MDTypography>
        ),
        Time_Location: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                Front Gate
              </MDTypography>
              <MDTypography variant="caption">5/28 12:00</MDTypography>
            </MDBox>
          </MDBox>
        ),
        Trader: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Send: (
          <MDButton variant="contained" color="primary" size="small">
            <MDTypography variant="h6" fontWeight="medium" color="white"> 
              Comfirm
            </MDTypography>
          </MDButton>
        ),
        Receive: (
          <MDTypography variant="h5" color="success" fontWeight="medium">
            <Icon>done</Icon>
            Recieved
          </MDTypography>
        ),
      },
      {
        Product: <Product image={homeDecor1} name="Asana" />,
        Name: (
          <MDTypography variant="h5" color="text" fontWeight="medium">
            Item Name
          </MDTypography>
        ),
        Price: (
          <MDTypography variant="h5" color="error" fontWeight="medium">
            $10000
          </MDTypography>
        ),
        number: (
          <MDTypography variant="h5" color="text" fontWeight="medium">
            10
          </MDTypography>
        ),
        Time_Location: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                Front Gate
              </MDTypography>
              <MDTypography variant="caption">5/28 12:00</MDTypography>
            </MDBox>
          </MDBox>
        ),
        Trader: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Send: (
          <MDButton variant="contained" color="primary" size="small">
            <MDTypography variant="h6" fontWeight="medium" color="white"> 
              Comfirm
            </MDTypography>
          </MDButton>
        ),
        Receive: (
          <MDTypography variant="h5" color="warning" fontWeight="medium">
            <Icon>schedule</Icon>
            Waiting
          </MDTypography>
        ),
      },
      {
        Product: <Product image={homeDecor1} name="Asana" />,
        Name: (
          <MDTypography variant="h5" color="text" fontWeight="medium">
            Item Name
          </MDTypography>
        ),
        Price: (
          <MDTypography variant="h5" color="error" fontWeight="medium">
            $10000
          </MDTypography>
        ),
        number: (
          <MDTypography variant="h5" color="text" fontWeight="medium">
            10
          </MDTypography>
        ),
        Time_Location: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                Front Gate
              </MDTypography>
              <MDTypography variant="caption">5/28 12:00</MDTypography>
            </MDBox>
          </MDBox>
        ),
        Trader: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Send: (
          <MDTypography variant="h5" color="warning" fontWeight="medium">
            <Icon>schedule</Icon>
            Waiting
          </MDTypography>
        ),
        Receive: (
          <MDButton variant="contained" color="primary" size="small">
            <MDTypography variant="h6" fontWeight="medium" color="white"> 
              Comfirm
            </MDTypography>
          </MDButton>
        ),
      },
    ],
  };
}

// /* eslint-disable react/prop-types */
// /* eslint-disable react/function-component-definition */
// /**
// =========================================================
// * Material Dashboard 2 React - v2.2.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/material-dashboard-react
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// // @mui material components
// import Icon from "@mui/material/Icon";
// import CardMedia from "@mui/material/CardMedia";
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// import MDProgress from "components/MDProgress";

// // Images
// import LogoAsana from "assets/images/small-logos/logo-asana.svg";
// import logoGithub from "assets/images/small-logos/github.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";
// import team2 from "assets/images/team-2.jpg";
// import homeDecor1 from "assets/images/home-decor-1.jpg";
// import { Description } from "@mui/icons-material";
// import MDButton from "components/MDButton";

// export default function data() {
//   const Author = ({ image, name, email }) => (
//       <MDBox display="flex" alignItems="center" lineHeight={1}>
//         <MDAvatar src={image} name={name} size="sm" />
//         <MDBox ml={2} lineHeight={1}>
//           <MDTypography display="block" variant="button" fontWeight="medium">
//             {name}
//           </MDTypography>
//           <MDTypography variant="caption">{email}</MDTypography>
//         </MDBox>
//       </MDBox>
//   );
//   const Product = ({ image, name }) => (
//     <MDBox display="flex" alignItems="center">
//       <CardMedia
//         src={image}
//         component="img"
//         title={name}
//         sx={{
//           maxWidth: "200px",
//           width: "200px",
//           margin: 0,
//           boxShadow: ({ boxShadows: { md } }) => md,
//           objectFit: "cover",
//           objectPosition: "center",
//         }}
//       />
//     </MDBox>
//   );

//   const Progress = ({ color, value }) => (
//     <MDBox display="flex" alignItems="center">
//       <MDTypography variant="caption" color="text" fontWeight="medium">
//         {value}%
//       </MDTypography>
//       <MDBox ml={0.5} width="9rem">
//         <MDProgress variant="gradient" color={color} value={value} />
//       </MDBox>
//     </MDBox>
//   );

//   return {
//     columns: [
//       { Header: "Product", accessor: "Product", width: "30%", align: "left" },
//       { Header: "Name", accessor: "Name", align: "left" },
//       { Header: "Price", accessor: "Price", align: "center" },
//       { Header: "Number", accessor: "number", align: "center" },
//       { Header: "Time and Location", accessor: "Time_Location", align: "center" },
//       { Header: "Trader", accessor: "Trader", align: "center" },
//       { Header: "Comfirm", accessor: "Await", align: "center" },
//     ],

//     rows: [
//       {
//         Product: <Product image={homeDecor1} name="Asana" />,
//         Name: (
//           <MDTypography variant="h5" color="text" fontWeight="medium">
//             Item Name
//           </MDTypography>
//         ),
//         Price: (
//           <MDTypography variant="h5" color="error" fontWeight="medium">
//             $10000
//           </MDTypography>
//         ),
//         number: (
//             <MDTypography variant="h5" color="text" fontWeight="medium">
//             10
//             </MDTypography>
//         ),
//         Time_Location: (
//           <MDBox display="flex" alignItems="center" lineHeight={1}>
//             <MDBox ml={2} lineHeight={1}>
//               <MDTypography display="block" variant="button" fontWeight="medium">
//                 Front Gate
//               </MDTypography>
//               <MDTypography variant="caption">5/28 12:00</MDTypography>
//             </MDBox>
//           </MDBox>
//         ),
//         Trader: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
//         Await: (
//           <MDTypography variant="h6" color="warning" fontWeight="medium">
//             Awaiting Trader Comfirm
//           </MDTypography>
//         ),
//       },
//       {
//         Product: <Product image={homeDecor1} name="Asana" />,
//         Name: (
//           <MDTypography variant="h5" color="text" fontWeight="medium">
//             Item Name
//           </MDTypography>
//         ),
//         Price: (
//           <MDTypography variant="h5" color="error" fontWeight="medium">
//             $10000
//           </MDTypography>
//         ),
//         number: (
//             <MDTypography variant="h5" color="text" fontWeight="medium">
//             10
//             </MDTypography>
//         ),
//         Time_Location: (
//           <MDBox display="flex" alignItems="center" lineHeight={1}>
//             <MDBox ml={2} lineHeight={1}>
//               <MDTypography display="block" variant="button" fontWeight="medium">
//                 Front Gate
//               </MDTypography>
//               <MDTypography variant="caption">5/28 12:00</MDTypography>
//             </MDBox>
//           </MDBox>
//         ),
//         Trader: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
//         Await: (
//           <MDTypography variant="h6" color="warning" fontWeight="medium">
//             Awaiting Trader Comfirm
//           </MDTypography>
//         ),
//       },
//       {
//         Product: <Product image={homeDecor1} name="Asana" />,
//         Name: (
//           <MDTypography variant="h5" color="text" fontWeight="medium">
//             Item Name
//           </MDTypography>
//         ),
//         Price: (
//           <MDTypography variant="h5" color="error" fontWeight="medium">
//             $10000
//           </MDTypography>
//         ),
//         number: (
//             <MDTypography variant="h5" color="text" fontWeight="medium">
//             10
//             </MDTypography>
//         ),
//         Time_Location: (
//           <MDBox display="flex" alignItems="center" lineHeight={1}>
//             <MDBox ml={2} lineHeight={1}>
//               <MDTypography display="block" variant="button" fontWeight="medium">
//                 Front Gate
//               </MDTypography>
//               <MDTypography variant="caption">5/28 12:00</MDTypography>
//             </MDBox>
//           </MDBox>
//         ),
//         Trader: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
//         Await: (
//           <MDTypography variant="h6" color="warning" fontWeight="medium">
//             Awaiting Trader Comfirm
//           </MDTypography>
//         ),
//       },
//     ],
//   };
// }

// /* eslint-disable react/prop-types */
// /* eslint-disable react/function-component-definition */
// /**
// =========================================================
// * Material Dashboard 2 React - v2.2.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/material-dashboard-react
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// // @mui material components
// import Icon from "@mui/material/Icon";
// import CardMedia from "@mui/material/CardMedia";
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// import MDProgress from "components/MDProgress";

// // Images
// import LogoAsana from "assets/images/small-logos/logo-asana.svg";
// import logoGithub from "assets/images/small-logos/github.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";
// import zombie from "assets/images/zombie.png";
// import homeDecor1 from "assets/images/home-decor-1.jpg";
// import { Description } from "@mui/icons-material";
// import MDButton from "components/MDButton";

// export default function data() {
//   const Author = ({ image, name, email }) => (
//       <MDBox display="flex" alignItems="center" lineHeight={1}>
//         <MDAvatar src={image} name={name} size="sm" />
//         <MDBox ml={2} lineHeight={1}>
//           <MDTypography display="block" variant="button" fontWeight="medium">
//             {name}
//           </MDTypography>
//           <MDTypography variant="caption">{email}</MDTypography>
//         </MDBox>
//       </MDBox>
//   );
//   const Product = ({ image, name }) => (
//     <MDBox display="flex" alignItems="center">
//       <CardMedia
//         src={image}
//         component="img"
//         title={name}
//         sx={{
//           maxWidth: "200px",
//           width: "200px",
//           margin: 0,
//           boxShadow: ({ boxShadows: { md } }) => md,
//           objectFit: "cover",
//           objectPosition: "center",
//         }}
//       />
//     </MDBox>
//   );

//   const Progress = ({ color, value }) => (
//     <MDBox display="flex" alignItems="center">
//       <MDTypography variant="caption" color="text" fontWeight="medium">
//         {value}%
//       </MDTypography>
//       <MDBox ml={0.5} width="9rem">
//         <MDProgress variant="gradient" color={color} value={value} />
//       </MDBox>
//     </MDBox>
//   );

//   return {
//     columns: [
//       { Header: "Product", accessor: "Product", width: "30%", align: "left" },
//       { Header: "Name", accessor: "Name", align: "left" },
//       { Header: "Price", accessor: "Price", align: "center" },
//       { Header: "Number", accessor: "number", align: "center" },
//       { Header: "Time and Location", accessor: "Time_Location", align: "center" },
//       { Header: "Buyer", accessor: "Buyer", align: "center" },
//       { Header: "Comfirm", accessor: "Comfirm", align: "center" },
//     ],

//     rows: [
//       {
//         Product: <Product image={homeDecor1} name="Asana" />,
//         Name: (
//           <MDTypography variant="h5" color="text" fontWeight="medium">
//             Item Name
//           </MDTypography>
//         ),
//         Price: (
//           <MDTypography variant="h5" color="error" fontWeight="medium">
//             $10000
//           </MDTypography>
//         ),
//         number: (
//           <MDTypography variant="h5" color="text" fontWeight="medium">
//           10
//           </MDTypography>
//         ),
//         Time_Location: (
//           <MDBox display="flex" alignItems="center" lineHeight={1}>
//             <MDBox ml={2} lineHeight={1}>
//               <MDTypography display="block" variant="button" fontWeight="medium">
//                 Front Gate
//               </MDTypography>
//               <MDTypography variant="caption">5/28 12:00</MDTypography>
//             </MDBox>
//           </MDBox>
//         ),
//         Buyer: <Author image={zombie} name="DaiKai" email="DaiKai@ntu.edu.tw" />,
//         Comfirm: (
//           <MDButton variant="contained" color="primary" size="small">
//             <MDTypography variant="h6" fontWeight="medium" color="white"> 
//               Comfirm Trading
//             </MDTypography>
//           </MDButton>
//         ),
//       },
//             {
//         Product: <Product image={homeDecor1} name="Asana" />,
//         Name: (
//           <MDTypography variant="h5" color="text" fontWeight="medium">
//             Item Name
//           </MDTypography>
//         ),
//         Price: (
//           <MDTypography variant="h5" color="error" fontWeight="medium">
//             $10000
//           </MDTypography>
//         ),
//         number: (
//           <MDTypography variant="h5" color="text" fontWeight="medium">
//           10
//           </MDTypography>
//         ),
//         Time_Location: (
//           <MDBox display="flex" alignItems="center" lineHeight={1}>
//             <MDBox ml={2} lineHeight={1}>
//               <MDTypography display="block" variant="button" fontWeight="medium">
//                 Front Gate
//               </MDTypography>
//               <MDTypography variant="caption">5/28 12:00</MDTypography>
//             </MDBox>
//           </MDBox>
//         ),
//         Buyer: <Author image={zombie} name="DaiKai" email="DaiKai@ntu.edu.tw" />,
//         Comfirm: (
//           <MDButton variant="contained" color="primary" size="small">
//             <MDTypography variant="h6" fontWeight="medium" color="white"> 
//               Comfirm Trading
//             </MDTypography>
//           </MDButton>
//         ),
//       },
//             {
//         Product: <Product image={homeDecor1} name="Asana" />,
//         Name: (
//           <MDTypography variant="h5" color="text" fontWeight="medium">
//             Item Name
//           </MDTypography>
//         ),
//         Price: (
//           <MDTypography variant="h5" color="error" fontWeight="medium">
//             $10000
//           </MDTypography>
//         ),
//         number: (
//           <MDTypography variant="h5" color="text" fontWeight="medium">
//           10
//           </MDTypography>
//         ),
//         Time_Location: (
//           <MDBox display="flex" alignItems="center" lineHeight={1}>
//             <MDBox ml={2} lineHeight={1}>
//               <MDTypography display="block" variant="button" fontWeight="medium">
//                 Front Gate
//               </MDTypography>
//               <MDTypography variant="caption">5/28 12:00</MDTypography>
//             </MDBox>
//           </MDBox>
//         ),
//         Buyer: <Author image={zombie} name="DaiKai" email="DaiKai@ntu.edu.tw" />,
//         Comfirm: (
//           <MDButton variant="contained" color="primary" size="small">
//             <MDTypography variant="h6" fontWeight="medium" color="white"> 
//               Comfirm Trading
//             </MDTypography>
//           </MDButton>
//         ),
//       },
//             {
//         Product: <Product image={homeDecor1} name="Asana" />,
//         Name: (
//           <MDTypography variant="h5" color="text" fontWeight="medium">
//             Item Name
//           </MDTypography>
//         ),
//         Price: (
//           <MDTypography variant="h5" color="error" fontWeight="medium">
//             $10000
//           </MDTypography>
//         ),
//         number: (
//           <MDTypography variant="h5" color="text" fontWeight="medium">
//           10
//           </MDTypography>
//         ),
//         Time_Location: (
//           <MDBox display="flex" alignItems="center" lineHeight={1}>
//             <MDBox ml={2} lineHeight={1}>
//               <MDTypography display="block" variant="button" fontWeight="medium">
//                 Front Gate
//               </MDTypography>
//               <MDTypography variant="caption">5/28 12:00</MDTypography>
//             </MDBox>
//           </MDBox>
//         ),
//         Buyer: <Author image={zombie} name="DaiKai" email="DaiKai@ntu.edu.tw" />,
//         Comfirm: (
//           <MDButton variant="contained" color="primary" size="small">
//             <MDTypography variant="h6" fontWeight="medium" color="white"> 
//               Comfirm Trading
//             </MDTypography>
//           </MDButton>
//         ),
//       },
//     ],
//   };
// }
