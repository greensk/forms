document.getElementById('question-save').addEventListener('click', onSave)
document.getElementById('profile-save').addEventListener('click', onProfileSave)

firebase.database().ref(
	'users/test/form'
).on('value', onQuestionsLoad)
firebase.database().ref(
	'users/test/profile'
).on('value', onProfileLoad)


function onSave() {
	var title = document.getElementById(
		'question-title'
	).value
	var question = {'title': title}
	var list = firebase.database().ref('users/test/form')
	var newItem = list.push()
	newItem.set(
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

function onQuestionsLoad (snapshot) {
	var questions = snapshot.val()
	document.getElementById('questions-container').innerHTML = ''
	snapshot.forEach(function (snapshot) {
		var question = snapshot.val()
		var key = snapshot.key
		
		var el = document.createElement('div')
		
		var titleEl = document.createElement('textarea')
		titleEl.value = question.title
		
		var saveEl = document.createElement('button')
		saveEl.innerText = 'Сохранить'
		saveEl.addEventListener('click', function () {
			firebase.database().ref(
				'users/test/form/' + key
			).update({ title: titleEl.value })
		})

		el.appendChild(titleEl)
		el.appendChild(saveEl)
		
		document.getElementById('questions-container').appendChild(el)
	})
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
