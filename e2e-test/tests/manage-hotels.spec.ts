import { test, expect } from '@playwright/test';
import path from 'path';

const UI_URL = "http://localhost:5173/"

test.beforeEach(async({ page })=>{
    await page.goto(UI_URL);

    //get the sign in button
    await page.getByRole("link", { name: "Sign in" }).click();
  
    await expect(page.getByRole("heading",{ name: "Sign In" })).toBeVisible();
  
    await page.locator("[name=email]").fill("user11@gmail.com");
    await page.locator("[name=password]").fill("qwerty");
  
    await page.getByRole("button", { name: "Login" }).click();
  
    await expect(page.getByText("SignIn successful")).toBeVisible();
  
});

test("should allow user to add a hotel", async({ page }) =>{
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator("[name=name]").fill("Test Hotel");
    await page.locator("[name=city]").fill("Test City");
    await page.locator("[name=country]").fill("Test Country");
    await page.locator("[name=description]").fill("This description for the test hotel");
    await page.locator("[name=pricePerNight]").fill("100");
    await page.selectOption('select[name="starRating"]', "3");


    await page.getByText("Budget").click();


    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();

    await page.locator("[name=adultCount]").fill("2");
    await page.locator("[name=childCount]").fill("2");

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpg"),
        path.join(__dirname, "files", "2.jpeg"),
      ]);
    
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();
});


test("should display hotels", async ({ page }) =>{
    await page.goto(`${UI_URL}my-hotels`);

    await expect(page.getByText("Dublin")).toBeVisible();
    await expect(page.getByText("This description for the test hotel").nth(0)).toBeVisible();

    await expect(page.getByText("Test City, Test Country").nth(0)).toBeVisible();
    await expect(page.getByText("Budget").nth(0)).toBeVisible();
    await expect(page.getByText("₹100 per night").nth(0)).toBeVisible();
  
    await page.waitForSelector('text="2 adults, 2 children"', { state: 'visible' });
    await expect(page.getByText("3 Star Rating").nth(0)).toBeVisible();

    await expect(page.getByRole("link",{name: "View Details"}).first()).toBeVisible();
    await expect(page.getByRole("link",{name: "Add Hotel"})).toBeVisible();
});
test("should edit hotel", async ({ page }) =>{
    await page.goto(`${UI_URL}my-hotels`);

    await page.getByRole("link", { name: "View Details" }).first().click();

    await page.waitForSelector('[name="name"]',{ state: "attached" });
    await expect(page.locator('[name="name"]')).toHaveValue('Dublin');
    await page.locator('[name="name"]').fill("Dublin Coast");
    await page.getByRole("button",{ name: "Save"}).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();

    await page.reload();

    await expect(page.locator('[name="name"]')).toHaveValue("Dublin Coast");

    await page.locator('[name="name"]').fill("Dublin");

    await page.getByRole("button",{ name: "Save" }).click();
})