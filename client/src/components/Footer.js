import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full px-6 lg:px-0 pt-10 md:pt-20 bg-black/60">
      <div className="max-w-[1160px] mx-auto">
        <div className="w-full text-white flex flex-col items-center md:items-start md:flex-row gap-y-10 md:gap-x-20 h-auto md:h-[220px] justify-between">
          <div>
            <Link to="/" className="hidden md:flex items-center gap-x-4">
              <img
                src="/images/zynoro-logo.png"
                alt="zynoro"
                width={187}
                className="object-cover"
              />
            </Link>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">About Us</h2>
            <ul className="space-y-2 font-normal flex flex-col items-center md:items-start">
              <li>
                <h3>
                  <Link to="/">Home</Link>
                </h3>
              </li>
              <li>
                <h3>Github</h3>
              </li>
              <li>
                <h3>Docs</h3>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Features</h2>
            <ul className="space-y-2 font-normal flex flex-col items-center md:items-start">
              <li>
                <h3>
                  <Link to="/pools/single">Single Pool</Link>
                </h3>
              </li>
              <li>
                <h3>
                  <Link to="/pools/pair">Dual Pool</Link>
                </h3>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Zynoro Media Channels
            </h2>
            <ul className="flex items-center gap-x-6 justify-around md:justify-start">
              <li>
                <a
                  href="https://t.me/ZYNORO_ANNOUNCEMENT"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    src="/images/telegram-announcement.png"
                    alt="Telegram Announcement"
                    width={39}
                    height={39}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/ZYNORO_OFFFICIAL_COMMUNITY"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    src="/images/telegram.png"
                    alt="Telegram"
                    width={30}
                    height={30}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img src="/images/x.png" alt="X" width={30} height={30} />
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/@zynoro"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    src="/images/medium.png"
                    alt="Medium"
                    width={40}
                    height={40}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center py-2 text-white text-sm pt-20 md:pt-0">
          Zynoro Protocol. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
