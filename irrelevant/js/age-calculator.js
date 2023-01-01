//Birthday modal element
const birthdayModalElement = document.getElementById("modal");
const errorMsg = "❌That date is incomplete";

//YouTube video controls
const video = document.getElementById("birthday-video");
const playCommand = "&autoplay=1";
const playVideo = () => (video.src += playCommand);
const stopVideo = () => (video.src = video.src.replace(playCommand, ""));

/**
 * Access and hide the birthday modal window via a click event
 */
document.getElementsByClassName("close")[0].addEventListener("click", () => {
	birthdayModalWindow.hide();
});

/**
 * Calculates the years, months, and days the person has been alive for
 * @param {*} form The form containing the date-of-birth (dob) values
 * @returns An object containing the number of years, months, and days they user has been alive for
 */
const calculateAge = (form) => {
	//Error panel for showing an error in case the given dob is incomplete
	const errorPanel = document.getElementById("error-msg");

	if (!isValidDob(form)) {
        //Append the error message and show it to the user
        errorPanel.innerHTML = errorMsg;
		errorPanel.hidden = false;
		//Exit the function if dob is invalid
		return;
	} else errorPanel.hidden = true;

	//Find the current age based on the difference between 'now' & 'dob'
	const age = currentAge(form["day"].value, form["month"].value, form["year"].value);

	//Show the current age results to the user by appending the following html to the page
	let displayGrid = `   
        <h2 class="span-2">Your current age</h2>
        <label for="years">Years:</label>
        <output name="years" id="years">${age.Years}</output>
        <label for="months">Months:</label>
        <output name="months" id="months">${age.Months}</output>
        <label for="days">Days:</label>
        <output name="days" id="days">${age.Days}</output>
        `;

	document.getElementById("age-results").innerHTML = displayGrid;

	//If it's the users birthday, show the birthday song video
	if (isBirthday(form["month"].value, form["day"].value)) {
		// showBirthdayModal();
		birthdayModalWindow.show();
	}
};

/**
 * Checks if a dob form contains values
 * @param {*} form The form element containing the users dob
 * @returns True if all fields are supplied, false otherwise
 */
const isValidDob = (form) => {
    return [form["year"], form["month"], form["day"]].every((v) => v.value != "");
};

/**
 * A simple helper method to find the number of days in a given month (in the current year)
 * @param {*} month The month to assess
 * @returns The number of days in the given month
 */
const getDaysInMonth = (month) => {
	return new Date(new Date().getFullYear(), month, 0).getDate();
};

/**
 * Gets the current age by a given date of birth
 * @param {*} dd Day
 * @param {*} mm Month
 * @param {*} yyyy Year
 * @returns A result containing the years, months, and days a person has been alive
 */
const currentAge = (dd, mm, yyyy) => {
	const now = new Date().getTime();
	const dob = new Date(yyyy, mm - 1, dd).getTime();
	const diff = new Date(now - dob);

	const result = {
		Years: Math.abs(diff.getFullYear()) - 1970,
		Months: Math.abs(diff.getMonth()),
		//Bug: Days not being calculated correctly, some dates can see up to a 3 day variance and even a negative number
		Days: Math.abs(diff.getDate()) - 3,
	};

	return result;
};

/**
 * Check if today is the user's birthday
 * @param {*} month The user's birth month
 * @param {*} day The user's birth day (of the month)
 * @returns Returns true if the current month is equals to the dob month AND the current day is equal to the dob day
 */
const isBirthday = (month, day) => {
	const now = new Date();
	return month == now.getMonth() + 1 && day == now.getDate();
};

/**
 * An object that holds the only two functions required for the birthday video, show and hide
 */
let birthdayModalWindow = {
	//Set the modal display to make it visible, and start playing the video
	show: () => {
		birthdayModalElement.style.display = "flex";
		playVideo();
	},
	//Set the modal display to `none` to hide it, and stop playing the video
	hide: () => {
		birthdayModalElement.style.display = "none";
		stopVideo();
	},
};
