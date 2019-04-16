firebase.auth().onAuthStateChanged(onAuth)
var userId
function onAuth (user) {
	if (user) {
		userId = user.uid
	}
	var router = new Navigo(null, true)
	router.on(showMainPage)
	router.on('/auth', showAuthPage)
	router.on('/profile', showProfilePage)
	router.resolve()

	document.getElementById('go-auth-page').addEventListener('click', goToAuthPage)

	function goToAuthPage () {
		router.navigate('/auth')
	}

}
