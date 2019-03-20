// Фрагмент №1
// Загрузка одной записи из БД и вывод на странице
var path = 'users/test/profile'
firebase.database(path).ref().on('value', onSomehtingLoad)

onSomehtingLoad (snapshot) {
	var record = snapshot.val()
	document.getElementById('some-id').innerText = record.someText
}
