import { test } from '@playwright/test';
import { waitForAllEvents } from '../utils/waitUtils';
import { OrderFlow } from '../flows/orderFlow';
import { Basket } from '../data-types/basket';
import { TestTag } from '../data-types/enums';

test.describe('TS-01 Product order tests', async () => {
  let orderFlow: OrderFlow;

  test.beforeEach(async ({ page }) => {
    orderFlow = new OrderFlow(page);

    await page.goto('/en');
    await orderFlow.acceptCookies();
    await orderFlow.confirmAge();
  });

  const testScenarios = [
    {
      DPID: `DPID-1${TestTag.CORE}`,
      product: 'ploom-x-advanced',
    },
  ];

  for (const scenario of testScenarios) {
    test.only(`TC01/${scenario.DPID} should add and remove single product into basket for ${scenario.product}`, async ({
      page,
    }) => {
      const product = scenario.product;
      const myBasket = new Basket();
      await orderFlow.goToShop();

      await waitForAllEvents(page);
      await orderFlow.openProductDetails(product);
      await orderFlow.addProductToBasket(product, myBasket);
      console.log('Current basket state:' + JSON.stringify(myBasket));
      await orderFlow.checkBasket(myBasket);
      await orderFlow.removeItemInBasket(myBasket.items[0], myBasket);
      await orderFlow.checkBasket(myBasket);
      console.log('Current basket state:' + JSON.stringify(myBasket));
    });
  }
});
