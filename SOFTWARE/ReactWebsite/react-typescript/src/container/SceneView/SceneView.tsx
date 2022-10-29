//import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const SceneView = () => {
    //const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div>
            <h1>Scene view</h1>
            <span>Ovo je prikaz scene...</span>
            <Button
                onClick={() => navigate(-1)}
                label={"Prikaži scenu"}
            />
        </div>
    );
};

export default SceneView;
