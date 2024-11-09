const puppeteer = require("puppeteer");
require("dotenv").config(); // This loads environment variables from the .env file

const videoURL = process.env.YOUTUBE_VIDEO_URL;
console.log("🚀 ~ videoURL:", videoURL);

async function openIncognitoTabs() {
  for (let i = 0; i < 10000; i++) {
    // Open 5 incognito browsers
    const browsers = [];
    for (let j = 0; j < 5; j++) {
      try {
        const browser = await puppeteer.launch({ headless: true }); // Launch the browser in non-headless mode for visibility
        browsers.push(browser);
        const page = await browser.newPage();
        await page.goto(videoURL); // Change to your desired URL
        // Wait for the Play button to be visible (adjust the selector if needed)
        await page.waitForSelector('[aria-label="Play"]', { visible: true });

        // Wait for the Play button to be visible (adjust the selector if needed)
        const playButton = await page.$('[aria-label="Play"]');

        // If the Play button exists, click it
        if (playButton) {
          console.log("Play button found, clicking...");
          await playButton.click();
        } else {
          console.log("Play button not found on this page");
        }
        console.log(`video  ${j + 1} Playing....`);
        if (j === 4) {
          const randomTimeout =
            Math.floor(Math.random() * (30000 - 10000 + 1)) + 10000;
          console.log(`Waiting for ${randomTimeout / 1000} seconds...`);
          // Wait for 30 seconds and close the browser after that
          await new Promise((resolve) => setTimeout(resolve, randomTimeout)); // Using Promise to wait for 30 seconds

          console.log(`${browsers.length} Browsers are closing.....`);
          await Promise.all(
            browsers.map(async (browser, index) => {
              await browser.close();
              console.log(`Browser No.${index + 1} closed`);
            })
          );
        }
      } catch (error) {
        console.log(`openIncognitoTabs  ${j + 1} ~ error`);
      }
    }
  }
}

openIncognitoTabs().catch(console.error);
