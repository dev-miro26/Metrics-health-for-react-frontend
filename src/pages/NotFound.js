import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import { ArrowLeft as IconArrowLeft } from "@mui/icons-material";
const Page404 = () => (
  <Box
    component="main"
    sx={{
      alignItems: "center",
      display: "flex",
      flexGrow: 1,
      padding: "16px",
    }}
  >
    <Container maxWidth="sm">
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            mb: 2,
            textAlign: "center",
          }}
        >
          <img
            alt="Under development"
            src="/assets/imgs/bg/error-404.png"
            style={{
              display: "inline-block",
              maxWidth: "100%",
              width: 300,
            }}
          />
        </Box>
        <Typography align="center" sx={{ mb: 3 }} variant="h3">
          404: The page you are looking for isn’t here
        </Typography>
        <Typography align="center" color="text.secondary" variant="body1">
          You either tried some shady route or you came here by mistake.
          Whichever it is, try using the navigation
        </Typography>
        <Button
          component={"a"}
          href="/"
          startIcon={
            <SvgIcon fontSize="small">
              <IconArrowLeft />
            </SvgIcon>
          }
          sx={{ mt: 3 }}
          variant="contained"
        >
          Go back to dashboard
        </Button>
      </Box>
    </Container>
  </Box>
);

export default Page404;
