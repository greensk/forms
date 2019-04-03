function showMainPage () {
	document.getElementById('content').innerHTML = ''
	firebase.database().ref('users').on('value', onFormsListLoaded)
}

function onOpenProfileEdit () {
	document.getElementById('profile-edit').classList.remove('hidden');
	document.getElementById('forms-list').classList.add('hidden');
}


function onFormsListLoaded (snapshot) {
	// очистка контейнера, чтобы заиписи не дублировались
	document.getElementById('content').innerHTML = ''
	snapshot.forEach(addFormToList)
}

function addFormToList (snapshot) {	
	var form = snapshot.val()
	var el = document.createElement('div')
	el.classList.add('form-item')
	el.innerText = form.profile.about
	document.getElementById('content').appendChild(el)
}
