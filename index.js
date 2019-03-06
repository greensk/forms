document.getElementById('question-save').addEventListener('click', onSave)
document.getElementById('profile-save').addEventListener('click', onProfileSave)

firebase.database().ref(
	'users/test/form/1'
).on('value', onLoad)
firebase.database().ref(
	'users/test/profile'
).on('value', onProfileLoad)


function onSave() {
	var title = document.getElementById(
		'question-title'
	).value
	var question = {'title': title}
	firebase.database().ref(
		'users/test/form/1'
	).set(
		question,
		onSaveComplete
	)
	document.getElementById('loader').setAttribute(
		'style',
		'display: block'
	)
}

function onProfileSave() {
	var about = document.getElementById(
		'profile-about'
	).value
	var profile = {'about': about}
	firebase.database().ref(
		'users/test/profile'
	).set(
		profile,
		onSaveComplete
	)
	document.getElementById('loader').setAttribute(
		'style',
		'display: block'
	)
}

function onLoad (snapshot) {
	var question = snapshot.val()
	document.getElementById('question-title').value = question.title
}

function onProfileLoad (snapshot) {
	var profile = snapshot.val()
	if (profile) {
		document.getElementById('profile-about').value = profile.about
	}
}

function onSaveComplete(err) {
	if (err) {
		document.getElementById('message').innerText = 'Ошибка при сохранении'
	} else {
		document.getElementById('message').innerText = 'Сохранено!'
	}
	document.getElementById('loader').setAttribute(
		'style',
		''
	)
}
