const puppeteer = require("puppeteer");
const timeOut = 1000;
let page = null;
let browser = null;
const {
    users,
    videos: ytVideos,
    comments
} = require('./randomUsers');
// const loginUrl = 'https://sabre-chat.herokuapp.com/login';
const loginUrl = 'http://localhost:3000/login';
// console.log(users);

const user = users[Math.floor(Math.random() * 4)]
// console.log(user);

const login = async () => {
    // EMAIL INPUT
    await page.waitForSelector('input[name="email"]');
    await page.waitForTimeout(timeOut);
    await page.type('input[name="email"]', user.email, {
        delay: 5,
    });
    // PASSWORD INPUT
    await page.waitForSelector('input[name="password"]');
    await page.waitForTimeout(timeOut);
    await page.type('input[name="password"]', "Test123", {
        delay: 5,
    });
    // SUBMIT
    await page.click('button[type="submit"]');
    await page.waitForTimeout(timeOut);
    // CHECK IF PAGE WAS REDIRECTED
    if (page.url() == loginUrl) {
        await page.click('button[type="button"]');
        await signUp()
    } else {
        console.log('logged in');
    }
    doSomething()
    // await page.waitForTimeout(timeOut);
}

const doSomething = () => {
    let theDecider = Math.floor(Math.random() * 3);

    // For testing
    theDecider = 0;

    switch (theDecider) {
        case 0:
            postComment()
            break;
        case 1:
            postVideo()
            break;
        default:
            console.log("Something went wrong");
            break;
    }
}

const signUp = async () => {
    await page.waitForSelector('input[name="username"]');
    await page.waitForTimeout(timeOut);
    await page.type('input[name="username"]', user.name, {
        delay: 5,
    });
    await page.waitForSelector('select[name="beltColor"]');
    await page.waitForTimeout(timeOut);
    await page.type('select[name="beltColor"]', user.belt, {
        delay: 5,
    });
    await page.waitForSelector('select[name="whatGym"]');
    await page.waitForTimeout(timeOut);
    await page.type('select[name="whatGym"]', user.gym, {
        delay: 5,
    });
    await page.waitForSelector('input[name="email"]');
    await page.waitForTimeout(timeOut);
    await page.type('input[name="email"]', user.email, {
        delay: 5,
    });

    await page.waitForSelector('input[name="password1"]');
    await page.waitForTimeout(timeOut);
    await page.type('input[name="password1"]', "Test123", {
        delay: 5,
    });

    await page.waitForSelector('input[name="password2"]');
    await page.waitForTimeout(timeOut);
    await page.type('input[name="password2"]', "Test123", {
        delay: 5,
    });

    console.log(page.url());
    await page.click('button[type="submit"]');
    doSomething()
}

const postComment = async () => {
    await page.waitForTimeout(timeOut);
    try {
        await page.evaluate(() => {
            console.log(comments);
            let buttons = Array.from(document.querySelectorAll('button.mt-3'));
            // page.click(buttons[Math.floor(Math.random() * (buttons.length() + 1))]);
            buttons.forEach(button => button.click())
        })
    } catch (error) {
        console.log(error);
    }
    await page.waitForTimeout(timeOut);
    await page.evaluate((comments) => {
        console.log(comments);
        let postToCommentOn = Math.floor(Math.random() * 4)
        let commentAreas = Array.from(document.querySelectorAll('textarea[placeholder="Comment"]'));
        let submitCommentBtns = Array.from(document.querySelectorAll('button.btn-primary'));
        commentAreas[postToCommentOn].type(comments[Math.floor(Math.random() * (comments.length + 1))]);
        submitCommentBtns[postToCommentOn].click()
    }, comments)

}

const postVideo = async () => {
    await page.goto('https://sabre-chat.herokuapp.com/new-post', {
        waitUntil: "networkidle2",
    });

    // randomly selects youtube video from list and posts it to forum
    await page.type('textarea[id="floatingTextarea2"]', ytVideos[Math.floor(Math.random() * (ytVideos.length + 1))], {
        delay: 5,
    });
    await page.click('button[type="button"]');

}

const findYTVideo = async () => {
    await page.goto("https://www.youtube.com/results?search_query=jiu+jitsu")
    // await page.waitForSelector('a[class="yt-simple-endpoint"]');
    const button = await page.evaluateHandle(() =>
        document.querySelector('div[class="ytd-grid-video-renderer"]')
    );
    await button.click();
    console.log(button);
}

browser = puppeteer.launch({
        headless: false
    })
    .then(async (browser) => {

        page = await browser.newPage();
        page.setViewport({
            width: 1280,
            height: 800,
            isMobile: false,
        });
        page.goto(loginUrl, {
            waitUntil: "networkidle2",
        });
        login().then(() => console.log('DONE'))
    })
    .catch((error) => {
        console.log(error)
    })