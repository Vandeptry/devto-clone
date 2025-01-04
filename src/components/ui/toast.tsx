//src/components/ui/toast.tsx
import { ToastBar, Toaster } from "react-hot-toast";

export const Toast = () => (
  <Toaster
    position="top-center"
    reverseOrder={false}
    gutter={8}
    containerClassName=""
    containerStyle={{}}
    toastOptions={{
      className: "",
      duration: 5000,
      style: {
        background: "#333",
        color: "#fff",
      },
      success: {
        duration: 3000,
        iconTheme: {
          primary: "green",
          secondary: "black",
        },
      },
    }}
  >
    {(t) => (
      <ToastBar toast={t}>
        {({ icon, message }) => (
          <>
            {icon}
            {message}
          </>
        )}
      </ToastBar>
    )}
  </Toaster>
);