import "./landingPage.scss";

const LandingPage = () => {
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
        </div>
    );
};

export default LandingPage;
