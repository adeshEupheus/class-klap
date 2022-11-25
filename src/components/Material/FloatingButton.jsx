import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

import { Visibility } from "@mui/icons-material";

export default function FloatingActionButtons() {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab variant="extended" size="medium" color="primary">
        <Visibility sx={{ mr: 1 }} />
        View All
      </Fab>
    </Box>
  );
}
