import React from "react";
import SideBarHeader from "./SideBarHeader";
import ActiveUsers from "./ActiveUsers";
import { useLocation } from "react-router-dom";
import ChatList from "./Variant/ChatList";
import CallList from "./Variant/CallList";
import FriendsList from "./Variant/FriendsList";
import Profile from "./Variant/Profile";

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  // location
  const location = useLocation();

  return (
    <div className="border-r-[1px] border-light_border_ dark:border-dark_border_ h-[100vh] overflow-hidden dark:bg-dark_bg_">

      {/* if page is not profile */}
      {location.pathname !== "/profile" && (
        <>
          {/* chat header */}
          <SideBarHeader />

          {/* Active users */}
          {location.pathname === "/chat" && <ActiveUsers />}

          {/* chat list */}
          <div className="w-full h-[85vh] bg-[#fafbfd] dark:bg-dark_bg_">
            <ul className="pt-5 !gap-y-3 flex flex-col h-[100%] overflow-y-auto overflow-x-hidden scrollHidden">
              {/* lists */}
              {location.pathname === "/chat" && (
                <>
                  {/* Chat list */}
                  <ChatList />
                </>
              )}

              {location.pathname === "/calls" && (
                <>
                  {/* Call list */}
                  <CallList />
                </>
              )}

              {location.pathname === "/friends" && (
                <>
                  {/* Call list */}
                  <FriendsList />
                </>
              )}
            </ul>
          </div>
        </>
      )}

      {/* Profile */}
      <Profile />
    </div>
  );
};

export default SideBar;
