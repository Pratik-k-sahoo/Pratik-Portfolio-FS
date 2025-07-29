import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import Spline from "@splinetool/react-spline";
import { useRef } from "react";

const Home = () => {
	const { profile } = useSelector((state) => state.profile);
	const [load, setLoad] = useState(false);
	const showProfile = useRef();
	const showIntro = useRef();
  const btn = useRef();

	const onLoad = (spline) => {
		if (spline) setLoad(true);
	};

	useEffect(() => {
		showProfile.current.style.display = "none";
	}, []);

	const handlePortfolio = () => {
		btn.current.style.display = "none";
		showIntro.current.style.display = "none";
		showProfile.current.style.display = "block";
	};

	return (
		<div>
			<Spline
				scene="https://prod.spline.design/tEq-KaAD9vklQdB3/scene.splinecode"
				ref={showIntro}
				onLoad={onLoad}
			/>
			{load && profile?.name && (
				<button
					ref={btn}
					className="absolute bottom-0 left-[50%] transform -translate-y-[50%] -translate-x-[50%] border-2 rounded-2xl px-5 py-2 cursor-pointer"
					onClick={handlePortfolio}
				>
					Show Portfolio
				</button>
			)}
			<div ref={showProfile}>
				<Header page="home" />
				<HeroSection />
			</div>
		</div>
	);
};

export default Home;
