import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import AddPortfolioModal from "./modals/AddPortfolioModal";
import SetNotiModal from "./modals/SetNotiModal";
import ArticleDetail from "./pages/ArticleDetail";
import CoinDetail from "./pages/CoinDetail";
import Home from "./pages/Home";
import ManageNoti from "./pages/ManageNoti";
import News from "./pages/News";
import Portfolio from "./pages/Portfolio";
import WatchList from "./pages/WatchList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="w-full flex">
      <Navbar />
      <div className="flex-1">
        <Header />
        <div className="px-[40px] py-[20px] w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coins/:id" element={<CoinDetail />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<ArticleDetail />} />
            <Route path="/notifications" element={<ManageNoti />} />
          </Routes>
        </div>
      </div>

      <AddPortfolioModal />
      <SetNotiModal />
      <ToastContainer />
    </div>
  );
}

export default App;
