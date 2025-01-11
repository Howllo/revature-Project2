import Cookies from "js-cookie";
import { createContext, useState } from "react";
import { projectApi } from "../../../util/axios.js";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../../UserProfile/Context/UseUserProfile.jsx";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  // const [settingsData, setSettingsData] = useState({
  //   displayName: Cookies.get("display_name") == null || "",
  //   profilePic: Cookies.get("profile_pic"),
  //   bannerPic: Cookies.get("banner_pic"),
  //   biography: Cookies.get("bio_text") || "",
  //   profilePreviewURL: "",
  //   bannerPreviewURL: "",
  // });
  const { settingsData, setSettingsData } = useUserProfile();

  const [unapprovedProfilePic, setUnapprovedProfilePic] = useState("");
  const [unapprovedBannerPic, setUnapprovedBannerPic] = useState("");

  // const navigate = useNavigate();

  // Strings to be converted to base64 for API
  let profileMediaString = null;
  let bannerMediaString = null;

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
      displayName: Cookies.get("display_name"),
      profilePic: Cookies.get("profile_pic"),
      bannerPic: Cookies.get("banner_pic"),
      biography: Cookies.get("bio_text"),
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
      console.log(
        "Console log from Setting Setting Provider Api call being made"
      );
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

      if (response.status !== 200) {
        resetSettingsData();
        throw new Error("API response was not okay");
      }
      console.log("response from api was okay");
      console.log(response.data);

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
      console.log("after cookies were set");
      console.log(response.data);
      resetTempImageURLS();

      // navigate(`/profile/${Cookies.get("username")}`);
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
