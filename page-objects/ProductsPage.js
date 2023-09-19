//Create a new Class - A conteiner for propperties and functions 
// I added the export keyword to make this class exportable

import { expect } from "@playwright/test"
import { Navigation } from "./Navigation" 
import { isDesktopViewPort } from "../utils/isDesktopViewPort"

export class ProductsPage {
    //Method    
    constructor(page){
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')//Add Product Button as a property of the constructor  
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    //Function
    visit = async () => {
        await this.page.goto("/")
    }

    

    addProductToBasket = async (index) => {
        const sprecificAddButton = this.addButtons.nth(index)
        await this.addButtons.nth(index).waitFor()
        await expect(sprecificAddButton).toHaveText("Add to Basket")
        
        //I will instance the method getBasketCount from the Navigation.js
        const navigation = new Navigation(this.page)
        
        // only desktop viewport
        let basketCountBeforeAdding
        if (isDesktopViewPort(this.page)){
            basketCountBeforeAdding = await navigation.getBasketCount()
        }
        
        await this.addButtons.nth(index).click()
        await expect(sprecificAddButton).toHaveText("Remove from Basket")
        if (isDesktopViewPort(this.page)){
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }
        
    }

    sortByCheapest = async () =>{
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts()
        //get order of products
        await this.sortDropdown.selectOption("price-asc")
        const productTitlesAfterSortign = await this.productTitle.allInnerTexts()

        expect (productTitlesAfterSortign).not.toEqual(productTitlesBeforeSorting)
        //get order of products
        // expect that these lists are different

        //await this.page.pause()
    }
}