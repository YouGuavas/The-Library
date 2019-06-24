import axios from 'axios';
const environment = '';

let BASE_URL; 

environment === 'dev' ? BASE_URL = 'http://localhost:3333' : BASE_URL = 'https://the-library-of-guavas.herokuapp.com/';

export {getBooksData, newBook, getBookData, deleteBook, newComment, deleteComment};

function deleteBook(bookID) {
	const url = `${BASE_URL}/api/deletebook/${bookID}`;
	return axios.get(url).then(res=>res);
};

function newComment(bookID, comment) {
	const url = `${BASE_URL}/api/newcomment/${bookID}`;
	return axios.post(url, {newComment: comment}).then(res=>res);
	//return getBookData(bookID);
};
function deleteComment(bookID, order) {
	const url = `${BASE_URL}/api/deletecomment/${bookID}/${order}`;
	return axios.get(url, {order}).then(res=>res);
};

function getBooksData() {
	const url = `${BASE_URL}/api/books`;
	return axios.get(url).then(res=>res.data);
};

function getBookData(bookID) {
	const url = `${BASE_URL}/api/book/${bookID}`;
	return axios.get(url).then(res=>res);
};

function newBook(data) {
	const url = `${BASE_URL}/api/newbook`;
	return axios.post(url, {uid: data.user.id, title: data.title, author: data.author, published: data.published, finished: data.finished, synopsis: data.synopsis, notes: data.notes}).then(res=>res.data);
};