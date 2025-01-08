import Cookies from "js-cookie";
import { createContext, useState } from "react";
import { projectApi } from "../../../util/axios.js";
import PropTypes from "prop-types";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  // We need to initialize states with the current values
  // and test the hanlde submit function
  const [settingsData, setSettingsData] = useState({
    displayName: "",
    profilePic: "",
    bannerPic: "",
    bioText: "",
  });

  const setDisplayName = (event) => {
    const displayName = event.target.value;
    setSettingsData((prev) => ({
      ...prev,
      displayName,
    }));
  };

  const setProfilePic = (event) => {
    const file = event.target.files[0];
    setSettingsData((prev) => ({
      ...prev,
      profilePic: file ? file : null,
    }));
  };

  const setBannerPic = (event) => {
    const file = event.target.files[0];
    setSettingsData((prev) => ({
      ...prev,
      bannerPic: file ? file : null,
    }));
  };

  const setBioText = (event) => {
    const bioText = event.target.value;
    setSettingsData((prev) => ({
      ...prev,
      bioText,
    }));
  };

  const resetSettingsData = () => {
    setSettingsData({
      displayName: "",
      profilePic: "",
      bannerPic: "",
      bioText: "",
    });
  };

  const handleSubmitSettings = async () => {
    if (
      !settingsData.displayName ||
      !settingsData.bioText ||
      !settingsData.profilePic ||
      !settingsData.bannerPic
    ) {
      console.error("Missing required settings data");
      return;
    }
    try {
      let profileMediaString = null;
      let bannerMediaString = null;
      if (settingsData.profilePic) {
        const reader = new FileReader();
        profileMediaString = await new Promise((resolve) => {
          reader.onload = () => {
            // const base64 = reader.result.split(",")[1];
            resolve(reader.result);
          };
          reader.readAsDataURL(settingsData.profilePic);
        });
        // profileMediaString = `data:${settingsData.profilePicture.type};base64,${base64String}`;
      } else {
        console.error("No profile picture provided");
      }

      if (settingsData.bannerPic) {
        const reader = new FileReader();
        bannerMediaString = await new Promise((resolve) => {
          reader.onload = () => {
            // const base64 = reader.result.split(",")[1];
            resolve(reader.result);
          };
          reader.readAsDataURL(settingsData.bannerPic);
        });
        // bannerMediaString = `data:${settingsData.bannerPicture.type};base64,${base64String}`;
      } else {
        console.error("No banner picture provided");
      }
      const settingsPayload = {
        // I can't seem to find the userId in Cookies.
        id: Cookies.get("user_id"),

        displayName: settingsData.displayName,
        profilePic: profileMediaString,
        bannerPic: bannerMediaString,
        bioText: settingsData.bioText,
      };

      const token = Cookies.get("jwt");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await projectApi.post(
        "/settings/update",
        settingsPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Settings Couldn't be updated");
      }

      console.log(response.data);
      setSettingsData(response.data);

      return response.data;
    } catch (error) {
      console.error("Error submitting settings:", error);
      throw error;
    }
  };

  const value = {
    settingsData,
    setDisplayName,
    setProfilePic,
    setBannerPic,
    setBioText,
    resetSettingsData,
    handleSubmitSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SettingsContext;
