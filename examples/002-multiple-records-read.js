// Фрагмент №2
// Загрузка списка записей из БД и вывод на странице
var path = 'users/test/profile'
firebase.database().ref(path).on('value', onSomehtingLoaded)

onSomehtingLoaded (snapshot) {
	var record = snapshot.val()
	document.getElementById('some-id').innerText = record.someText
	snapshot.forEach(onSingleSomethingLoaded)
}

onSingleSomethingLoaded (snapshot) {
	// очистка контейнера, чтобы заиписи не дублировались
	document.getElementById('some-container').innerHTML = ''
	
	var record = snapshot.val()
	var el = document.createElement('div')
	el.innerText = record.someText
	document.getElementById('some-container').appendChild(el)
}
