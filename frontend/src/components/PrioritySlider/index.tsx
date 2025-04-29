import { Box } from "@chakra-ui/react";
import { Slider, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

export const PrioritySlider = ({ value, ...props }: { value: number }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const priorityColors = [
    theme.palette.success.main,       // 1 - Very Low (green)
    theme.palette.success.light,      // 2 - Low
    theme.palette.info.main,          // 3 - Moderately Low
    theme.palette.info.light,         // 4 - Below Average
    theme.palette.warning.light,      // 5 - Average (yellow)
    theme.palette.warning.main,       // 6 - Above Average
    theme.palette.error.light,        // 7 - Moderately High
    theme.palette.error.main,         // 8 - High (orange)
    theme.palette.error.dark,         // 9 - Very High
    '#d32f2f',                       // 10 - Critical (dark red)
  ];

  const textColors = [
    theme.palette.success.main,       // 1 - Very Low (green)
    theme.palette.success.light,      // 2 - Low
    theme.palette.info.main,          // 3 - Moderately Low
    theme.palette.info.light,         // 4 - Below Average
    theme.palette.warning.light,      // 5 - Average (yellow)
    theme.palette.warning.main,       // 6 - Above Average
    theme.palette.error.light,        // 7 - Moderately High
    theme.palette.error.main,         // 8 - High (orange)
    theme.palette.error.dark,         // 9 - Very High
    '#d32f2f',                       // 10 - Critical (dark red)
  
  ];

  return (
    <Box>
      <Typography id="priority-slider" gutterBottom>
        {t("PriorityTitle")}:{" "}
        <span style={{ 
          color: textColors[value - 1],
          fontWeight: value === 10 ? 'bold' : 'normal'
        }}>
          {t(`PriorityValue${value}`)}
        </span>
      </Typography>
      <Slider
        {...props}
        value={value}
        sx={{
          color: priorityColors[value - 1],
          "& .MuiSlider-thumb": {
            backgroundColor: priorityColors[value - 1],
          },
          "& .MuiSlider-valueLabel": {
            backgroundColor: priorityColors[value - 1],
            color: textColors[value - 1],
          },
        }}
      />
    </Box>
  );
};
