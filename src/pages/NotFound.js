import * as React from "react";
import { NavLink } from "react-router-dom";

export default function Error404() {
  return (
    <div>
      404 Page not found. <NavLink to="/">Go to main page.</NavLink>
    </div>
  );
}
