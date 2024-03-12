import { PuppeteerLaunchOptions } from "puppeteer"
import { BussinessEnum } from "./enum"

export const config: PuppeteerLaunchOptions = {
    executablePath: "",
    ignoreHTTPSErrors: true,
    headless: false,
    devtools: true,
    slowMo: 20,
    defaultViewport: {
        width: 960,
        height: 860
    }
}

export const URL = "https://www.tnet2-branche.ms-ins.com/servlet/scy/html/ol_usr_top.html"
export const TO_BUSINESS = BussinessEnum.direct