var ui = new firebaseui.auth.AuthUI(firebase.auth())

function showAuthPage () {
	document.getElementById('content').innerHTML = ''
	setTimeout(function () {
		ui.start(document.getElementById('content'), {
		  signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		  ],
		  signInSuccessUrl: 'http://' + location.hostname + '#/profile'
		})
	},0 )
}
