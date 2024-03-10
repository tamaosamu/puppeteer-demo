const puppeteer = require("puppeteer")

const URL = "https://www.tent3.ms-ins.com/links.html"
const TOP_URL = "https://www.tnet2-branche.ms-ins.com/servlet/scy/html/ol_usr_top.html"

const TO_TOP_PAGE = "[target='ms_cycle_1']"

const TO_HOME_PAGE_FORM_NAME = "form1"
const TO_HOME_PAGE_FORM_INDEX = 1

const PAGE_S040 = {

}

const typeObject = [
    ["P1", "P2", "P3"],
    ["C1", "C2", "C3"],
    ["F1", "F2", "F3"],
    ["T1", "T2", "T3"]
]

const TYPE_ACT = "P1"

postData = {
    //userId: "jcb_test_005@it.com",
    userId: "",
    password: "pw12345",
    kanji_name_s: "桜",
    kanji_name_e: "更新一",
    kana_name_s: "サクラ",
    kana_name_e: "コウシンイチ",
    birthday: [""],
    isSame: true
}

const iPhone = puppeteer.KnownDevices['Pixel 5'];

const page1 = async (page) => {
    await page.waitForNavigation()
    await page.screenshot({path: '①.png', fullPage: true})
    await page.click('a.goCYS0020')
}

const page2 = async (page) => {
    // await topPage.click("#app")
    // await topPage.waitForNavigation()
    await page.waitForSelector("#elmContainer", {
        visible: true,
    })
    await page.screenshot({path: '②.png', fullPage: true})
    // await topPage.click(".submit a")
    await page.click("#goCYS0040_KYOTSUKA")
}

// 保険期間
const hokenDate = {
    month: 4,
    day: 1
}

const page3 = async (page, params) => {
    await page.waitForSelector("#elmContainer", {
        visible: true,
    })
    await page.$eval("[name='elm_hkn_kaisi_mm']", el => el.value = '4')
    await page.$eval("[name='elm_hkn_kaisi_dd']", el => el.value = '1')

    // 阅读PDF
    await page.click("#showPDF")
    const frame = await page.waitForSelector('#fancybox-frame', {
        visible: true
    })
    const frameContent = await frame.contentFrame()
    await frameContent.waitForSelector('#container', {
        visible: true
    })
    await page.$eval("#fancybox-close", el => {
        el.click()
    })
    
    await page.click("#elm_notice1_flg_1")
    await page.click("#elm_notice2_flg_1")
    await page.click("#elm_question1_flg_0")
    await page.click('#elm_agreeRule_flg_1')
    await page.$eval("#elm_ikou_flg", el => el.click())

    await page.screenshot({path: '③.png', fullPage: true})
    await page.click("#goCYS0050")
}

const page4 = async (page) => {
    await page.waitForSelector("#elmContainer", {
        visible: true,
    })
    // tab1 1 4 7 10
    // tab2 2 5 8 11
    // tab3 3 6 9 12
    await page.click("a[href='#tab2']")
    await page.click('#radio5')

    await page.screenshot({path: '④.png', fullPage: true})
    await page.click('#goCYS0080')
}

const page5 = async (page, data) => {
    await page.waitForSelector("#elmContainer", {
        visible: true,
    })

    await page.type("#elm_KYK_MAIL", data.userId)
    await page.type("#elm_KYK_MAIL_KAKUNIN",data.userId)
    await page.click("#elm_HIHO_KAKUNIN_FLG_1")

    await page.type("#elm_KYK_YUBIN_NO", "1140011")
    await page.click("a#searchAddress_1")
    await page.waitForSelector("#addressTable", {
        visible: true
    })
    await page.$$eval("#addressTable a", el => {
        el[0].click()
    })

    await page.type("#elm_KYK_ADRS_KANJI_2", "秋葉原")
    await page.type("#elm_KYK_ADRS_KANA_2", "アキハバラ")

    await page.type("#elm_KYK_NAME_SEI_KANJI", "漢")
    await page.type("#elm_KYK_NAME_MEI_KANJI", "字")
    await page.type("#elm_KYK_NAME_SEI_KANA", "カン")
    await page.type("#elm_KYK_NAME_MEI_KANA", "ジ")

    await page.type("#elm_KYK_TEL_1", "090")
    await page.type("#elm_KYK_TEL_2", "1234")
    await page.type("#elm_KYK_TEL_3", "5678")
    await page.click("#elm_KYK_SEIBETU_1")
    
    // https://zh.calc-site.com/calendars/age_list
    // 22岁 - 1 岁 = 21岁 （平成15年）2003
    // 23岁 - 1 岁 = 22岁 （平成14年）2002
    await page.select('#elm_KYK_BIRTH_GG', 'H')
    await page.type("#elm_KYK_BIRTH_YY", '15')
    await page.type("#elm_KYK_BIRTH_MM", '1')
    await page.type("#elm_KYK_BIRTH_DD", '1')

    await page.click("#idno")
    await page.waitForSelector("#newuser", {
        visible: true,
    })

    await page.type("input[name='elm_user_hon_pw']", "pw12345")
    await page.type("input[name='elm_user_kakunin_pw']", "pw12345")
    await page.click("#elm_mail_9")
    await page.type("#elm_user_id_sinki", data.userId)
    await page.screenshot({path: '⑤.png', fullPage: true})
    await page.click('#goCYS0090')
}

const page6 = async (page) => {
    await page.waitForSelector("#elmContainer", {
        visible: true,
    })

    // await page.click("input#checkbox")
    // await page.click("#checkbox2")
    await page.$eval("input#checkbox", el => el.click())
    await page.$eval("input#checkbox2", el => el.click())

    await page.screenshot({path: '⑥.png', fullPage: true})
    await page.click("#goCYS0100")
}

const page7 = async (page) => {
    await page.waitForSelector("#elmContainer", {
        visible: true
    })
    await page.waitForSelector("#mainContents", {
        visible: true
    })
    
    //elm_CARD_NO_1 elm_CARD_NO_2 elm_CARD_NO_3 elm_CARD_NO_4
    // await page.type("#elm_CARD_NO_1", "5222")
    // await page.type("#elm_CARD_NO_2", "2222")
    // await page.type("#elm_CARD_NO_3", "2222")
    // await page.type("#elm_CARD_NO_4", "2227")

    //elm_CARD_KIGEN_MM
    // await page.select("#elm_CARD_KIGEN_MM", "09")

    //elm_CARD_KIGEN_YY
    // await page.select("#elm_CARD_KIGEN_MM", "2033")

    //elm_securityCode
    // await page.type("#elm_securityCode", "123")

    //elm_CARD_SYURUI_CHECK_0
    // await page.$eval("#elm_CARD_SYURUI_CHECK_0", el => el.click())
    
    //elm_CARD_NAME_CHECK_0
    // await page.$eval("#elm_CARD_NAME_CHECK_0", el => el.click())

    await page.screenshot({path: '⑦.png', fullPage: true})
    // await page.click("#goCYS0110")
}

const main = async() => {

    const timestamp = new Date().getTime();
    if(postData.userId === '') {
        const userId = "jcb_test_" + timestamp + "@it.com"
        postData.userId = userId
    }

    // const browser = await puppeteer.launch({
    //     headless: false,
    //     slowMo: 200,
    //     args: []
    // })

    const b = await puppeteer.launch({
        executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        ignoreHTTPSErrors: true,
        devtools: true,
        headless: false,
        slowMo: 50
    })



    let page = await b.newPage()
    
    // 打开启动页面
    await page.goto(URL, {
        'waitUntil': 'networkidle0'
    })


    // 进入页面
    await page.$eval(TO_TOP_PAGE, (el => {
        el.click()
    }))

    const target = await b.waitForTarget(t => t.url() == TOP_URL)
    const topPage = await target.page()
    await topPage.emulate(iPhone)

    await topPage.screenshot({path: 'test.png'})

    const form1List = await topPage.$$("[name='"+ TO_HOME_PAGE_FORM_NAME +"']")

    // to new page
    await form1List[TO_HOME_PAGE_FORM_INDEX].$eval("input[name='SinkiYudo']", (el) => {
        el.click()
    })

    // 监听dialog事件，捕获后自动确认
    topPage.on("dialog", async dialog => {
        await dialog.accept()
    })


    await page1(topPage)
    await page2(topPage)
    await page3(topPage, hokenDate)
    await page4(topPage)
    await page5(topPage, postData)
    await page6(topPage)
    await page7(topPage)
    return

}

main()
