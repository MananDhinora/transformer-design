import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DefaultValueControllerService } from "../../middleware-api";
import useStore from "../../stores/Store";
import SuccessIndicator from "../common/SuccessIndicator";

const DefaultValues = () => {
  const theme = useTheme();
  const [defaultValues, setDefaultValues] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const response = await DefaultValueControllerService.getValue(
          "standard_type",
          `Bearer ${localStorage.getItem("token")}`
        );
        setDefaultValues(response[0].defaultValues);
      } catch (error) {
        console.error("Error fetching default values:", error);
      }
    };
    fetchValues();
  }, []);

  const handleValueChange = (category, key, value) => {
    setEditedValues((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    const userId = useStore.getState().user.id;
    try {
      // Create a deep copy of defaultValues
      const updatedValues = JSON.parse(JSON.stringify(defaultValues));

      // Merge edited values while preserving structure
      Object.keys(editedValues).forEach((category) => {
        Object.keys(editedValues[category]).forEach((key) => {
          updatedValues[category][key] = editedValues[category][key];
        });
      });

      await DefaultValueControllerService.setValue({
        valueType: "standard_type",
        userId: userId,
        defaultValues: updatedValues,
      });

      setShowSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error saving values:", error);
    }
  };

  const renderCategoryTable = (category, data) => {
    if (!data) return null;

    return (
      <Accordion defaultExpanded key={category}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
            {category.replace(/([A-Z])/g, " $1").trim()}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", width: "50%" }}>
                    Parameter
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", width: "50%" }}>
                    Value
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(data).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="number"
                        inputProps={{ step: "any" }}
                        sx={{
                          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                            {
                              WebkitAppearance: "none",
                              margin: 0,
                            },
                        }}
                        defaultValue={value}
                        onChange={(e) =>
                          handleValueChange(category, key, e.target.value)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)"
              : "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Default Values Configuration
        </Typography>

        <Grid container spacing={2}>
          {defaultValues &&
            Object.entries(defaultValues).map(([category, data], index) => (
              <Grid item xs={12} md={6} key={category}>
                {renderCategoryTable(category, data)}
              </Grid>
            ))}
        </Grid>

        <Box
          sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              "&:hover": {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
      <SuccessIndicator
        open={showSuccess}
        message="Values updated successfully!"
        onClose={() => setShowSuccess(false)}
      />
    </Container>
  );
};

export default DefaultValues;
