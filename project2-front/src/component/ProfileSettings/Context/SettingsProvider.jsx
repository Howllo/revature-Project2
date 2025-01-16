import Cookies from "js-cookie";
import { createContext, useState } from "react";
import { projectApi } from "../../../util/axios.js";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settingsData, setSettingsData] = useState({
    displayName: Cookies.get("display_name") == null || "",
    profilePic: Cookies.get("profile_pic"),
    bannerPic: Cookies.get("banner_pic"),
    biography: Cookies.get("bio_text") || "",
    profilePreviewURL: "",
    bannerPreviewURL: "",
  });
  const navigate = useNavigate();
  const [profileFile, setProfileFile] = useState(null);
  const [bannerFile, setBannerFile] = useState()

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
    setProfileFile(null);
    setBannerFile(null);
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
      setProfileFile(file);
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
      setBannerFile(file);
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
      displayName: Cookies.get("display_name"),
      profilePic: Cookies.get("profile_pic"),
      bannerPic: Cookies.get("banner_pic"),
      biography: Cookies.get("bio_text"),
    });
  };

  const handleSubmitSettings = async () => {
    const token = Cookies.get("jwt");
    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      const settingsPayload = new FormData();
      settingsPayload.append('id', Cookies.get('user_id'));

      if(profileFile){
        settingsPayload.append('profilePic', profileFile ? profileFile : null);
      }

      if(bannerFile){
        settingsPayload.append('bannerPic', bannerFile ? bannerFile : null);
      }

      settingsPayload.append("displayName", settingsData.displayName || "");
      settingsPayload.append("biography", settingsData.biography || "");

      const response = await projectApi.put(
        "user/settings/update", settingsPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        resetSettingsData();
        throw new Error("API response was not okay");
      }

      setSettingsData((prev) => ({
        ...prev,
        profilePic: response.data.profilePic,
        bannerPic: response.data.bannerPic,
        displayName: response.data.displayName,
        biography: response.data.biography,
      }));

      Cookies.set("profile_pic", response.data.profilePic);
      Cookies.set("banner_pic", response.data.bannerPic);
      Cookies.set("display_name", response.data.displayName);
      Cookies.set("bio_text", response.data.biography);

      resetTempImageURLS();
      navigate(`/profile/${Cookies.get("username")}`.toLowerCase());
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
