import { puppeteer as _puppeteer, executablePath as _executablePath } from "chrome-aws-lambda";

async function isNFTPFP() {
    try {
        (async () => {
            const browser = await _puppeteer.launch({
                headless: false,
                executablePath: await _executablePath
            });
            // todo: check twitter page of user
            const page = await browser.newPage();
            await page.goto('https://twitter.com/_soulninja');
            await page.screenshot({ path: 'example.png' });
            
            await browser.close();
        })();
    } catch (error) {
        console.log(error);
    }
}

export default isNFTPFP;
