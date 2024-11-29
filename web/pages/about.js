import Footer from "@/components/footer";
import Header from "@/components/header";
import react from "react";
export default function About() {
    return(
        <>
        <Header></Header>
        <h1 className="title">Experience the Future of Wildlife Exploration at Our Zoo!</h1>
        <p className="text">Welcome to our zoo, where cutting-edge pathfinding technology transforms your visit into an unforgettable adventure! Our innovative system enhances your experience by combining real-time monitoring of animal behavior and feeding schedules with smart navigation, ensuring you make the most of your time with us.</p>
        <h1 id="title">What Makes Our Zoo Unique?</h1>
        <p className="text">1.Smart Recommendations: Get notified about animal feeding times, special events, or active animal behavior nearby. No more missing the lion’s roar or the penguins' playful swim!</p>
        <p> </p>
        <p className="text">2.Dynamic Pathfinding: Our technology guides you to the most exciting exhibits based on real-time updates, tailoring your route for a seamless and personalized journey.</p>
        <p className="text">3. Interactive Planning: Start your adventure with our app or on-site kiosks. Choose your favorite animals, and let our system design a custom tour highlighting must-see moments.</p>
        <p id="text">We’re not just a zoo—we’re a destination for tech-savvy exploration and nature enthusiasts alike. By merging the latest advancements with a love for wildlife, we’ve created an experience that’s not only fun but educational and inspiring.

Come explore the future of zoos with us! 🌍✨</p>
        <Footer></Footer>
        </>
    );
}