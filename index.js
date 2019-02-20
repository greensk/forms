document.getElementById('question-save').addEventListener('click', function () {
	var title = document.getElementById('question-title').value;
	var question = {'title': title};
	firebase.database().ref('users/test/form/1').set(question);
});
