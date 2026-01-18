##Description
This PR introduces a "Scroll to Top" button to improve navigation on long pages. The button becomes visible after the user scrolls down 400px and allows for a smooth scroll back to the top of the page.
This feature enhances usability, especially on mobile devices and content-heavy sections.

Fixes #86

##Type of change
  New feature (non-breaking change which adds functionality)
  UI/UX update (design changes, interface improvements)

##How Has This Been Tested?
I have manually verified the changes locally and performed automated browser testing.

Test Steps:

1.Visibility: Scrolled down the page (approx. 500px) and verified that the "Scroll to Top" button appears in the bottom-right corner.
2.Functionality: Clicked the button and confirmed that the page smoothly scrolls back to scrollY = 0.
3.Hiding: Verified that the button disappears when the page is at the top.
4.Responsiveness: Checked the button's appearance and position on different viewport sizes (including mobile simulations).

Screenshots/Video:
<img width="129" height="107" alt="Screenshot 2026-01-18 154054" src="https://github.com/user-attachments/assets/31acf1a9-f96d-427a-a67f-8016e912f2c4" />

<img width="1916" height="905" alt="Screenshot 2026-01-18 154028" src="https://github.com/user-attachments/assets/d26ceca4-051f-492e-b502-07592d7abc42" />


##Checklist:
 My code follows the style guidelines of this project
  I have performed a self-review of my own code
  I have commented my code, particularly in hard-to-understand areas
  My changes generate no new warnings
  I have added tests that prove my fix is effective or that my feature works
  New and existing unit tests pass locally with my changes
  I have checked my code and corrected any misspellings


##Maintainer Checklist
 closes #86
