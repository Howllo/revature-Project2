import Cookies from "js-cookie";
import { createContext, useState } from "react";
import { projectApi } from "../../../util/axios.js";
import PropTypes from "prop-types";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settingsData, setSettingsData] = useState({
    displayName: Cookies.get("display_name") == null || "",
    profilePic:
      Cookies.get("profile_pic") == null || "https://placehold.co/600x400",
    bannerPic:
      Cookies.get("banner_pic") == null || "https://placehold.co/600x400/png",
    biography: Cookies.get("bio_text") || "",
  });

  let profilePreviewURL;
  let bannerPreviewURL;

  const setDisplayName = (event) => {
    const displayName = event.target.value;
    setSettingsData((prev) => ({
      ...prev,
      displayName,
    }));
  };

  const setProfilePic = (event) => {
    const file = event.target.files[0];
    if (file && !file.type.startsWith("video/")) {
      if (profilePreviewURL) {
        URL.revokeObjectURL(profilePreviewURL);
      }
      profilePreviewURL = URL.createObjectURL(file);
      setSettingsData((prev) => ({
        ...prev,
        profilePic: profilePreviewURL ? profilePreviewURL : null,
      }));
    }
  };

  const setBannerPic = (event) => {
    const file = event.target.files[0];
    if (file && !file.type.startsWith("video/")) {
      if (bannerPreviewURL) {
        URL.revokeObjectURL(bannerPreviewURL);
      }
      bannerPreviewURL = URL.createObjectURL(file);
      setSettingsData((prev) => ({
        ...prev,
        bannerPic: bannerPreviewURL
          ? bannerPreviewURL
          : "https://via.placeholder.com/400",
      }));
    }
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
      displayName: Cookies.get("display_name") == null || "",
      profilePic:
        Cookies.get("profile_pic") == null || "https://placehold.co/600x400",
      bannerPic:
        Cookies.get("banner_pic") == null || "https://placehold.co/600x400/png",
      biography: Cookies.get("bio_text") || "",
    });
  };

  const handleSubmitSettings = async () => {
    // if (
    //   !settingsData.displayName ||
    //   !settingsData.bioText ||
    //   !settingsData.profilePic ||
    //   !settingsData.bannerPic
    // ) {
    //   console.error("Missing required settings data");
    //   return;
    // }

    try {
      let profileMediaString = null;
      let bannerMediaString = null;
      console.log("from settings data");
      console.log(settingsData.profilePic);
      console.log(settingsData.bannerPic);
      console.log("logging from the top of if block to create profile string");
      if (settingsData.profilePic) {
        const reader = new FileReader();
        profileMediaString = await new Promise((resolve) => {
          console.log("logging from promise to create profile string");
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
      console.log("logging from the top of if block to create banner string");
      if (settingsData.bannerPic) {
        const reader = new FileReader();
        bannerMediaString = await new Promise((resolve) => {
          console.log("logging from promise to create banner string");
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
        id: Cookies.get("user_id"),

        displayName: settingsData.displayName,
        profilePic: profileMediaString,
        bannerPic: bannerMediaString,
        biography: settingsData.biography,
      };

      const token = Cookies.get("jwt");
      console.log("printing token from settings provider");
      console.log(token);
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await projectApi.put(
        "user/settings/update",
        settingsPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("response from api was not okay");
        resetSettingsData();
        throw new Error("Settings Couldn't be updated");
      }

      setSettingsData(response.data);
      Cookies.set("profile_pic", response.data.profilePic);
      Cookies.set("banner_pic", response.data.bannerPic);
      Cookies.set("display_name", response.data.displayName);
      Cookies.set("bio_text", response.data.biography);
      URL.revokeObjectURL(profilePreviewURL);
      URL.revokeObjectURL(bannerPreviewURL);
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
