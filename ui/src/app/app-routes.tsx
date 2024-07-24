import React from "react";
import { Route, RouterProvider, createHashRouter, createRoutesFromElements} from "react-router-dom";
import { ExceptionComponent } from "./common/exception-handling/exception-component";
import { ProtectionWrapper } from "./common/protect-baselayout/protection-wrapper";
import BasicLayout from "./basic-layout";
import UserForm from "../user-details/user-detatils-form";
import VpnGrid from "../user-details/tabel";
import Login from "../user-details/login";

export const AppRoutes = () => {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route
        errorElement={
          <ExceptionComponent
            statusCode={403}
            statusMessage="Sorry, you are not authorized to access this page."
          />
        }
      >
        <Route path="/" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectionWrapper>
              <BasicLayout />
            </ProtectionWrapper>
          }
        >
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/user-grid" element={<VpnGrid />} />
          <Route
            path="/403"
            element={
              <ExceptionComponent
                statusCode={403}
                statusMessage="Sorry, you are not authorized to access this page."
              />
            }
          />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
