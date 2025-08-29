import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the main app flow
    navigate('/');
  }, [navigate]);

  return null;
};

export default Index;