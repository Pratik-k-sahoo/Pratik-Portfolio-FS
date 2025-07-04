import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setLoading, setProject } from "../redux/projectSlice";


const useGetProjects = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get("/v1/admin/get-projects", {
          withCredentials: true,
        });
        dispatch(setProject(response.data.projects));
      } catch(err) {
        console.error("Error fetching projects:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchProjects();
  }, [dispatch]);
};

export default useGetProjects;