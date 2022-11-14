//import { useNavigate } from "react-router-dom";
//import { Button } from "primereact/button";
import "./landingPage.scss";
//import { PAGE_ROUTES } from "utils/paths";

const LandingPage = () => {
    //const navigate = useNavigate();
    const bgImgTask={
        backgroundImage: "url(/text-background.png)",
    };

    return (
        <div className="landing-page">
            <div className="image-holder">
                <img
                    src="/iot-polje-logo.png"
                    className="iot-polje-img"
                    alt="iot polje slika"
                    />
            </div>
                
            <div className="tasksAndLeaves">
                <div className="tasks">
                    <div className="task1" style={bgImgTask}>
                        <h1>Pregledajte trenutna mjerenja iz vrta</h1> <br />
                    </div>
                    <div className="task2" style={bgImgTask}>
                        <h1>Sami upravljajte kako se podaci prikazuju</h1> <br />
                    </div>
                    <div className="task3" style={bgImgTask}>
                        <h1>Dodajte nove scene, uredite ili izbrišite postojeće</h1> <br />
                    </div>
                </div>
                <div className="leaves">
                        <img
                        src="/leaves-background.png"
                        className="leaves-img"
                        alt="listovi slika"
                        />
                </div>
            </div>
                

                
                {//<Button}
                    //onClick={() => navigate(PAGE_ROUTES.ShortSceneView)}
                    //label={"Prikaži kratke scene"}
                    ///>
                }
        </div>
    );
};

export default LandingPage;
