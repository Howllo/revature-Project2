import Cookies from "js-cookie";
import { createContext, useState } from "react";
import { projectApi } from "../../../util/axios.js";
import PropTypes from "prop-types";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settingsData, setSettingsData] = useState({
    displayName: Cookies.get("display_name") == null || "",
    profilePic:
      Cookies.get("profile_pic") == null || "https://placehold.co/600x400/png",
    bannerPic:
      Cookies.get("banner_pic") == null || "https://picsum.photos/1500/500",
    biography: Cookies.get("bio_text") || "",
    profilePreviewURL: "",
    bannerPreviewURL: "",
  });
  const [unapprovedProfilePic, setUnapprovedProfilePic] = useState("");
  const [unapprovedBannerPic, setUnapprovedBannerPic] = useState("");

  // Strings to be converted to base64 for API
  let profileMediaString;
  let bannerMediaString;

  const resetTempImageURLS = () => {
    if (settingsData.profilePreviewURL) {
      setSettingsData((prev) => ({
        ...prev,
        profilePreviewURL: URL.revokeObjectURL(settingsData.profilePreviewURL),
      }));
    }
    if (settingsData.bannerPreviewURL) {
      setSettingsData((prev) => ({
        ...prev,
        bannerPreviewURL: URL.revokeObjectURL(settingsData.bannerPreviewURL),
      }));
    }
    profileMediaString = "";
    bannerMediaString = "";
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file && !file.type.startsWith("video/")) {
      if (settingsData.profilePreviewURL) {
        URL.revokeObjectURL(settingsData.profilePreviewURL);
      }
      setSettingsData((prev) => ({
        ...prev,
        profilePreviewURL: URL.createObjectURL(file),
      }));
      setUnapprovedProfilePic(file);
    }
  };
  const handleBannerPicChange = (event) => {
    const file = event.target.files[0];

    if (file && !file.type.startsWith("video/")) {
      if (settingsData.bannerPreviewURL) {
        URL.revokeObjectURL(settingsData.bannerPreviewURL);
      }
      setSettingsData((prev) => ({
        ...prev,
        bannerPreviewURL: URL.createObjectURL(file),
      }));
      setUnapprovedBannerPic(file);
    }
  };
  const setDisplayName = (event) => {
    const displayName = event.target.value;
    setSettingsData((prev) => ({
      ...prev,
      displayName,
    }));
  };

  const setProfilePic = (url) => {
    setSettingsData((prev) => ({
      ...prev,
      profilePic: url,
    }));
  };

  const setBannerPic = (url) => {
    setSettingsData((prev) => ({
      ...prev,
      bannerPic: url,
    }));
  };

  const setBioText = (event) => {
    const bioText = event.target.value;
    setSettingsData((prev) => ({
      ...prev,
      biography: bioText,
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
    try {
      if (unapprovedProfilePic) {
        const reader = new FileReader();
        profileMediaString = await new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(unapprovedProfilePic);
        });
      } else {
        console.error("No profile picture provided");
      }

      if (unapprovedBannerPic) {
        const reader = new FileReader();
        bannerMediaString = await new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(unapprovedBannerPic);
        });
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
        throw new Error("API response was not okay");
      }

      setSettingsData(response.data);
      Cookies.set("profile_pic", response.data.profilePic);
      Cookies.set("banner_pic", response.data.bannerPic);
      Cookies.set("display_name", response.data.displayName);
      Cookies.set("bio_text", response.data.biography);
      resetTempImageURLS();
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
    setUnapprovedProfilePic,
    setUnapprovedBannerPic,
    handleProfilePicChange,
    handleBannerPicChange,
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
