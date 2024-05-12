import React, { lazy, Suspense } from 'react';
import Loader from '../Loader/Loader';
const Banner = lazy(() => import('./Banner'));
const Faq = lazy(() => import('./Faq'));
const Service = lazy(() => import('./Services'));
const Menu = lazy(() => import('./Menu'));

export default function LandingPage() {
    return (
        <Suspense fallback={<Loader />}>
            <Banner />
            <Service />
            <Menu />
            <Faq />
        </Suspense>
    );
}
