var userId = null
var router = new Navigo(null, true)
router.on(showMainPage)
router.on('/auth', showAuthPage)
router.on('/profile', showProfilePage)

firebase.auth().onAuthStateChanged(onAuth);
function onAuth (user) {
	if (user !== null) {
		userId = user.uid
	}
	router.resolve()
}

document.getElementById('go-auth-page').addEventListener('click', goToAuthPage)

function goToAuthPage () {
	router.navigate('/auth')
}
