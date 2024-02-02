const express = require('express');
const { chromium } = require('playwright');
const path = require('path');
const app = express();
const port = 3000;

app.get('/image-source/:animal', async (req, res) => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const animalName = req.params.animal;
    console.log(`https://www.google.com/search?q=${animalName}&tbm=isch`);
    await page.goto(`https://www.google.com/search?q=${animalName}&tbm=isch`);
    // waits for the page to entirely load
    await page.waitForLoadState('load');
    console.log("page loaded");        

    // Use page.$() to get the first matching element of an css class name
    // Use page.$$() to get multiple matching elements of an css class name  
    const imageElements = await page.$$('.rg_i.Q4LuWd');

    random_index = Math.floor(Math.random()*5);

    if (imageElements.length > 0) {
        await imageElements[random_index].click();
        await page.waitForLoadState('load');
        console.log("found high res image");
        const src = await page.locator('.sFlh5c.pT0Scc.iPVvYb').getAttribute('src');
        await browser.close();
        res.send(src);
    } else {
        await browser.close();
        res.send("error")
    }
    
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
