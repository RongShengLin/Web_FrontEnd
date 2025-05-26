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

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { BASE_URL } from "api/setting";
import { useNavigate } from "react-router-dom";

function ProfileInfoCard({ name, info, shadow }) {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    student_id: "",
    phone_number: "",
    trading_location: "",
    head_image: "",
  });
  const [uploadFile, setUploadFile] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setProfile((prev) => ({
      ...prev,
      name: name || "",
      email: info.email || "",
      student_id: info.studentID || "",
      phone_number: info.mobile || "",
      trading_location: info.tradingLocation || "",
      head_image: info.head_image || "",
    }));
  }, [name, info]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      setProfile((prev) => ({ ...prev, head_image: file.name }));
      setAvatarSrc(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("student_id", profile.student_id);
    formData.append("phone_number", profile.phone_number);
    formData.append("trading_location", profile.trading_location);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    if (uploadFile) {
      formData.append("head_image", uploadFile);
    }

    await fetch(`${BASE_URL}/api/user/`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    alert("Profile updated successfully");
    sessionStorage.setItem("username", profile.name);
    navigate("/profile");
  };

  return (
    <Card sx={{width:"100%", height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox display="flex" alignItems="center" pt={2} px={2} gap={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Name
        </MDTypography>
        <MDInput
          label="User Name"
          name="name"
          value={profile.name || ""}
          onChange={handleChange}
        />
      </MDBox>
      <MDBox display="flex" alignItems="center" pt={2} px={2} gap={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Profile Image
        </MDTypography>
        <MDInput type="file" accept="image/*" onChange={handleFileChange}/>
      </MDBox>
      {/* <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
      </MDBox> */}
      <MDBox p={2}>
        {/* <MDBox mb={2} lineHeight={1}>
          <MDInput
            label="Description"
            multiline
            rows={4}
            placeholder="Description"
            name="description"
            value={description || ""}
            fullWidth
            onChange={handleChange}
          />
        </MDBox> */}
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>
          <MDBox display="flex" py={1} pr={2} alignItems="center">
            <MDTypography key="student ID" variant="button" fontWeight="bold" textTransform="capitalize">
              student ID: &nbsp;
            </MDTypography>
            <MDInput 
              name="student_id"
              label={"student ID"} 
              placeholder={'student ID'} 
              value={profile.student_id || ""} 
              onChange={handleChange}
            />
          </MDBox>
          <MDBox display="flex" py={1} pr={2} alignItems="center">
            <MDTypography key="Mobile" variant="button" fontWeight="bold" textTransform="capitalize">
              Mobile: &nbsp;
            </MDTypography>
            <MDInput 
              name="phone_number"
              label={"Mobile"} 
              placeholder={'Mobile'} 
              value={profile.phone_number || ""} 
              onChange={handleChange}
            />
          </MDBox>
          <MDBox display="flex" py={1} pr={2} alignItems="center">
            <MDTypography key="email" variant="button" fontWeight="bold" textTransform="capitalize">
              Email: &nbsp;
            </MDTypography>
            <MDInput 
              name="email"
              label={"Email"} 
              placeholder={'Email'} 
              value={profile.email || ""} 
              onChange={handleChange}
            />
          </MDBox>
          <MDBox display="flex" py={1} pr={2} alignItems="center">
            <MDTypography key="email" variant="button" fontWeight="bold" textTransform="capitalize">
              trading location: &nbsp;
            </MDTypography>
            <MDInput 
              name="trading_location"
              label={"trading location"} 
              placeholder={'trading location: '} 
              value={profile.trading_location || ""} 
              onChange={handleChange}
            />
          </MDBox>
        </MDBox>
        
        <MDBox
            height="100px"
            position="relative"
        >
            <MDBox position="absolute" bottom={0} right={0} p={2}>
                <MDBox display="flex" gap={2}>
                    <MDButton color="success" onClick={handleSave}>Comfirm</MDButton>
                    <MDButton color="error">Cancel</MDButton>
                </MDBox>
            </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  name: PropTypes.string.isRequired,
  // title: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;
