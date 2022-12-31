const MAX_VERSION_SEGMENTS = 3;
const VERSION_SEPARATOR = ".";
const RELEASE_SEPARATOR = "-";
const ASCII_CHAR_OFFSET = 97;
const ALPHABET_LAST_INDEX = 23;
const FALLBACK_PRE_RELEASE = "RELEASE";
const BUTTON_LABEL_DELAY = 2000;
const REGEX_HAS_NO_PRE_RELEASE = /^\d+(\.\d+)*$/gm;
const REGEX_HAS_PRE_RELEASE = /^\d+(\.\d+)*-\w+/gm;
const REGEX_ILLEGAL_COMBO = /^(?=.*[a-zA-Z])((?!-).)*$|(?:[a-zA-Z]).*[-]/gm;
const GREEK_ALPHABET = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa", "Lambda", "Mu", "Nu", "Xi", "Omicron", "Pi", "Rho", "Sigma", "Tau", "Upsilon", "Phi", "Chi", "Psi", "Omega"];

class Version {
	major = 0;
	minor = 0;
	patch = 0;
	preRelease = -1;
}

/**
 * Get the Greek alphabet letter for a given index number
 * @param {*} number The index number
 * @returns The name of the corresponding Greek alphabet letter
 */
const getGreekAlphabetNameByNumber = (number) => {
	return number >= 0 && number <= ALPHABET_LAST_INDEX
		? //Return alphabet value if within bounds
		  GREEK_ALPHABET[number]
		: //Return fallback pre-release name
		  FALLBACK_PRE_RELEASE;
};

let givenVersion = new Version();

const majorElem = document.getElementById("major"),
	minorElem = document.getElementById("minor"),
	patchElem = document.getElementById("patch"),
	preReleaseElem = document.getElementById("pre-release"),
	resultElem = document.getElementById("result");

/**
 * Updates the web UI with the current given version data
 */
const updateUI = () => {
	//Assign the version segments to their elements - zero if not a number
	majorElem.value = givenVersion.major;
	minorElem.value = givenVersion.minor;
	patchElem.value = givenVersion.patch;
	preReleaseElem.value = givenVersion.preRelease != -1 ? getGreekAlphabetNameByNumber(givenVersion.preRelease) : null;

	//Setup result strings both with and without a pre-release
	const resultWithoutPreRelease = majorElem.value + VERSION_SEPARATOR + minorElem.value + VERSION_SEPARATOR + patchElem.value,
		resultWithPreRelease = majorElem.value + VERSION_SEPARATOR + minorElem.value + VERSION_SEPARATOR + patchElem.value + RELEASE_SEPARATOR + preReleaseElem.value;

	//Display the resulting version number
	resultElem.value = (givenVersion.preRelease >= 0 ? resultWithPreRelease : resultWithoutPreRelease).toLowerCase();
};

/**
 * Fires each time a key is pressed (released) in the 'current version' input field
 */
document.getElementById("current-version").addEventListener("keyup", (event) => {
	let input = event.target.value;

	//Catch invalid entries and activate the invalid CSS class
	if (input.match(REGEX_ILLEGAL_COMBO)) {
		document.getElementById("current-version").classList.add("invalid");
		return false;
	} else document.getElementById("current-version").classList.remove("invalid");

	let preReleaseName = null;

	if (input.match(REGEX_HAS_PRE_RELEASE)) {
		//Capture the pre-release name
		let parts = input.split(RELEASE_SEPARATOR);
		preReleaseName = parts[1];

		//Strip the pre-release name from the input string
		input = input.replace(/-\w+/gi, "");
	} else if (REGEX_HAS_NO_PRE_RELEASE) {
		//Remove any trailing "-" characters
		input = input.replace(/-/g, "");
	}

	const versionSegments = input.split(VERSION_SEPARATOR, MAX_VERSION_SEGMENTS);

	//trim the last segment if empty
	let lastSegment = versionSegments[versionSegments.length - 1];
	if (lastSegment == "" || lastSegment == RELEASE_SEPARATOR) versionSegments.pop();

	//Set values
	givenVersion.preRelease = preReleaseName ? preReleaseName.toLowerCase().charAt(0).charCodeAt(0) - ASCII_CHAR_OFFSET : -1;
	givenVersion.major = Number(versionSegments.length >= 1 ? versionSegments[0] : 0);
	givenVersion.minor = Number(versionSegments.length >= 2 ? versionSegments[1] : 0);
	givenVersion.patch = Number(versionSegments.length >= 3 ? versionSegments[2] : 0);

	updateUI();
});

/**
 * Handle checkbox events
 */
document.addEventListener("click", (event) => {
	switch (event.target.id) {
		case "checkbox1": // Backwards incompatible changes were made to the API?
			givenVersion.major += event.target.checked ? 1 : -1;
			break;
		case "checkbox2": // Backwards compatible changes were made to the API?
		case "checkbox3": // Was the public API marked as deprecated?
			givenVersion.minor += event.target.checked ? 1 : -1;
			break;
		case "checkbox4": // Were any backwards compatible bug fixes introduced?
			givenVersion.patch += event.target.checked ? 1 : -1;
			break;
		case "checkbox5": // Is this version potentially instable?
			const withinRange = givenVersion.preRelease >= -1 && givenVersion.preRelease < ALPHABET_LAST_INDEX;
			if (event.target.checked) {
				givenVersion.preRelease += withinRange ? 1 : 0;
			} else {
				givenVersion.preRelease += withinRange + 1 ? -1 : 0;
			}
			break;
	}
	updateUI();
});

/**
 * Copy the result text to the clipboard
 */
document.getElementById("copy-button").addEventListener("click", () => {
	const resultField = document.getElementById("result");

	resultField.select();
	resultField.setSelectionRange(0, 99999);

	navigator.clipboard.writeText(resultField.value);

	const copyButton = document.getElementById("copy-button");

	copyButton.innerHTML = "Copied " + resultField.value + "!";
	setTimeout(() => (copyButton.innerHTML = "Copy Version Number"), BUTTON_LABEL_DELAY);
});
