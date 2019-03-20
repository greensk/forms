// Фрагмент №4
// Добавить запись в список
var path = 'some/list'

var list = firebase.database().ref(path)
var newItem = list.push()
var newKey = newItem.key

document.getElementById('new-item-save-button').addEventListener(onSave)

function onSave () {
	showLoadingIndicator()
	var newValue = 'some new value'
	firebase.database().ref(path + '/' + newKey).set({ value: newValue, onSaved })
}

function onSaved (err) {
	if (err) {
		showErrorMessage(err)
	}
	hideLoadingIndicator()
}
