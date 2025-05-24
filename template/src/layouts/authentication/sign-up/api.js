import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Checkbox,
} from "@mui/material";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import { BASE_URL } from "api/setting";
const API_PREFIX = "/api/register/";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState("");
  const [studentId, setStudentId] = useState("");
  const fileInputRef = useRef(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!agree) {
      setMessage("請勾選同意條款");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("兩次密碼輸入不一致");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("passwd", password);

      const response = await fetch(`${BASE_URL}${API_PREFIX}`, {
        method: "POST",
        body: formData,
      });

      const text = await response.text();

      if (text === "OK") {
        // ✅ 註冊成功 → 上傳學生證
        const file = fileInputRef.current?.files[0];
        if (file && studentId) {
          const uploadForm = new FormData();
          uploadForm.append("file", file);
          uploadForm.append("student_id", studentId);
          await fetch(`${BASE_URL}/api/upload_certificate_file`, {
            method: "POST",
            body: uploadForm,
          });
        }
        setMessage("註冊成功，請前往登入");
      } else {
        setMessage(text);
      }
    } catch (error) {
      setMessage("發生錯誤，請稍後再試");
      console.error(error);
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="primary"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleRegister}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                variant="standard"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Confirm Password"
                variant="standard"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
            <MDInput
              type="text"
              label="Student ID"
              variant="standard"
              fullWidth
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            </MDBox>
            <MDBox mb={2}>
              <MDTypography variant="button">
                Upload Your Student ID card
              </MDTypography>
              <MDInput
                type="file"
                inputRef={fileInputRef}
                accept="image/*"
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            {message && (
              <MDBox mt={2}>
                <MDTypography color="error" variant="caption">
                  {message}
                </MDTypography>
              </MDBox>
            )}
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="primary" fullWidth>
                Sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </form>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Register;
