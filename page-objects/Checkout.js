import { expect } from "@playwright/test"
export class Checkout {
    constructor(page){
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]') 
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
        
    }
    removeCheapestProduct = async () => {
        //identificamos el primer item de la lista
        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count()
        await this.basketItemPrice.first().waitFor()

        //El método InnerText() en Playwright se utiliza para recuperar el texto visible de un elemento web y sus subelementos
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        
        //[ '499$', '599$', '320$' ] -> [499, 599, 320]
        const justNumbers =  allPriceTexts.map((element) => {
            const withOutDollarSign = element.replace("$", "") //'499$' -> '499'
            return parseInt(withOutDollarSign, 10)
        })

        const smallesPrice = Math.min(justNumbers)
        const smallesPriceIdx = justNumbers.indexOf(smallesPrice)
        const specificRemoveBotton =  this.basketItemRemoveButton.nth(smallesPriceIdx)
        await specificRemoveBotton.waitFor()
        await specificRemoveBotton.click()
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)

        //console.warn({allPriceTexts})
        //console.warn({justNumbers})
        //await this.page.pause()
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()
        await this.page.waitForURL(/\/login/, {timeout: 3000}) //Use Regular expresion para la direccion del login: http://localhost:2221/login?redirect=/delivery-details
    }
}