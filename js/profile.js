function showProfilePage () {
	document.getElementById('content').innerHTML = ''
	
	var addQuestionButton = document.createElement('button')
	addQuestionButton.innerText = 'Добавить вопрос'
	addQuestionButton.addEventListener('click', onQuestionAdd)
	document.getElementById('content').appendChild(addQuestionButton)
	
	var questionsList = document.createElement('div')
	questionsList.setAttribute('id', 'questions-list')
	document.getElementById('content').appendChild(questionsList)
	
	firebase.database().ref(
		'users/' + userId + '/form'
	).on('value', onQuestionsLoad)
	firebase.database().ref(
		'users/' + userId + '/profile'
	).on('value', onProfileLoad)
}

function onSave() {
	var title = document.getElementById(
		'question-title'
	).value
	var question = {'title': title}
	var list = firebase.database().ref('users/' + userId + '/form')
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
		'users/' + userId + '/profile'
	).set(
		profile,
		onSaveComplete
	)
	document.getElementById('loader').setAttribute(
		'style',
		'display: block'
	)
}

function onQuestionAdd () {
    var newQuestion = firebase.database().ref('users/' + userId + '/form').push()
    var key = newQuestion.key
    createQuestionInForm(key, {title: ''})
}

function onQuestionsLoad (snapshot) {
	var questions = snapshot.val()
	document.getElementById('questions-list').innerHTML = ''
	snapshot.forEach(function (snapshot) {
		var question = snapshot.val()
		var key = snapshot.key
		createQuestionInForm(key, question)
	})
}

function createQuestionInForm (key, question) {
    var el = document.createElement('div')
		
    var titleEl = document.createElement('textarea')
    titleEl.value = question.title
		
    var saveEl = document.createElement('button')
    saveEl.innerText = 'Сохранить'
    saveEl.addEventListener('click', function () {
        firebase.database().ref(
            'users/' + userId + '/form/' + key
        ).update({ title: titleEl.value })
    })
	
	var removeEl = document.createElement('button')
	removeEl.innerText = 'Удалить'
	removeEl.addEventListener('click', function () {
		firebase.database().ref(
            'users/' + userId + '/form/' + key
        ).remove()
	})

    el.appendChild(titleEl)
    el.appendChild(saveEl)
	el.appendChild(removeEl)
		
    document.getElementById('questions-list').appendChild(el)
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
