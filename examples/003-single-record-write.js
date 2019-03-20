// Фрагмент №3
// Записать единичную запись
var path = 'some/record/id'

document.getElementById('save-record-button').addEventListener('click', onUpdate)

function onUpdate () {
	showLoadingIndicator()
	var newValue = 'some new value'
	firebase.database().ref(path).set({ value: newValue }, onSaved)
}
function onSaved (err) {
	if (err) {
		showErrorMessage(err)
	}
	hideLoadingIndicator()
}
