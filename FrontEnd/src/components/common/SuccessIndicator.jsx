import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Alert, Box, useTheme } from "@mui/material";

const SuccessIndicator = ({ open, message, onClose }) => {
  const theme = useTheme();

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        transition: "all 0.3s ease-in-out",
      }}
      onClick={onClose}
    >
      <Alert
        icon={<CheckCircleOutlineIcon sx={{ fontSize: 28 }} />}
        severity="success"
        variant="filled"
        elevation={6}
        sx={{
          minWidth: "350px",
          padding: "20px",
          background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
          "& .MuiAlert-icon": {
            color: theme.palette.common.white,
            marginRight: 2,
          },
          color: theme.palette.common.white,
          fontSize: "1.2rem",
          alignItems: "center",
          borderRadius: "12px",
          boxShadow: `0 8px 32px -8px ${theme.palette.success.main}`,
          transform: open ? "scale(1)" : "scale(0.9)",
          transition: "transform 0.2s ease-in-out",
        }}
      >
        {message || "Operation Successful!"}
      </Alert>
    </Box>
  );
};

export default SuccessIndicator;
