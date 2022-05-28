import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Lend from './lend';
import Home from './home';
import Borrow from './borrow';

const Routess = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/lend" element={<Lend />} />
            <Route path="/borrow" element={<Borrow />} />

        </Routes>
    );
};

export default Routess;
