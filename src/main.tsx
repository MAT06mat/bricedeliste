import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthProvider";
import App from "./App";
import Home from "./pages/Home";
import OrderForm from "./pages/OrderForm";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import "./index.css";
import Login from "./pages/Login";
import SuperAdmin from "./pages/SuperAdmin";
import Stats from "./pages/Stats";
import { enable_full_features } from "./data/var";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter basename="/bricedeliste">
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Home />} />
                        <Route path="commander" element={<OrderForm />} />
                        <Route path="login" element={<Login />} />
                        <Route path="admin" element={<Admin />} />
                        {enable_full_features && (
                            <Route path="stats" element={<Stats />} />
                        )}
                        <Route path="super-admin" element={<SuperAdmin />} />
                        <Route path="inscription" element={<Register />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
