import { configEnvWithTenderlyMainnetFork } from '../../../support/steps/configuration.steps';
import { supply, borrow, withdraw } from '../../../support/steps/main.steps';
import { skipState } from '../../../support/steps/common';
import assets from '../../../fixtures/assets.json';
import constants from '../../../fixtures/constans.json';
import { checkDashboardHealthFactor } from '../../../support/steps/verification.steps';

const testData = {
  testCases: {
    deposit1: {
      asset: assets.aaveMarket.ETH,
      amount: 1,
      hasApproval: true,
    },
    borrow: {
      asset: assets.aaveMarket.ETH,
      amount: 1,
      apyType: constants.borrowAPYType.variable,
      hasApproval: false,
      isRisk: true,
    },
    deposit2: {
      asset: assets.aaveMarket.ETH,
      amount: 1,
      hasApproval: true,
    },
    withdraw: {
      asset: assets.aaveMarket.ETH,
      isCollateral: true,
      amount: 10,
      hasApproval: false,
      isRisk: true,
      isMaxAmount: true,
    },
  },
};

describe('CRITICAL CONDITIONS SPEC, AAVE V2 MARKET', () => {
  const skipTestState = skipState(false);
  configEnvWithTenderlyMainnetFork({});

  supply(testData.testCases.deposit1, skipTestState, true);
  borrow(testData.testCases.borrow, skipTestState, true);
  checkDashboardHealthFactor({ valueFrom: 1.0, valueTo: 1.07 }, skipTestState);
  supply(testData.testCases.deposit2, skipTestState, true);
  withdraw(testData.testCases.withdraw, skipTestState, false);
  checkDashboardHealthFactor({ valueFrom: 1.0, valueTo: 1.07 }, skipTestState);
});
