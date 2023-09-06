// Function to show the pop-up
function showPopUp() {
  Swal.fire({
    title: '🚨 Announcement 🚨',
text: `- We've removed the download function to protect content creators' rights.
- No more direct downloads.
- You can still stream our content.`,
type: 'info',
icon: 'info',
confirmButtonText: 'Confirm',
  }).then(() => {
      // Set a flag in local storage to indicate that the pop-up has been shown today
      var today = new Date().toLocaleDateString();
      localStorage.setItem("popUpLastShown", today);
  });

}

// Add an event listener to the "Show Announcement" button
var showPopUpButton = document.getElementById("showPopUp");
if (showPopUpButton) {
    showPopUpButton.addEventListener("click", function () {
        showPopUp();
    });
}
