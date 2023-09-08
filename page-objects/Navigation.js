
export class Navigation{

    constructor(page){
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutlink = page.getByRole('link', {name: 'Checkout'})
    }
    
    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        //Return number
        const text = await this.basketCounter.innerText()
        // "0" -> 0
        return parseInt(text, 10)
    }

    goToCheckout = async () => {
        await this.checkoutlink.waitFor()
        await this.checkoutlink.click()
        await this.page.waitForURL("/basket")
    }
}