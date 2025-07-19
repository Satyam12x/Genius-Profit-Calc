function parseInput(id) {
    const el = document.getElementById(id);
    let value = el.textContent.trim().replace(/[₹$%]/g, '');
    return parseFloat(value) || 0;
}

function formatCurrency(value, currency = '₹') {
    return currency + value.toLocaleString('en-IN', { minimumFractionDigits: 2 });
}

function calculate() {
    // Orders Section
    const totalOrders = parseInput('totalOrders');
    const cancelled = parseInput('cancelled');
    const rtoOrders = parseInput('rtoOrders');
    const sellingPrice = parseInput('sellingPrice');
    const costPrice = parseInput('productCost');
    const fbCost = parseInput('fbCost');
    const fbGST = parseInput('fbGST');
    const shippingCost = parseInput('shippingCost');
    const rtoShipping = parseInput('rtoShipping');
    const damageRate = parseInput('damageRate');
    const abandonedCheckout = parseInput('abandonedCheckout');
    const ndrCalling = parseInput('ndrCalling');
    const shopifySubscription = parseInput('shopifySubscription');
    const shopifyApp = parseInput('shopifyApp');
    const otherApp = parseInput('otherApp');
    const telecaller = parseInput('telecaller');
    const otherCharges = parseInput('otherCharges');

    const toBeShipped = totalOrders - cancelled;
    const delivered = toBeShipped - rtoOrders;

    const cancelPercent = totalOrders ? (cancelled / totalOrders) * 100 : 0;
    const rtoPercent = toBeShipped ? (rtoOrders / toBeShipped) * 100 : 0;
    const deliveredPercent = toBeShipped ? (delivered / toBeShipped) * 100 : 0;

    const costShipped = toBeShipped * costPrice;
    const rtoValue = rtoOrders * costPrice;
    const moneyReceived = delivered * sellingPrice;

    const totalSelling = delivered * sellingPrice;
    const totalProductCost = delivered * costPrice;
    const totalFbCost = fbCost + fbGST;
    const totalShipping = delivered * shippingCost;
    const totalRtoShipping = rtoOrders * rtoShipping;
    const damageLoss = rtoOrders * costPrice * (damageRate / 100);
    const totalCogs = totalProductCost + totalFbCost + totalShipping + totalRtoShipping + damageLoss;
    const profit = totalSelling - totalCogs;

    // Profit Booster Calculations
    const abandonedOrders = Math.round(toBeShipped * (abandonedCheckout / 100));
    const ndrOrders = Math.round(toBeShipped * (ndrCalling / 100));
    const totalRtoNow = rtoOrders - (abandonedOrders + ndrOrders);
    const totalDeliveredNow = delivered + abandonedOrders + ndrOrders;
    const boosterDeliveredRevenue = (abandonedOrders + ndrOrders) * sellingPrice;
    const boosterProductCost = (abandonedOrders + ndrOrders) * costPrice;
    const boosterShippingCost = (abandonedOrders + ndrOrders) * shippingCost;
    const boosterRtoShipping = totalRtoNow * rtoShipping;
    const boosterTotalCogs = boosterProductCost + boosterShippingCost + boosterRtoShipping;
    const boosterProfit = boosterDeliveredRevenue - boosterTotalCogs;
    const ndrRate = toBeShipped ? (totalRtoNow / toBeShipped) * 100 : 0;

    // Expenses Calculations
    const usdToInr = 86.19; // Fixed conversion rate based on provided data
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
    const totalExpenses = shopifyInr + shopifyAppInr + otherAppInr + telecallerInr + otherChargesInr;
    const netProfit = profit + boosterProfit - totalExpenses;
    const monthlyProfit = netProfit * 30;

    // Update Orders Section
    document.getElementById('toBeShipped').textContent = toBeShipped;
    document.getElementById('cancelPercent').textContent = cancelPercent.toFixed(0) + '%';
    document.getElementById('rtoPercent').textContent = rtoPercent.toFixed(0) + '%';
    document.getElementById('toBeShippedPercent').textContent = '99%';
    document.getElementById('deliveredOrders').textContent = delivered;
    document.getElementById('deliveredPercent').textContent = deliveredPercent.toFixed(0) + '%';
    document.getElementById('rtoOrdersCopy').textContent = rtoOrders;
    document.getElementById('deliveredOrdersCopy').textContent = delivered;
    document.getElementById('costShipped').textContent = formatCurrency(costShipped);
    document.getElementById('rtoValue').textContent = formatCurrency(rtoValue);
    document.getElementById('moneyReceived').textContent = formatCurrency(moneyReceived);

    // Update Price and Costing Section
    document.getElementById('sellingTotal').textContent = formatCurrency(totalSelling);
    document.getElementById('totalProductCost').textContent = formatCurrency(totalProductCost);
    document.getElementById('totalFbCost').textContent = formatCurrency(totalFbCost);
    document.getElementById('totalShipping').textContent = formatCurrency(totalShipping);
    document.getElementById('totalRtoShipping').textContent = formatCurrency(totalRtoShipping);
    document.getElementById('damageCost').textContent = formatCurrency(damageLoss);
    document.getElementById('damageLoss').textContent = formatCurrency(damageLoss);
    document.getElementById('totalCogs').textContent = formatCurrency(totalCogs);
    document.getElementById('actualCost').innerHTML = formatCurrency(totalCogs) + '<br><span class="note">Actual Cost of that day</span>';
    document.getElementById('profit').textContent = formatCurrency(profit);

    // Update Profit Booster Section
    document.getElementById('abandonedOrders').textContent = abandonedOrders;
    document.getElementById('abandonedOrdersCopy').textContent = abandonedOrders;
    document.getElementById('abandonedRevenue').textContent = formatCurrency(abandonedOrders * sellingPrice);
    document.getElementById('abandonedExtra').textContent = '0';
    document.getElementById('abandonedExtra2').textContent = '0';
    document.getElementById('abandonedExtra3').textContent = '0';
    document.getElementById('ndrOrders').textContent = ndrOrders;
    document.getElementById('ndrRevenue').textContent = formatCurrency(ndrOrders * sellingPrice);
    document.getElementById('totalRtoNow').textContent = totalRtoNow;
    document.getElementById('ndrRate').textContent = ndrRate.toFixed(2) + '%';
    document.getElementById('abandonedNdrOrders').textContent = abandonedOrders + ndrOrders;
    document.getElementById('totalDeliveredNow').textContent = totalDeliveredNow;
    document.getElementById('boosterDeliveredRevenue').textContent = formatCurrency(boosterDeliveredRevenue);
    document.getElementById('boosterDeliveredOrders').textContent = abandonedOrders + ndrOrders;
    document.getElementById('boosterDeliveredTotal').textContent = formatCurrency(boosterDeliveredRevenue);
    document.getElementById('boosterProductCost').textContent = formatCurrency(boosterProductCost);
    document.getElementById('boosterProductOrders').textContent = abandonedOrders + ndrOrders;
    document.getElementById('boosterProductTotal').textContent = formatCurrency(boosterProductCost);
    document.getElementById('boosterShippingCost').textContent = formatCurrency(boosterShippingCost);
    document.getElementById('boosterRtoShipping').textContent = formatCurrency(boosterRtoShipping);
    document.getElementById('boosterTotalCogs').textContent = formatCurrency(boosterTotalCogs);
    document.getElementById('boosterProfit').textContent = formatCurrency(boosterProfit);

    // Update Expenses Section
    document.getElementById('shopifyDaily').textContent = formatCurrency(shopifyDaily, '$');
    document.getElementById('shopifyInr').textContent = formatCurrency(shopifyInr);
    document.getElementById('shopifyTotal').textContent = formatCurrency(shopifyTotal);
    document.getElementById('shopifyAppDaily').textContent = formatCurrency(shopifyAppDaily, '$');
    document.getElementById('shopifyAppInr').textContent = formatCurrency(shopifyAppInr);
    document.getElementById('otherAppDaily').textContent = formatCurrency(otherAppDaily, '$');
    document.getElementById('otherAppInr').textContent = formatCurrency(otherAppInr);
    document.getElementById('telecallerDaily').textContent = formatCurrency(telecallerDaily);
    document.getElementById('telecallerInr').textContent = formatCurrency(telecallerInr);
    document.getElementById('otherChargesDaily').textContent = formatCurrency(otherChargesDaily);
    document.getElementById('otherChargesInr').textContent = formatCurrency(otherChargesInr);
    document.getElementById('netProfit').textContent = formatCurrency(netProfit);
    document.getElementById('monthlyProfit').textContent = formatCurrency(monthlyProfit);
}

document.querySelectorAll('[contenteditable=true]').forEach(cell => {
    cell.addEventListener('input', calculate);
});

window.onload = calculate;