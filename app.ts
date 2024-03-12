import puppeteer, { Puppeteer, Browser, Page } from "puppeteer"
import { config, TO_BUSINESS, URL } from "./config"

const app = async (b: Promise<Browser>, list: Array<Record<string, number>> = []) => {
    const browser = (await b)
        list.forEach(async (item, idx) => {
            console.log(item)
            const pages = await browser.pages()
            const page = pages.at(idx) ?? await browser.newPage()
            await page.goto(URL, {
                'waitUntil': 'networkidle0'
            })

            await page.waitForSelector("body")

            const list = await page.$$("form")
            await list[TO_BUSINESS].$eval("input[name='SinkiYudo'", el => el.click())

            page.on("dialog", async dialog => {
                await dialog.accept()
            })

            page.on("load", async () => {
                try {
                    const apply = await page.$("[alt='お申込みはこちら']")
                    console.log(apply)
                    if(apply === null) {
                        const pageName = await page.$eval("p.MT20", el => el.innerText)
                        if(pageName) {
                            const pageNo = pageName.split(":").at(1)
                            if(pageNo) {
                                console.log(pageName)
                            }
                        }
                    }else{
                        apply.click()
                    }
                }catch(e) {
                    console.log(e)
                }
            })
        });
}

const list = [{"a":1}]

try {
    app(puppeteer.launch(config), list)
} catch (e) {
    console.log(e)
}
