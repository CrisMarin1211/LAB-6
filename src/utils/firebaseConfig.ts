import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { Song } from '../types/Song';

const firebaseConfig = {
	apiKey: 'AIzaSyAmoAPcSCMsVZq19M-YMeIUSnJ6UdXNJ2s',
	authDomain: 'lab-6-6d8f4.firebaseapp.com',
	projectId: 'lab-6-6d8f4',
	storageBucket: 'lab-6-6d8f4.appspot.com',
	messagingSenderId: '696217550920',
	appId: '1:696217550920:web:d13b7d3c7f15df130a987d',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const songDocuments = collection(db, 'songs');

export const addSongs = async (song: Song) => {
	try {
		await addDoc(songDocuments, song);
		console.log('Se añadió');
	} catch (error) {
		console.error(error);
	}
};

export const getSongs = async () => {
	const querySnapshot = await getDocs(songDocuments);
	const songs: Song[] = [];

	querySnapshot.docs.forEach((doc) => {
		const data: Omit<Song, 'id'> = doc.data() as any;
		const songData = doc.data() as Song;
		songs.push(songData);
	});
	console.log(songs);
	return songs;
};
