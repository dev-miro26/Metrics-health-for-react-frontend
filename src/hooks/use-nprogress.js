import { useEffect } from "react";
import nprogress from "nprogress";
import { useNavigate } from "react-router-dom";

export function useNProgress() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const startProgressBar = () => {
  //     nprogress.start();
  //   };
  //   const stopProgressBar = () => {
  //     nprogress.done();
  //   };
  //   navigate.listen(startProgressBar);
  //   return () => {
  //     navigate.listen(stopProgressBar);
  //   };
  // }, [navigate]);
}
