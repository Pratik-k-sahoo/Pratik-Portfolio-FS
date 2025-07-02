import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setLoading, setProfile } from "../redux/profileSlice";

const useGetProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get("/v1/admin/profile", {
          withCredentials: true,
        });
        console.log("Profile fetched:", response.data.profile);
        dispatch(setProfile(response.data.profile));
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchProfile();
  }, [dispatch]);
};

export default useGetProfile;