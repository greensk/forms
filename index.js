var ui = new firebaseui.auth.AuthUI(firebase.auth())
ui.start('#auth', {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: location.href
})
firebase.auth().onAuthStateChanged(onAuth);
function onAuth (user) {
	alert('Привет, ' + user.displayName)
}

// сипсок анкет
document.getElementById('open-profile-edit').addEventListener('click', onOpenProfileEdit)
function onOpenProfileEdit () {
	document.getElementById('profile-edit').classList.remove('hidden');
	document.getElementById('forms-list').classList.add('hidden');
}
firebase.database().ref('users').on('value', onFormsListLoaded)

function onFormsListLoaded (snapshot) {
	// очистка контейнера, чтобы заиписи не дублировались
	document.getElementById('forms-list-content').innerHTML = ''
	snapshot.forEach(addFormToList)
}

function addFormToList (snapshot) {	
	var form = snapshot.val()
	var el = document.createElement('div')
	el.classList.add('form-item')
	el.innerText = form.profile.about
	document.getElementById('forms-list-content').appendChild(el)
}


// редактирование профиля
document.getElementById('question-add').addEventListener('click', onQuestionAdd)
document.getElementById('profile-save').addEventListener('click', onProfileSave)
var userId = 'test'
firebase.database().ref(
	'users/' + userId + '/form'
).on('value', onQuestionsLoad)
firebase.database().ref(
	'users/' + userId + '/profile'
).on('value', onProfileLoad)


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
	document.getElementById('questions-container').innerHTML = ''
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
		
    document.getElementById('questions-container').appendChild(el)
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
