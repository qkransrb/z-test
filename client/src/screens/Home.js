import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Circulation from "../components/home/Circulation";
import PoolList from "../components/home/PoolList";
import TVL from "../components/home/TVL";
import Title from "../components/Title";
import { fetchDefaultAction } from "../redux/actions/defaultAction";
import HomeSlider from "../components/home/HomeSlider";
import zynoroGif from "../assets/images/zynoro.gif";

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
      <img src={zynoroGif} alt="Zynoro" className="py-10" />
      <div className="space-y-7">
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
          className="mx-auto py-48"
        />
      </div>
    </>
  );
};

export default Home;
