function parseInput(id) {
  const el = document.getElementById(id);
  let value = el.textContent.trim().replace(/[₹$%]/g, "");
  return parseFloat(value) || 0;
}

function formatCurrency(value, currency = "₹") {
  return (
    currency +
    value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function formatPercentage(value) {
  return value.toFixed(2) + "%";
}

// Debounce function to limit rapid calculate calls
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function calculate() {
  // Orders Section
  const totalOrders = parseInput("totalOrders");
  const cancelled = parseInput("cancelled");
  const rtoOrders = parseInput("rtoOrders");
  const rtoPercentInput = parseInput("rtoPercent");
  const sellingPrice = parseInput("sellingPrice");
  const productCost = parseInput("productCost");
  const fbCost = parseInput("fbCost");
  const fbGST = parseInput("fbGST");
  const shippingCost = parseInput("shippingCost");
  const rtoShipping = parseInput("rtoShipping");
  const damageRate = parseInput("damageRate");
  const abandonedCheckout = parseInput("abandonedCheckout");
  const abandonedCheckout2 = parseInput("abandonedCheckout2");
  const ndrCalling = parseInput("ndrCalling");
  const ndrRevenue = parseInput("ndrRevenue");
  const ndrRate = parseInput("ndrRate");
  const shopifySubscription = parseInput("shopifySubscription");
  const shopifyApp = parseInput("shopifyApp");
  const otherApp = parseInput("otherApp");
  const telecaller = parseInput("telecaller");
  const otherCharges = parseInput("otherCharges");
  const middleZero1 = parseInput("middleZero1");
  const middleZero2 = parseInput("middleZero2");
  const middleZero3 = parseInput("middleZero3");
  const middleZero4 = parseInput("middleZero4");
  const boosterDeliveredRevenue = parseInput("boosterDeliveredRevenue");
  const boosterProductCost = parseInput("boosterProductCost");
  const boosterShippingCost = parseInput("boosterShippingCost");
  const boosterRtoShipping = parseInput("boosterRtoShipping");

  // Orders Calculations
  const toBeShipped = totalOrders - cancelled;
  const delivered = toBeShipped - rtoOrders;
  const cancelPercent = totalOrders ? (cancelled / totalOrders) * 100 : 0;
  const rtoPercent = toBeShipped
    ? (rtoOrders / toBeShipped) * 100
    : rtoPercentInput;
  const deliveredPercent = toBeShipped ? (delivered / toBeShipped) * 100 : 0;
  const costShipped = toBeShipped * productCost;
  const rtoValue = rtoOrders * productCost;
  const moneyReceived = delivered * sellingPrice;

  // Price and Costing Calculations
  const totalSelling = delivered * sellingPrice;
  const totalProductCost = delivered * productCost;
  const totalFbCost = fbCost + fbGST;
  const totalShipping = delivered * shippingCost;
  const totalRtoShipping = rtoOrders * rtoShipping;
  const damageLoss = rtoOrders * productCost * (damageRate / 100);
  const totalCogs =
    totalProductCost +
    totalFbCost +
    totalShipping +
    totalRtoShipping +
    damageLoss;
  const profit = totalSelling - totalCogs;

  // Profit Booster Calculations
  const abandonedOrders = Math.round(toBeShipped * (abandonedCheckout / 100));
  const ndrOrders = Math.round(toBeShipped * (ndrCalling / 100));
  const totalRtoNow = rtoOrders - (abandonedOrders + ndrOrders);
  const totalDeliveredNow = delivered + abandonedOrders + ndrOrders;
  const boosterDeliveredRevenueCalc =
    (abandonedOrders + ndrOrders) * sellingPrice;
  const boosterProductCostCalc = (abandonedOrders + ndrOrders) * productCost;
  const boosterShippingCostCalc = (abandonedOrders + ndrOrders) * shippingCost;
  const boosterRtoShippingCalc = totalRtoNow * rtoShipping;
  const boosterTotalCogs =
    boosterProductCostCalc + boosterShippingCostCalc + boosterRtoShippingCalc;
  const boosterProfit = boosterDeliveredRevenueCalc - boosterTotalCogs;

  // Expenses Calculations
  const usdToInr = 86.19;
  const shopifyDaily = shopifySubscription / 30;
  const shopifyInr = shopifyDaily * usdToInr;
  const shopifyTotal = shopifyInr * 30;
  const shopifyAppDaily = shopifyApp / 30;
  const shopifyAppInr = shopifyAppDaily * usdToInr;
  const otherAppDaily = otherApp / 30;
  const otherAppInr = otherAppDaily * usdToInr;
  const telecallerDaily = telecaller / 30;
  const telecallerInr = telecallerDaily;
  const otherChargesDaily = otherCharges / 30;
  const otherChargesInr = otherChargesDaily;
  const totalExpenses =
    shopifyInr + shopifyAppInr + otherAppInr + telecallerInr + otherChargesInr;
  const netProfit = profit + boosterProfit - totalExpenses;
  const monthlyProfit = netProfit * 30;

  // Update Orders Section
  document.getElementById("toBeShipped").textContent = toBeShipped;
  document.getElementById("cancelPercent").textContent =
    formatPercentage(cancelPercent);
  document.getElementById("rtoPercent").textContent =
    formatPercentage(rtoPercent);
  document.getElementById("toBeShippedPercent").textContent = toBeShipped
    ? "100%"
    : "0%";
  document.getElementById("deliveredOrders").textContent = delivered;
  document.getElementById("deliveredPercent").textContent =
    formatPercentage(deliveredPercent);
  document.getElementById("costShipped").textContent =
    formatCurrency(costShipped);
  document.getElementById("rtoValue").textContent = formatCurrency(rtoValue);
  document.getElementById("moneyReceived").textContent =
    formatCurrency(moneyReceived);

  // Update Price and Costing Section
  document.getElementById("sellingTotal").textContent =
    formatCurrency(totalSelling);
  document.getElementById("totalProductCost").textContent =
    formatCurrency(totalProductCost);
  document.getElementById("totalFbCost").textContent =
    formatCurrency(totalFbCost);
  document.getElementById("totalShipping").textContent =
    formatCurrency(totalShipping);
  document.getElementById("totalRtoShipping").textContent =
    formatCurrency(totalRtoShipping);
  document.getElementById("damageCost").textContent =
    formatCurrency(damageLoss);
  document.getElementById("damageExtra1").textContent =
    formatCurrency(damageLoss);
  document.getElementById("totalCogs").textContent = formatCurrency(totalCogs);
  document.getElementById("actualCost").textContent = formatCurrency(totalCogs);
  document.getElementById("profit").textContent = formatCurrency(profit);
  document.getElementById("totalRtoNowDashboard").textContent = totalRtoNow;

  // Update Profit Booster Section
  document.getElementById("abandonedOrders").textContent = abandonedOrders;
  document.getElementById("abandonedOrdersCopy").textContent = abandonedOrders;
  document.getElementById("abandonedRevenue").textContent = formatCurrency(
    abandonedOrders * sellingPrice
  );
  document.getElementById("abandonedExtra").textContent = "0";
  document.getElementById("abandonedExtra2").textContent = "0";
  document.getElementById("abandonedExtra3").textContent = "0";
  document.getElementById("abandonedExtra4").textContent = "0";
  document.getElementById("abandonedExtra5").textContent = "0";
  document.getElementById("ndrOrders").textContent = ndrOrders;
  document.getElementById("ndrRevenue").textContent = formatCurrency(
    ndrOrders * sellingPrice
  );
  document.getElementById("ndrRevenue2").textContent = formatCurrency(
    ndrOrders * sellingPrice
  );
  document.getElementById("totalRtoNow").textContent = totalRtoNow;
  document.getElementById("ndrRate").textContent = formatPercentage(ndrRate);
  document.getElementById("abandonedNdrOrders").textContent =
    abandonedOrders + ndrOrders;
  document.getElementById("abandonedNdrOrdersCopy").textContent =
    abandonedOrders + ndrOrders;
  document.getElementById("totalDeliveredNow").textContent = totalDeliveredNow;
  document.getElementById("boosterDeliveredRevenue").textContent =
    formatCurrency(boosterDeliveredRevenueCalc);
  document.getElementById("boosterDeliveredOrders").textContent =
    abandonedOrders + ndrOrders;
  document.getElementById("boosterDeliveredTotal").textContent = formatCurrency(
    boosterDeliveredRevenueCalc
  );
  document.getElementById("boosterProductCost").textContent = formatCurrency(
    boosterProductCostCalc
  );
  document.getElementById("boosterProductOrders").textContent =
    abandonedOrders + ndrOrders;
  document.getElementById("boosterProductTotal").textContent = formatCurrency(
    boosterProductCostCalc
  );
  document.getElementById("boosterShippingCost").textContent = formatCurrency(
    boosterShippingCostCalc
  );
  document.getElementById("boosterRtoShipping").textContent = formatCurrency(
    boosterRtoShippingCalc
  );
  document.getElementById("boosterTotalCogs").textContent =
    formatCurrency(boosterTotalCogs);
  document.getElementById("boosterProfit").textContent =
    formatCurrency(boosterProfit);
  document.getElementById("netProfitHardWorkers").textContent =
    formatCurrency(netProfit);

  // Update Expenses Section
  document.getElementById("shopifyDaily").textContent = formatCurrency(
    shopifyDaily,
    "$"
  );
  document.getElementById("shopifyInr").textContent =
    formatCurrency(shopifyInr);
  document.getElementById("shopifyTotal").textContent =
    formatCurrency(shopifyTotal);
  document.getElementById("shopifyAppDaily").textContent = formatCurrency(
    shopifyAppDaily,
    "$"
  );
  document.getElementById("shopifyAppInr").textContent =
    formatCurrency(shopifyAppInr);
  document.getElementById("otherAppDaily").textContent = formatCurrency(
    otherAppDaily,
    "$"
  );
  document.getElementById("otherAppInr").textContent =
    formatCurrency(otherAppInr);
  document.getElementById("telecallerDaily").textContent =
    formatCurrency(telecallerDaily);
  document.getElementById("telecallerInr").textContent =
    formatCurrency(telecallerInr);
  document.getElementById("otherChargesDaily").textContent =
    formatCurrency(otherChargesDaily);
  document.getElementById("otherChargesInr").textContent =
    formatCurrency(otherChargesInr);
  document.getElementById("netProfit").textContent = formatCurrency(netProfit);
  document.getElementById("monthlyProfit").textContent =
    formatCurrency(monthlyProfit);
}

// Debounced calculate function
const debouncedCalculate = debounce(calculate, 300);

// Improved input handling
document
  .querySelectorAll('.green-cell[contenteditable="true"]')
  .forEach((cell) => {
    cell.addEventListener("input", () => {
      let value = cell.textContent.trim();
      let cleanValue = value.replace(/[₹$%]/g, "").replace(/[^0-9.]/g, "");

      // Prevent multiple decimal points
      const decimalCount = cleanValue.split(".").length - 1;
      if (decimalCount > 1) {
        cleanValue = cleanValue.replace(/\./g, (match, offset, string) =>
          string.indexOf(".") === offset ? "." : ""
        );
      }

      // Format based on cell type
      if (
        cell.id.includes("Percent") ||
        cell.id.includes("Rate") ||
        cell.id.includes("abandonedCheckout")
      ) {
        cell.textContent = cleanValue ? `${cleanValue}%` : "0%";
      } else if (cell.id.includes("shopify") || cell.id.includes("otherApp")) {
        cell.textContent = cleanValue ? `$${cleanValue}` : "$0.00";
      } else if (
        cell.id.includes("telecaller") ||
        cell.id.includes("otherCharges")
      ) {
        cell.textContent = cleanValue ? `₹${cleanValue}` : "₹0.00";
      } else {
        cell.textContent = cleanValue || "";
      }

      // Preserve cursor position
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(cell.childNodes[0] || cell, cell.textContent.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);

      debouncedCalculate();
    });

    // Prevent Enter key from creating new lines
    cell.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        cell.blur();
      }
    });
  });

window.onload = calculate;
