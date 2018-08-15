import axios from 'axios';

//const BASE_URL = 'http://localhost:3333';
export {getBooksData, newBook, getBookData, deleteBook, newComment};

function deleteBook(bookID) {
	const url = `/api/deletebook/${bookID}`;
	return axios.get(url).then(res=>res);
};

function newComment(bookID, comment) {
	const url = `/api/newcomment/${bookID}`;
	return axios.post(url, {newComment: comment}).then(res=>res);
}

function getBooksData() {
	const url = `/api/books`;
	return axios.get(url).then(res=>res.data);
};
function getBookData(bookID) {
	const url = `/api/book/${bookID}`;
	return axios.get(url).then(res=>res);
};
function newBook(data) {
	const url = `/api/newbook`;
	return axios.post(url, {title: data.title, author: data.author, published: data.published, finished: data.finished, synopsis: data.synopsis, notes: data.notes}).then(res=>res.data);
};