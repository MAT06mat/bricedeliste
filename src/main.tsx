import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthProvider";
import App from "./App";
import Home from "./pages/Home";
import OrderForm from "./pages/OrderForm";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Home />} />
                        <Route path="commander" element={<OrderForm />} />
                        <Route path="admin" element={<Admin />} />
                        <Route path="inscription" element={<Register />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </HashRouter>
        </AuthProvider>
    </React.StrictMode>
);
