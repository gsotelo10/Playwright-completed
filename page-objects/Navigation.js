import { isDesktopViewPort } from "../utils/isDesktopViewPort"

export class Navigation{

    constructor(page){
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutlink = page.getByRole('link', {name: 'Checkout'})
        this.mobileBurgerButton = page.locator('[data-qa="burger-button"]')
    }
    
    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        //Return number
        const text = await this.basketCounter.innerText()
        // "0" -> 0
        return parseInt(text, 10)
    }

    goToCheckout = async () => {
        //if mobile viewport, first open the burger menu
        // ! = is the logical “not” operator
        // true if desktop
        // false if mobile -> reverse false -> !false === true

        if (!isDesktopViewPort(this.page)) { 
            await this.mobileBurgerButton.waitFor()
            await this.mobileBurgerButton.click()
        }
       

        await this.checkoutlink.waitFor()
        await this.checkoutlink.click()
        await this.page.waitForURL("/basket")
    }
}