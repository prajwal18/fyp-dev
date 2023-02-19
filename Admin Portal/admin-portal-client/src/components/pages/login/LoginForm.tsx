import styled from '@emotion/styled';
import { Box, Stack, Button, Paper, Typography } from '@mui/material';
// MUI Icons
import MenuBookIcon from '@mui/icons-material/MenuBook';
// MUI Icons
import { GenerateCustTextField } from '../../common/form/CustTextFieldNErrorMsg';
import PasswordTextField from '../../common/form/PasswordTextField';

const LoginContainer = styled(Box)`
    height: 100%;
    width:100%;
    min-height: 100vh; margin: 0px;
    position: relative;
    background: linear-gradient(to right, #614385, #516395);
    display:flex;
    align-items:center;
    justify-content:center
`;
const LoginCard = styled(Paper)`
    background:white;
    width:35%;
    height:30%;
    color:black;
    padding:50px;
`
const CustBtn = styled(Button)`
  background: #614385;
  color: white;
  font-weight: 700;
  &:hover {
    background: #957fb0
  }
`;

const LoginForm = ({ formik }: { formik: any }) => {
  return (
    <LoginContainer>
      <LoginCard>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", width: "100%", flexDirection: "row", gap: "30px", alignItems: "center" }}>
            {/*Heading*/}
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", minWidth: "50%" }}>
              <MenuBookIcon fontSize="large" sx={{ color: "#614385" }} />
              <Typography variant="h5" component="h2" fontWeight="bold" sx={{ color: "#614385" }}>
                Homework Buddy - Admin
              </Typography>
            </Box>
          </Box>
          <Box sx={{ marginTop: "35px" }}>
            <Stack spacing={2} component="form" >
              <GenerateCustTextField
                formik={formik}
                name='email'
                label='Email'
              />
              <PasswordTextField
                formik={formik}
                name='password'
                label='Password'
              />
              <Box />{/* Just for some spacing */}
              <CustBtn
                type="submit"
                onClick={formik.handleSubmit}
                fullWidth
                variant="contained"
                disabled={formik.isSubmitting}
              >
                Login
              </CustBtn>
            </Stack>
          </Box>
        </Box>
      </LoginCard>
    </LoginContainer >
  )
}

export default LoginForm;

