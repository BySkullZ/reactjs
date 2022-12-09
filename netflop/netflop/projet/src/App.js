import './App.css';
import Navbar from './pages/Navbar';
import Banner from './pages/Banner';
import Row from './pages/Row';

function App() {
	return (
		<div>
			<Navbar />
			<Banner />
			<Row title="Netflop les plus populaires" fetchUrl="https://api.themoviedb.org/3/movie/popular"/>
			<Row title="Les plus aimés" fetchUrl="https://api.themoviedb.org/3/movie/top_rated"/>
			<Row title="En ce moment au cinéma" fetchUrl="https://api.themoviedb.org/3/movie/now_playing"/>
			<Row title="Films à venir" fetchUrl="https://api.themoviedb.org/3/movie/upcoming"/>
		</div>
	);
}

export default App;
