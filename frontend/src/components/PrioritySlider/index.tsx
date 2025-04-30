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
    theme.palette.success.main,
    theme.palette.success.light,
    theme.palette.info.main,
    theme.palette.info.light,
    theme.palette.warning.light,
    theme.palette.warning.main,
    theme.palette.error.light,
    theme.palette.error.main,
    theme.palette.error.dark,
    '#d32f2f',
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
        min={1}
        max={10}
        step={1}
        marks
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