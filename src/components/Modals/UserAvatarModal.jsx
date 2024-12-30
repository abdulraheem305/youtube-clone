import React, { useState, useEffect } from "react";
import {
  GoogleIcon,
  SwitchAccountIcon,
  SettingsIcon,
  SignOutIcon,
  PurchasesIcon,
  YourDataIcon,
  AppearanceIcon,
  LanguagesIcon,
  RestrictedIcon,
  LocationIcon,
  KeyboardIcon,
  HelpsIcon,
  FeedbackIcon,
} from "../../constants";

const menuItems = [
  { icon: GoogleIcon, label: "Google Account", dividerAfter: false },
  { icon: SwitchAccountIcon, label: "Switch account", dividerAfter: false },
  { icon: SettingsIcon, label: "Settings", dividerAfter: false },
  { icon: SignOutIcon, label: "Sign out", dividerAfter: true },
  {
    icon: PurchasesIcon,
    label: "Purchases and memberships",
    dividerAfter: true,
  },
  { icon: YourDataIcon, label: "Your data in YouTube", dividerAfter: false },
  {
    icon: AppearanceIcon,
    label: "Appearance: Device theme",
    dividerAfter: false,
  },
  { icon: LanguagesIcon, label: "Language: English", dividerAfter: false },
  { icon: RestrictedIcon, label: "Restricted Mode: Off", dividerAfter: false },
  { icon: LocationIcon, label: "Location: Pakistan", dividerAfter: false },
  { icon: KeyboardIcon, label: "Keyboard shortcuts", dividerAfter: true },
  { icon: SettingsIcon, label: "Settings", dividerAfter: true },
  { icon: HelpsIcon, label: "Help", dividerAfter: false },
  { icon: FeedbackIcon, label: "Send feedback", dividerAfter: false },
];

const UserAvatarModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.closest(".dropdown-menu") ||
        event.target.closest(".user-avatar-button")
      )
        return;
      setIsOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-gray-600 user-avatar-button"
      >
        <img
          width={32}
          height={32}
          src="User.png"
          alt="User Avatar"
          className="rounded-full"
        />
      </button>

      {isOpen && (
        <>
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 dropdown-menu">
            <div className="absolute top-2 left-3">
              <img
                src="User.png"
                alt="User Avatar"
                className="w-8 h-8 rounded-full bg-gray-200"
              />
            </div>
            <div className="p-3 pl-16">
              <div className="text-gray-900 text-lg">Abdul Raheem</div>
              <div className="text-sm text-gray-600">ar2148085@gmail.com</div>
              <div className="text-sm text-blue-700 mt-1">Create a channel</div>
            </div>
            <hr className="my-2 border-gray" />
            <ul className="py-1 text-gray-700">
              {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                  <li className="flex items-center px-3 py-1 hover:bg-lightGray cursor-pointer space-x-4 whitespace-nowrap text-sm">
                    <item.icon className="text-gray-600" />
                    <span>{item.label}</span>
                  </li>
                  {item.dividerAfter && <hr className="my-2 border-gray" />}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default UserAvatarModal;
