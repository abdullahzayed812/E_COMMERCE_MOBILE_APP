import { Dispatch, SetStateAction } from "react";
import { COLORS } from "../configs/colors/colors";
import { useAppSelector } from "../redux/hooks";

export const updateError = (
  message: string,
  errorState: Dispatch<SetStateAction<string>>,
) => {
  errorState(message);
  setTimeout(() => errorState(""), 2500);
};

export const isInputsFilled = (inputsValue: { [index: string]: string }) => {
  return Object.values(inputsValue).every((value) => value.trim());
};

export const isValidInputValue = (inputValue: string, pattern: RegExp) => {
  return inputValue.match(pattern);
};

export const useTheme = () => {
  const { theme } = useAppSelector((state) => state.theme);

  const backgroundColor = theme === "LIGHT" ? COLORS.white : COLORS.textDark;
  const color = theme === "LIGHT" ? COLORS.textDark : COLORS.white;

  return { backgroundColor, color };
};
