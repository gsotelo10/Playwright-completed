import { test } from "@playwright/test"
import { MyAccountPage } from "../page-objects/MyAccountPage"
import { getLoginToken } from "../api-calls/getLoginToken"
import { adminDetails } from "./../Data/userDetails"



test("My Account using cookie injection and mocking network request", async ({ page }) => {
    
    await page.route("**/api/user**", async (route, request) => {
        await route.fulfill({
            status: 500, 
            contentType: "application/json",
            body: JSON.stringify({message: "PLAYRIGHT ERROR FROM MOCKING"}),
        })
        
    })


    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    const myAccount = new MyAccountPage(page)
    await myAccount.visit()

    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    await myAccount.visit()
    await myAccount.waitForErrorMessage()

})