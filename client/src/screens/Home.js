import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Circulation from "../components/home/Circulation";
import PoolList from "../components/home/PoolList";
import TVL from "../components/home/TVL";
import Title from "../components/Title";
import { fetchDefaultAction } from "../redux/actions/defaultAction";
import HomeSlider from "../components/home/HomeSlider";
import zynoro from "../assets/videos/zynoro.mp4";

const Home = () => {
  const dispatch = useDispatch();

  const dispatchActionFunction = () => {
    dispatch(fetchDefaultAction());
  };

  useEffect(() => {
    dispatchActionFunction();

    const interval = setInterval(() => {
      dispatchActionFunction();
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <HomeSlider />

      <video
        muted
        autoPlay
        loop
        // className="xl:fixed top-0 left-0 w-full xl:opacity-70 mt-20 mb-40 xl:my-0 rounded-md xl:rounded-none"
        className="max-w-[900px] w-full mx-auto pb-20"
      >
        <source src={zynoro} type="video/mp4" />
      </video>
      <div className="space-y-7 pb-20">
        <Title title="homeScreen.title" />
        <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-7 lg:space-y-0">
          <div className="w-full lg:w-[60%]">
            <TVL />
          </div>
          <div className="w-full lg:w-[40%]">
            <Circulation />
          </div>
        </div>
        <div>
          <PoolList />
        </div>
        <img
          src="/images/allocation.svg"
          alt=""
          width={900}
          className="mx-auto py-20"
        />
      </div>
    </>
  );
};

export default Home;
