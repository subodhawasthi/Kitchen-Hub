import User from "./User";
import UserClass from "./UserClass";

const About = () => {
    return (
        <div>
            <h1>About</h1>
            <User name={"Subodh (function)"}/>
            <UserClass name={"Subodh (Class)"} location={"Mathura"} />
        </div>
    );
};

export default About;