import "./landingPage.scss";

const LandingPage = () => {

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
                    <div className="taskWrapper first">
                        <img src="/text-background.png" className="" alt="tasks slika" />
                        <div className="task1">
                            <h1>Pregledajte trenutna mjerenja iz vrta</h1> <br />
                        </div>
                    </div>

                    <div className="taskWrapper second">
                        <img src="/text-background.png" className="" alt="tasks slika" />
                        <div className="task2">
                            <h1>Sami upravljajte kako se podaci prikazuju</h1> <br />
                        </div>
                    </div>
                    
                    <div className="taskWrapper third">
                        <img src="/text-background.png" className="" alt="tasks slika" />
                        <div className="task3">
                            <h1>Dodajte nove scene, uredite ili izbrišite postojeće</h1> <br />
                        </div>
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
        </div>
    );
};

export default LandingPage;
