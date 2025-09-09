import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Project from './pages/project';
import Layout from './layout';

export default function App() {
	return (
		
	<Routes location={location} key={location.pathname}>
		<Route element={<Layout />}>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
			<Route path="/project" element={<Project />} />
		</Route>
	</Routes>
		
	);
}