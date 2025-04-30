export interface SnackbarState {
  open: boolean;
  type: "success" | "error";
  message: string;
}
